import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import TestAjax from './test/TestAjax'

export default function Deposits(props) {
 
  return (
    <React.Fragment>
      <Title>Published Articles</Title>
      <TestAjax name="published_article"/>
     
      <Typography color="textSecondary">
      </Typography>
   
    </React.Fragment>
  );
}