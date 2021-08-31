import React, {useContext} from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { BookingContext } from '../../context/BookingContext';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: '2em'
  },
}));

export default function SelectedListItem() {
    const data = useStaticQuery(graphql`
    query ServiceNameQuery {
        allService {
          edges {
            node {
              name
              id
            }
          }
        }
      }
    `)
    const services = data.allService.edges

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const {setServiceListRef} = useContext(BookingContext)
  

  const handleListItemClick = (event, index, serviceId) => {
    setSelectedIndex(index);
    setServiceListRef(serviceId);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="salon services list">
          {services.map((service, index) => (
              <ListItem
              button
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index, service.node.id)}
            >
              <ListItemText primary={service.node.name} />
            </ListItem>
  ))}
      </List>
    </div>
  );
}
