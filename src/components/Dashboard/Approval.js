import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import TestAjax from './test/TestAjax'
// import TestAjax from "../Test/TestAjax"
import { useState } from 'react'


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});


export default function Approval(props) {
  const classes = useStyles();                                                                      
 
  return (
    <React.Fragment>
      <Title>Approval Articles</Title>
      <TestAjax name="approval_article"/>
     
      <Typography color="textSecondary">
      </Typography>
   
    </React.Fragment>
  );
}