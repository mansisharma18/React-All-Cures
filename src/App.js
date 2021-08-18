import React, { useEffect, useState } from 'react';
import Main from './components/MainComponent';
// import ReactGA from 'react-ga';

function App() {
  // var location = useState(window.location.pathname)
  // useEffect(() => {
  //   ReactGA.initialize('UA-161186843-1')
  //   ReactGA.pageview(window.location.pathname + window.location.search)
  // }, [])
  return (
    <div>
      <Main/>
    </div>
  );
}

export default App;
