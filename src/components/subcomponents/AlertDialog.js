import * as React from 'react';
import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { Slide } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors';
import FillButton from './buttons/FillButton';

const buttonTheme = createTheme({
  palette: { primary: { main: '#d52349!important',  }, secondary: grey },
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({children, openDialog, action, confirm}) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    action(false);
  };
  const handleConfirm = () => {
    confirm()
  }

  return (
    <div>
      
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {children}
        <DialogActions>
            <ThemeProvider theme={buttonTheme}>
          {/* <Button color="primary" variant="contained" onClick={confirm ? handleConfirm : handleClose}></Button> */}
          <FillButton action={confirm ? handleConfirm : handleClose}>OK</FillButton>
          {confirm ? 
           <Button color="secondary" variant="outlined" onClick={handleClose}>Back</Button>
           :
           ""
        }
          </ThemeProvider>
          
         
        </DialogActions>
      </Dialog>
    </div>
  );
}
