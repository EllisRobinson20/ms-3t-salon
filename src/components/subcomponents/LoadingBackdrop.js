import * as React from 'react';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';


export default function LoadingBackdrop({loading}) {
  
  return (
    <div>
      <Backdrop
        style={{ color: '#fff', zIndex: 1}}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}