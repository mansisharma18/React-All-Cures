import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import TestAjax from './test/TestAjax'

export default function Deposits(props) {
 
  return (
    <React.Fragment>
      <div className="h5">Published Articles: <TestAjax name="published_article"/></div>
      
     
      <Typography color="textSecondary">
      </Typography>
   
    </React.Fragment>
  );
}