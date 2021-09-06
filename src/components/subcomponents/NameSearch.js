/* eslint-disable no-use-before-define */
import React, { useEffect, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete'
import { AdminContext } from '../../context/AdminContext'
import { Grid, Typography } from '@material-ui/core'

const filter = createFilterOptions()

export default function FreeSoloCreateOptionDialog({ data }) {
  const membersData = []

  const [value, setValue] = React.useState(null)
  const [open, toggleOpen] = React.useState(false)
  const {setUserObject} = useContext(AdminContext)


  const handleClose = () => {
    setDialogValue({
      name: '',
      email: '',
      telephone: '',
      password: '',
    })

    toggleOpen(false)
  }

  const [dialogValue, setDialogValue] = React.useState({
    name: '',
    email: '',
    telephone: '',
    password: '',
  })

  const handleSubmit = event => {
    event.preventDefault()
    setValue({
      name: dialogValue.name,
      email: dialogValue.email,
      telephone: dialogValue.telephone,
      password: dialogValue.password,
    })

    handleClose()
  }
  // push graphql data to the membersData array
  useEffect(() => {
    data.forEach(edge => {
      membersData.push({
        name: edge.node.name,
        email: edge.node.email,
        telephone: edge.node.telephone,
      })
    })
  })

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true)
              setDialogValue({
                name: newValue,
                email: '',
                telephone: '',
                password: '',
              })
            })
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true)
            setDialogValue({
              name: newValue.inputValue,
              email: '',
              telephone: '',
              password: '',
            })
          } else {
            setValue(newValue)
            setUserObject(data.map((edge) => (
                edge.node.name === newValue.name ?  
                {name: edge.node.name,
                email: edge.node.email,
                telephone: edge.node.telephone,
                }
                :
                {}
  )).filter(value => Object.keys(value).length !== 0))
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            })
          }

          return filtered
        }}
        id="free-solo-dialog-demo"
        options={membersData}
        getOptionLabel={option => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option
          }
          if (option.inputValue) {
            return option.inputValue
          }
          return option.name
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={option =>
          `${option.name} ${option.email ? `(${option.email})` : ''}  `
        }
        style={{ width: 300 }}
        freeSolo
        renderInput={params => (
          <TextField {...params} label="Member name" variant="outlined" />
        )}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-name"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-name">Add a new user</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={dialogValue.name}
                  onChange={event =>
                    setDialogValue({ ...dialogValue, name: event.target.value })
                  }
                  label="name"
                  type="text"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="email"
                  value={dialogValue.email}
                  onChange={event =>
                    setDialogValue({
                      ...dialogValue,
                      email: event.target.value,
                    })
                  }
                  label="email"
                  type="email"
                  
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="tel"
                  value={dialogValue.telephone}
                  onChange={event =>
                    setDialogValue({
                      ...dialogValue,
                      telephone: event.target.value,
                    })
                  }
                  label="telephone"
                  type="tel"
                  style={{color: "black"}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  id="password"
                  value={dialogValue.password}
                  onChange={event =>
                    setDialogValue({
                      ...dialogValue,
                      password: event.target.value,
                    })
                  }
                  label="generic password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
              <DialogContentText style={{padding: '0 auto'}}>
              <Typography style={{margin: '0 auto'}} variant="body2">
              users should change their passwords after you have given it to them
              </Typography>
          </DialogContentText>
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleClose}
              color="text-secondary"
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}
