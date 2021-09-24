const functions = require("firebase-functions");
const admin = require("firebase-admin");
const addDays = require("date-fns/addDays");
const setHours = require("date-fns/setHours");
const addHours = require("date-fns/addHours");
const addMinutes = require("date-fns/addMinutes");

const getDay = require("date-fns/getDay");
const setMonth = require("date-fns/setMonth");
const isWithinInterval = require("date-fns/isWithinInterval");


const parseISO = require("date-fns/parseISO");
const formatISO = require("date-fns/formatISO");
const format = require("date-fns/format");

const lastDayOfMonth = require("date-fns/lastDayOfMonth");
const previousSunday = require("date-fns/previousSunday");
const nodemailer = require("nodemailer");
admin.initializeApp();
const firestore = admin.firestore();
require("dotenv").config();


exports.sendEmailNotification=functions.firestore
    .document("bookingHistory/{docId}")
    .onCreate((snapshot, context) => {
      const data = snapshot.data();
      const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });
      const dateIsSunday = (date) => {
        console.log("function dateis sunday");
        console.log(getDay(date));
        console.log(getDay(date) === 0);
        return getDay(date) === 0;
      };
      const removeHyphens = (string) => {
        const alteredString = string.replace(/-/g, " ");
        return alteredString;
      };
      const getDateBST = (date) => {
        console.log("date");
        console.log(date);
        let marchThisYear = setMonth(date, 2);
        console.log("march");
        console.log(marchThisYear);
        marchThisYear = lastDayOfMonth(marchThisYear);
        console.log(marchThisYear);

        if (!dateIsSunday(marchThisYear)) {
          marchThisYear = previousSunday(marchThisYear);
        }
        console.log(marchThisYear);
        let octoberThisYear = setMonth(date, 9);
        console.log("october");
        console.log(octoberThisYear);
        octoberThisYear = lastDayOfMonth(octoberThisYear);
        console.log(octoberThisYear);

        if (!dateIsSunday(octoberThisYear)) {
          octoberThisYear = previousSunday(octoberThisYear);
        }
        console.log(octoberThisYear);
        console.log(isWithinInterval(date, {
          start: marchThisYear,
          end: octoberThisYear,
        }));
        return isWithinInterval(date, {
          start: marchThisYear,
          end: octoberThisYear,
        }) ? addHours(date, 1) : date;
      };
      console.log("data.dateOfBooking");
      console.log(data.dateOfBooking.toDate());
      console.log(getDateBST(data.dateOfBooking.toDate()));
      const bookingDateBST = getDateBST(data.dateOfBooking.toDate());
      const serviceName = removeHyphens(data.selectedService);
      transporter.sendMail({
        from: "ms3tsalon@outlook.com",
        to: `${data.email}`,
        subject: "Successful booking confirmation",
        text: "email body",
        html: `<html>
        <body>
        <h2>Your booking was successful</h2>
                </br><p><strong>${data.name}</strong>,</p>
                </br><p>Thanks for booking with us. 
                Your time slot is provided below:</p>
                </br>
                <div style="border:2px solid grey; 
                border-radius:5px; padding: 1em;">
                  <h6>${serviceName}</h6>
                  </br>
                  <h6><strong>Date:</strong> 
                  ${format(bookingDateBST,
      "EEEE do LLLL HH:mm")},
      </h6>
                  </br>  
                </div>
                </br>
        <i style="margin-top: 2em;">Look forward to seeing you</i>
        </br>
        <h4>Latoyah</h4>
        <h2 style="font-family: Pinyon Script;">Ms 3T Salon</h2>
        </body>
        </html>`,
      }).then((res) => {
        console.log("Successful booking");
      }).catch((err) => {
        console.log(err);
      });
    });

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

  const businessClosed = (day) => {
    return getDay(day) === 0 || getDay(day) === 1 || getDay(day) === 2;
  };
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
  const isClosed = businessClosed(selectedDate);
  if (isClosed) {
    return {
      error: "Business Closed",
    };
  }

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
  const dateIsSunday = (date) => {
    console.log("function dateis sunday");
    console.log(getDay(date));
    console.log(getDay(date) === 0);
    return getDay(date) === 0;
  };
  const getDateBST = (date) => {
    console.log("date");
    console.log(date);
    let marchThisYear = setMonth(date, 2);
    console.log("march");
    console.log(marchThisYear);
    marchThisYear = lastDayOfMonth(marchThisYear);
    console.log(marchThisYear);

    if (!dateIsSunday(marchThisYear)) {
      marchThisYear = previousSunday(marchThisYear);
    }
    console.log(marchThisYear);
    let octoberThisYear = setMonth(date, 9);
    console.log("october");
    console.log(octoberThisYear);
    octoberThisYear = lastDayOfMonth(octoberThisYear);
    console.log(octoberThisYear);

    if (!dateIsSunday(octoberThisYear)) {
      octoberThisYear = previousSunday(octoberThisYear);
    }
    console.log(octoberThisYear);
    console.log(isWithinInterval(date, {
      start: marchThisYear,
      end: octoberThisYear,
    }));
    return isWithinInterval(date, {
      start: marchThisYear,
      end: octoberThisYear,
    }) ? addHours(date, 1) : date;
  };
  // if the passed in time slot on date given is not booked
  // first get db
  const selectedDate = parseISO(data.bookingDate);
  console.log("checking selected date");
  console.log(selectedDate);
  console.log(data.bookingDate);
  console.log(data.bookingDate.toString());
  console.log(formatISO(addMinutes(selectedDate,
      data.durationService)));

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
        if (!overlap) {
          // save to db
          /* const emailRef = firestore.collection("emails");
          const batch = firestore.batch();
          batch.set(bookingHistory, { // may need to be "add" not "set"
            dateOfBooking: selectedDate,
            durationMinutes: data.durationService,
            name: data.user.displayName,
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
          }) */
          const startTime = getDateBST(parseISO(data.bookingDate));
          return firestore.collection("bookingHistory")
              .add({dateOfBooking: selectedDate,
                durationMinutes: data.durationService,
                email: data.email,
                name: data.name,
                selectedService: data.service,
                startTimeMinutes: data.bookingTime,
                startISO: formatISO(startTime),
                finishISO:
                formatISO(addMinutes(startTime, data.durationService)),
              })
              .then((documentReference) => {
                console.
                    log(`Added document with name: ${documentReference.id}`);
                return documentReference.id;
              }).catch((error) => {
                console.log(error);
              });
        } /* else {
          console.log("Booking overlaps existing booking");
        }
        return doc; */
      });
  /*       .catch((error) => {
        console.log(error);
      }).then((doc) => {
        return doc;
      }); */
  // for each record - > if record greater than start but less than finish

  // take the slot - leave payment confirmed set to false
  // another tirgger must send a message to business owner
  // with another app hosted in the same project for viewing bookings ...
  // ... admins can log in to see their bookings
  // admins will need to get a text or email when an update has been made
  // note: the user will need to see current bookings as well as past bookings
  // this would be acheived through local storage ...
});
