import * as React from 'react';
import { styled } from '@material-ui/core';
import { Button } from '@material-ui/core';

const ColorButton = styled(Button)(({ theme }) => ({
  color:  '#d52349!important',
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