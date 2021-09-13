import 'date-fns';
import React, {useContext} from 'react';
import { AdminContext } from '../../context/AdminContext';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  overrides: {
    MuiPickersCalendarHeaderIconButton: {
        
    },
    // Style sheet name ⚛️
    MuiButtonBase: {
      // Name of the rule
      root: {
        color: "grey!important;"
      },
    },
  },
});

export default function DatePicker() {
  // The first commit of Material-UI
  const {datePicker, setDatePicker} = useContext(AdminContext);

  const handleDateChange = (date) => {
    if (date !== null) {
    if (date.toString() !== "Invalid Date") {
        setDatePicker(date);
    }
}
    // 
  };
  

  return (
      <ThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
        style={{color:"black"}}
        variant="inline"
        inputVariant="outlined"
          margin="normal"
          id="date-picker-dialog"
          label="Select Date"
          format="dd/MM/yyyy"
          value={datePicker}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
            
          }}
        />
        
      </Grid>
    </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}
