import React, {useState} from 'react'
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core'
import firebase from 'firebase';

const isBrowser = typeof window !== "undefined"

export default function CreateAdmin() {
  const [formDetailEmail, setFormDetailEmail] = useState();

  const createNewAdmin = (e) => {
    e.preventDefault();
    const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
    if (isBrowser) {
      addAdminRole(formDetailEmail).then(result => {
        /* console.log(result); */
      });
    };
  };
  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input type="email" id="my-input" aria-describedby="my-helper-text" onChange={event => {setFormDetailEmail({email: event.target.value})}} />
        <FormHelperText id="my-helper-text">
          New admin user's email
        </FormHelperText>
      </FormControl>
      <FormControl>
      <Button style={{marginLeft: '1em',width: '80%'}} size="large" variant="contained" color="primary" onClick={(e) => {createNewAdmin(e)}} >Create</Button>
      </FormControl>
    </div>
  )
}
