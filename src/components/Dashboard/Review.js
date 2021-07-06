import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import TestAjax from './test/TestAjax'

export default function Review(props) {
 
  return (
    <React.Fragment>
      <Title>Review Articles</Title>
      <TestAjax name="review_article"/>
     
      <Typography color="textSecondary">
      </Typography>
   
    </React.Fragment>
  );
}