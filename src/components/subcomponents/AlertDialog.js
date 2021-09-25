import * as React from 'react';
import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { Slide } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles'

const buttonTheme = createTheme({
  palette: { primary: { main: '#d52349' } },
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({children, openDialog, action}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    action(false);
  };

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
          <Button color="primary" variant="contained" onClick={handleClose}>Ok</Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}
