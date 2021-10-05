import React, { useContext } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { BookingContext } from '../../context/BookingContext'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: '2em 2em 10em',
  },
}))

export default function SelectedListItem(props) {
  // state
  const [selectedIndex, setSelectedIndex] = React.useState(1)
  // context
  const { setServiceListRef } = useContext(BookingContext)
  // data
  const data = useStaticQuery(graphql`
    query ServiceNameQuery {
      allService {
        edges {
          node {
            id
            durationMinutes
            pricePence
            bookingCount
            description
            name
            upperPriceLimit
            variablePrice
            consultationOnly
            variableDuration
          }
        }
      }
    }
  `)
  const services = data.allService.edges
  // styles
  const classes = useStyles()
  // functions
  const handleListItemClick = (event, index, serviceId) => {
    setSelectedIndex(index)
    setServiceListRef(serviceId)
    services.forEach(service => {
      if (service.node.id === serviceId) {
        props.action(service)
      }
    })
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="salon services list">
        {services.map((service, index) => (
          <ListItem
            button
            selected={selectedIndex === index}
            onClick={event =>
              handleListItemClick(event, index, service.node.id)
            }
          >
            <ListItemText primary={service.node.name} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
