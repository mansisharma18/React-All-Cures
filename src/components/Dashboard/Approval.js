import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import TestAjax from './test/TestAjax'

export default function Approval(props) {
 
  return (
    <React.Fragment>
      <Title>Approval Articles</Title>
      <TestAjax name="approval_article"/>
     
      <Typography color="textSecondary">
      </Typography>
   
    </React.Fragment>
  );
}