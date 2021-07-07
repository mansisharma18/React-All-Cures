import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import TestAjax from './test/TestAjax'

export default function Draft(props) {
 
  return (
    <React.Fragment>
      <Title>Draft Articles</Title>
      <TestAjax name="draft_article"/>
     
      <Typography color="textSecondary">
      </Typography>
   
    </React.Fragment>
  );
}