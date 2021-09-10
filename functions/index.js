const functions = require("firebase-functions");
const admin = require("firebase-admin");
const addDays = require("date-fns/addDays");
const setHours = require("date-fns/setHours");
const parseISO = require("date-fns/parseISO");
const format = require("date-fns/format");
admin.initializeApp();
const firestore = admin.firestore();

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    });
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin`,
    };
  }).catch((err) => {
    return err;
  });
});

exports.getAvailabilityForDate = functions.https.onCall((data, context) => {
  const bookings = [];
  const slots = [];
  let dayOfWeek = null;
  let serviceName = null;
  slots.length = 0;
  bookings.length = 0; // The slots array keeps growing as
  // the user clicks multiple dates
  console.log("data.date is : ");
  console.log(data.date);
  const selectedDate = parseISO(data.date);
  console.log("selectedDate is :");
  console.log(selectedDate);
  console.log("data.ServiceName is : ");
  console.log(data.serviceName);
  serviceName = data.serviceName;
  let dayAfter = addDays(selectedDate, 1);
  console.log("dayAfter initial value : ");
  console.log(dayAfter);
  dayAfter = setHours(dayAfter, 2);
  console.log("dayAfter ammended hours : ");
  console.log(dayAfter);
  dayOfWeek = format(selectedDate, "eeee");
  console.log("dayOfWeek is : ");
  console.log(dayOfWeek);

  const bookingHistory = firestore.collection("bookingHistory")
      .where("dateOfBooking", ">=", selectedDate)
      .where("dateOfBooking", "<", dayAfter)
      .orderBy("dateOfBooking", "asc")
      .get();

  const operatingHours =
    admin.firestore().collection("operatingHours")
        .doc(dayOfWeek).get();

  const selectedService =
    // if the result is empty or undefined then reject else resolve
    admin.firestore().collection("services")
        .doc(serviceName).get();


  return Promise.all([
    bookingHistory,
    operatingHours,
    selectedService,
  ]).catch((error) => {
    console.log(error);
  }).then((results) => {
    results[0].docs.forEach((doc) => {
      bookings.push(doc.data());
    });
    return results;
  }).catch((error) => {
    console.log(error);
  }).then((results) => {
    const businessStart = results[1].data().openingTimeMinutes;
    const businessClose = results[1].data().closingTimeMinutes;
    const durationService = results[2].data().durationMinutes;
    if (bookings.length == 0) {
      // diff between start time and close time
      const diff = businessClose - businessStart;
      let avail = diff / durationService;
      avail = Math.floor(avail);
      createTimeSlots(avail, businessStart, durationService);
      // avail from this result
      // provide slots for the day
    } else
    if (bookings.length > 0) {
      const serviceStartTime = bookings[0].startTimeMinutes;
      const diff = serviceStartTime - businessStart;
      let avail = diff / durationService;
      avail = Math.floor(avail);
      createTimeSlots(avail, businessStart, durationService);
    }
    if (bookings.length > 1) {
      for (let i = 0; i < bookings.length-1; i++) {
        // finish time of current booking
        const endTimeOfCurrentBooking = bookings[i].startTimeMinutes +
        bookings[i].durationMinutes;
        // start time of next booking
        const startOfNextBooking = bookings[i+1].startTimeMinutes;
        // difference to work out the availability
        const diff = startOfNextBooking - endTimeOfCurrentBooking;
        let avail = diff / durationService;
        avail = Math.floor(avail);
        // create X slots from finish time of current booking
        // NOTE : The results must be in date/time order!!
        createTimeSlots(avail, endTimeOfCurrentBooking,
            durationService);
      }
    }
    // Get the last booking
    const endTimeOfLastBooking = bookings[bookings.length-1].startTimeMinutes +
    bookings[bookings.length-1].durationMinutes;
    // difference to work out the availability
    const diff = businessClose - endTimeOfLastBooking;
    let avail = diff / durationService;
    avail = Math.floor(avail);
    // create X slots for the final potential availability
    createTimeSlots(avail, endTimeOfLastBooking,
        durationService);
  }).catch((error) => {
    console.log(error);
  }).then(() => {
    const slotPairs = [];
    slots.forEach((slot) => {
      const buttonLabel = getButtonLabel(slot);
      slotPairs.push({id: slot, buttonLabel: buttonLabel});
    });
    return slotPairs;
  }).catch((error) => {
    console.log(error);
  }).then((slotPairs) => {
    if (data.serviceName === "false") {
      return "cold start : true";
    } else {
      return slotPairs;
    }
  });

  /**
   * Adds two numbers together.
   * @param {int} timeMinutes The first number.
   * @return {string} The sum of the two numbers.
   */
  function getButtonLabel(timeMinutes) {
    let timeAsString = "";
    const timeInhours = timeMinutes / 60;
    const hasMinutes = (timeInhours - Math.floor(timeInhours)) !== 0;
    if (hasMinutes) {
      const remainder = timeInhours - Math.floor(timeInhours);
      const minutesPastHour = remainder * 60;
      const hoursOnly = Math.floor(timeInhours);
      timeAsString = (timeInhours < 10 ? "0"+hoursOnly.toString() :
      hoursOnly.toString()) +
      ":" +
      (minutesPastHour < 10 ? "0"+minutesPastHour.toString() :
      minutesPastHour.toString() );
      return timeAsString;
    } else {
      return (timeInhours < 10 ? "0"+timeInhours.toString() :
      timeInhours.toString()) + ":00";
    }
  }

  /**
 * Creates time slots for chosen service.
 * @param {int} avail The number of available slots between ...
 * ... operating hours and bookings.
 * @param {int} startingTimeMins The point at which to enter first slot.
 * @param {int} durationService The duration of the chosen service.
 */
  function createTimeSlots(avail, startingTimeMins,
      durationService) {
    for (let i = 0; i < avail; i++) {
      const slot = startingTimeMins + (durationService * i );
      console.log("pushing to slots array ... " + slot);
      slots.push(slot);
    }
  }
});

exports.bookProvisionalIfAvail = functions.https.onCall((data, context) => {
  /**
 * returns true if a booking time clashes
 * @param {int} x The booking time number.
 * @param {int} min The lower range.
 * @param {int} max The upper range.
 * @return {boolean} True if there is a clash.
 */
  function between(x, min, max) {
    return x >= min && x <= max;
  }
  // if the passed in time slot on date given is not booked
  // first get db
  const selectedDate = parseISO(data.bookingDate);
  let dayAfter = addDays(selectedDate, 1);
  dayAfter = setHours(dayAfter, 2);
  const bookingHistory = firestore.collection("bookingHistory")
      .where("dateOfBooking", ">=", selectedDate)
      .where("dateOfBooking", "<", dayAfter)
      .orderBy("dateOfBooking", "asc")
      .get();
  return bookingHistory
      .catch((error) => {
        console.log(error);
      }).then((bookingHistory) => {
        console.log("running for each next ");
        const arr = [];
        const test = [];
        let overlap = false;
        if (bookingHistory.docs) {
          console.log("BookingHistory has docs ");
          // create a list of times to check between ...
          // ... the selected time start and finish
          const selectedStart = data.bookingTime;
          const selectedFinish = selectedStart + data.durationService;
          for (let i = selectedStart; i <= selectedFinish; i += 15) {
            arr.push(i);
          }
          // remove on minute from last entry
          let lastEntry = arr.pop();
          lastEntry -= 1;
          arr.push(lastEntry);
          console.log("arr = ");
          console.log(arr);
          bookingHistory.docs.forEach((record) => {
            const startTimeMinutes = record.data().startTimeMinutes;
            const finishTimeMinutes = startTimeMinutes +
            record.data().durationMinutes - 1; // - 1 avoids clash
            // with previous record
            test.push([startTimeMinutes, finishTimeMinutes]);
            for (let i = 0; i < arr.length; i++) {
              if (between(arr[i], startTimeMinutes, finishTimeMinutes)) {
                overlap = true;
                break;
              }
            }
          });
        }
        return overlap;
      }).catch((error) => {
        console.log(error);
      }).then((overlap) => {
        const doc = null;
        if (!overlap) {
          console.log("No overlap");
          // save to db
          const emailRef = firestore.collection("emails");
          const batch = firestore.batch();
          batch.set(bookingHistory, {
            dateOfBooking: selectedDate,
            durationMinutes: data.durationService,
            name: data.user.displayNam,
            selectedService: data.service,
            startTimeMinutes: data.bookingTime,
          });
          batch.set( emailRef, {
            to: data.user.email,
            bcc: "ellis.codmidlands.com",
            message: {
              subject: "New order",
              html: "This is an <code>HTML</code> email body.",
            },
          })
          // doc = firestore.collection("bookingHistory")
              // .add({dateOfBooking: selectedDate,
              // durationMinutes: data.durationService,
              // name: data.name,
              // selectedService: data.service,
              // startTimeMinutes: data.bookingTime})
              .then((documentReference) => {
                console.
                    log(`Added document with name: ${documentReference.id}`);
                return documentReference;
              });
        } else {
          console.log("Booking overlaps existing booking");
        }
        return doc;
      }).catch((error) => {
        console.log(error);
      }).then((doc) => {
        return doc;
      });
  // for each record - > if record greater than start but less than finish

  // take the slot - leave payment confirmed set to false
  // another tirgger must send a message to business owner
  // with another app hosted in the same project for viewing bookings ...
  // ... admins can log in to see their bookings
  // admins will need to get a text or email when an update has been made
  // note: the user will need to see current bookings as well as past bookings
  // this would be acheived through local storage ...
});
