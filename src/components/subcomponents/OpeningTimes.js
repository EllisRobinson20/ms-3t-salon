import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

export default function OpeningTimes() {
  const data = useStaticQuery(graphql`
    query OperatingHoursComponentQuery {
      allOperatingHours {
        edges {
          node {
            id
            closingTimeMinutes
            openingTimeMinutes
          }
        }
      }
    }
  `)
  // get timelabel
  /**
   * Adds two numbers together.
   * @param {int} timeMinutes The first number.
   * @return {string} The sum of the two numbers.
   */
  function getLabel(timeMinutes) {
    let timeAsString = ''
    const timeInhours = timeMinutes / 60
    const hasMinutes = timeInhours - Math.floor(timeInhours) !== 0
    if (hasMinutes) {
      const remainder = timeInhours - Math.floor(timeInhours)
      const minutesPastHour = remainder * 60
      const hoursOnly = Math.floor(timeInhours)
      timeAsString =
        (timeInhours < 10 ? '0' + hoursOnly.toString() : hoursOnly.toString()) +
        ':' +
        (minutesPastHour < 10
          ? '0' + minutesPastHour.toString()
          : minutesPastHour.toString())
      return timeAsString
    } else {
      return (
        (timeInhours < 10
          ? '0' + timeInhours.toString()
          : timeInhours.toString()) + ':00'
      )
    }
  }

  const getDay = day => {
    let result = ''
    data.allOperatingHours.edges.forEach(edge => {
      if (edge.node.id === day) {
        result = edge.node
      } else if (day === "Sunday") {
          result = "Sunday"
      }
    })
    return result
  }
  const getTime = day => {
    // get the node which has matching day
    const currentDay = getDay(day)
    console.log('currentDay')
    console.log(currentDay)
    // subtract the numbers, if > 0 return "startTime.formated - endTime.formatted
    const diff = currentDay.closingTimeMinutes - currentDay.openingTimeMinutes
    // if not retun closed
    // if day == sunday return closed
    console.log("diff test")
    console.log(diff >= 0)
    return diff >= 0 ? diff === 0 ? "Closed  " :
     `${getLabel(currentDay.openingTimeMinutes)} - ${getLabel(currentDay.closingTimeMinutes)}`
: currentDay === "Sunday" ? "Closed   " : "Closed   "
  }
  return (
    <div>
      <p>
        <strong>Monday: </strong> {getTime('Monday')}
      </p>
      <p>
        <strong>Tuesday: </strong> {getTime('Tuesday')}
      </p>
      <p>
        <strong>Wednesday: </strong> {getTime('Wednesday')}
      </p>
      <p>
        <strong>Thursday: </strong> {getTime('Thursday')}
      </p>
      <p>
        <strong>Friday: </strong> {getTime('Friday')}
      </p>
      <p>
        <strong>Saturday: </strong> {getTime('Saturday')}
      </p>
      <p>
        <strong>Sunday: </strong> {getTime('Sunday')}
      </p>
    </div>
  )
}
