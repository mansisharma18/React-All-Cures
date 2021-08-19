import React, { useEffect, useState } from 'react';
import Main from './components/MainComponent';
// import ReactGA from 'react-ga';

function App() {
<<<<<<< HEAD
  var location = useState(window.location.pathname)
  useEffect(() => {
    ReactGa.initialize('G-TJ5NKXF48X')

    // console.log('Reacttttttttttttttttttttttt Analyticsssssssssssssssssssssssssss')
    // console.log(window.location.pathname + window.location.search)
    
    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])
=======
  // var location = useState(window.location.pathname)
  // useEffect(() => {
  //   ReactGA.initialize('UA-161186843-1')
  //   ReactGA.pageview(window.location.pathname + window.location.search)
  // }, [])
>>>>>>> e0d0f88ac722155ed832063280a36c5abbb2979f
  return (
    <div>
      <Main/>
    </div>
  );
}

export default App;
