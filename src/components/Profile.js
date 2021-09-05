import React, {useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ProfileContext } from '../context/ProfileContext'
import ProfileTabs from '../components/subcomponents/ProfileTabs'



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    
    
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal() {
    const {showProfile, setShowProfile} = useContext(ProfileContext);  

    useEffect(() => {
        handleOpen()
    }, [showProfile]);


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(showProfile);
  };

  const handleClose = () => {
    setOpen(false);
    setShowProfile(!showProfile)
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <ProfileTabs/>
        </Fade>
      </Modal>
    </div>
  );
}
