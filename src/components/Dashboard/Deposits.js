import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import TestAjax from "../Test/TestAjax"
import { useState } from 'react'


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});


export default function Deposits(props) {
  const classes = useStyles();
 
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <TestAjax name="published_article"/>
      <TestAjax name="approval_article"/>
      {/* <p>!!{props.quip}</p> */}

      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <Typography color="textSecondary">
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}