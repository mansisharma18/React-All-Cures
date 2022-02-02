import React from 'react';
import ReactDOMServer from 'react-dom/server';
// import express from 'express';
import { Helmet } from 'react-helmet';
// import App from './App';
import HelmetMetaData from './components/HelmetMetaData';
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/*', (req, res) => {
    const appString = ReactDOMServer.renderToString(<HelmetMetaData />);
    const helmet = Helmet.renderStatic();
  
    const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
        </head> 
        <body>
          <div id="root">
            ${ appString }
          </div>
        </body>
      </html>
    `
    console.log('htmllllllllllllllllllllllllll: ', html)
    res.send(html);
  });
  
//   app.listen(port);
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });