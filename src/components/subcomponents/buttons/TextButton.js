import * as React from 'react';
import { styled } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import { purple } from '@material-ui/core/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  color:  '#d52349!important',/* theme.palette.getContrastText(purple[500]), */
  /* '&:hover': {
    color: purple[700],
  }, */
}));


export default function TextButton(props) {
  const handleClick = () => {
    props.action()
  }
  return (
      <ColorButton disableRipple onClick={() => {handleClick()}}>
       {props.children}
      </ColorButton>
  );
}