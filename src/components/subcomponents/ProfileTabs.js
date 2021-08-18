import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import HistoryIcon from '@material-ui/icons/History';
import StarHalfIcon from '@material-ui/icons/StarHalf';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { Divider, Tooltip, Button, Container, TextField } from '@material-ui/core';
import { StylesContext } from '@material-ui/styles/StylesProvider';

import Rating from '@material-ui/lab/Rating';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    flexGrow: 1,
    maxWidth: 752,
  },
  listGroup: {
    backgroundColor: theme.palette.background.paper,
  },
  editButton: {
    color: '#5d5d5d',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  centered: {
    textAlign: 'center'
  },
  formSubmit: {
    marginTop: '1em'
  },
}));


export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [rating, setRating] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Edit Profile" {...a11yProps(0)} icon={<AccountCircleIcon/>} />
          <Tab label="My Bookings" {...a11yProps(1)} icon={<CalendarTodayIcon/>}/>
          <Tab label="Booking History" {...a11yProps(2)} icon={<HistoryIcon/>}/>
          <Tab label="Give Rating" {...a11yProps(3)} icon={<StarHalfIcon/>}/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            

            <Grid item xs={12} md={6}>
          
          <div className={classes.listGroup}>
            <List dense={dense}>
              
                <ListItem>
                  <ListItemAvatar>
                    <Tooltip title="enter your name">
                        <Avatar>
                            N 
                        </Avatar>
                    </Tooltip>
                  </ListItemAvatar>
                  <ListItemText
                    primary="[Member Name]"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <EditIcon className={classes.editButton}/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider/>
                <ListItem>
                  <ListItemAvatar>
                    <Tooltip title="select a usual service">
                        <Avatar>
                            S 
                        </Avatar>
                    </Tooltip>
                  </ListItemAvatar>
                  <ListItemText
                    primary="[Usual Service]"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <EditIcon className={classes.editButton} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              
            </List>
          </div>
        </Grid>

        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <Container className={classes.centered}>
                <Typography variant="">
                You have no upcoming appointments
                </Typography>
                </Container>
                <Container className={classes.centered}>
                <Button variant="contained" color="secondary">
                    Book an Appointment
                </Button>
                </Container>
                
            
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
        <Box component="fieldset" mb={3} borderColor="transparent" className={classes.centered}>
        <Typography>
            "Good experience? We would really appreciate your feedback"
        </Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            event.preventDefault()
            setRating(newValue);
          }}
          size="large"
        />
        
      </Box>
      <Container className={classes.centered}>
      <TextField
          id="outlined-multiline-flexible"
          label="Comments"
          multiline
          maxRows={4}
          /*value={}*/
          /*onChange={}*/
          variant="outlined"
        />
        </Container>
        <Container className={classes.centered}>
        <Button variant="contained" color="secondary" className={classes.formSubmit}>
           Send
        </Button>
        </Container>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
