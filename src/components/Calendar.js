import React, { useContext, useState } from 'react'
import * as dateFns from "date-fns";
import '../styles/global.css'
import {BookingContext} from "../context/BookingContext";
import add from "date-fns/add";


export default function Calendar(props) {
 // Context
  const {selectedService, setSelectedService} = useContext(BookingContext);
  const {selectedDateGlobal, setNewDate} = useContext(BookingContext);
  const {setError} = useContext(BookingContext);
 // State
  const [currentMonth, setCurrentMonth] = useState(selectedDateGlobal);
  const [selectedDate, setSelectedDate] = useState(selectedDateGlobal);




  const renderHeader = () => {
      const dateFormat = "MMMM yyyy";
      return (
        <div className="header row flex-middle">
          <div className="col col-start">
            <div className="icon" onClick={prevMonth}>
              chevron_left
            </div>
          </div>
          <div className="col col-center">
            <span>
              {dateFns.format(currentMonth, dateFormat)}
            </span>
          </div>
          <div className="col col-end" onClick={nextMonth}>
            <div className="icon">chevron_right</div>
          </div>
        </div>
      );
    }

const renderDays = () => {
      const dateFormat = "dddd";
      const days = [];
      let startDate = dateFns.startOfWeek(currentMonth);
      for (let i = 0; i < 7; i++) {
        days.push(
          <div className="col col-center" key={i}>
            {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
          </div>
        );
      }
      return <div className="days row">{days}</div>;
    }

const renderCells = () =>{
      
      const monthStart = dateFns.startOfMonth(currentMonth);
      const monthEnd = dateFns.endOfMonth(monthStart);
      const startDate = dateFns.startOfWeek(monthStart);
      const endDate = dateFns.endOfWeek(monthEnd);

      const dateFormat = "d";
      const rows = [];
      let days = [];
      let day = startDate;
      let formattedDate = "";
      while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
          formattedDate = dateFns.format(day, dateFormat);
          const cloneDay = add(day, {hours:9}); // defaults to opening time -BST ERROR
          days.push(
          <div
              className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                  ? "disabled"
                  : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
              }`}
              key={day}
              onClick={() => onDateClick(dateFns.toDate(cloneDay))}
          >
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
          </div>
          );
          day = dateFns.addDays(day, 1);
      }
      rows.push(
          <div className="row" key={day}>
          {days}
          </div>
      );
      days = [];
      }
      return <div className="body">{rows}</div>;
  }

  const onDateClick = day => {
    if(dateFns.format(day, 'eee') != 'Sun' && selectedService) {
      setSelectedDate(day)
      setNewDate(day)
      //passed the selected day to props as useContext is ineffective
      //setNewDate may now be redundant
      props.action(day)
      console.log("Match "+day);
      console.log("Match "+selectedDateGlobal)
      console.log("Match "+selectedDate.toString())
    } else
    if(dateFns.format(day, 'eee') != 'Sun' && !selectedService) {
      setError("service")
    } else
    if(dateFns.format(day, 'eee') === 'Sun') { 
      setError("sunday")
    }
    };
  
  const nextMonth = () => {
      setCurrentMonth(dateFns.addMonths(currentMonth, 1))
    };
   const prevMonth = () => {
    setCurrentMonth(dateFns.subMonths(currentMonth, 1))
    };
      return (
          <div className="calendar">
             {renderHeader()}
              {renderDays()}
              {renderCells()}
          </div>
        
      )
}
