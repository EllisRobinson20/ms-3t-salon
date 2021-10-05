import * as React from 'react';
import { styled } from '@material-ui/core';
import { Button } from '@material-ui/core';

const ColorButton = styled(Button)(({ theme }) => ({
    color: '#fff!important',
    backgroundColor: '#d52349',
    '&:hover': {
      backgroundColor: '#e14a6a',
    },
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