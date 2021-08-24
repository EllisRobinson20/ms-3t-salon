import React, {createContext, useState} from "react"

export const BookingContext = createContext();

const BookingContextProvider = ({ children }) => {
    const [selectedDateGlobal, setNewDate] = useState(new Date());
    const [selectedService, setSelectedService] = useState("");
    const [slots, setSlots] = useState([]);
    const [isAvailability, setAvailability] = useState(slots.length > 0);
    const [error, setError] = useState("");
    const [coldStarted, setColdStarted] = useState(false);
    
    const [selectedSlot, setSelectedSlot] = useState("");

    return (
        <BookingContext.Provider value={{selectedDateGlobal, setNewDate, 
            selectedService, setSelectedService,
            isAvailability, setAvailability,
            slots, setSlots,
            selectedSlot, setSelectedSlot,
            error, setError,
            coldStarted, setColdStarted}}>
                {children}
        </BookingContext.Provider>
    )
}

export default BookingContextProvider