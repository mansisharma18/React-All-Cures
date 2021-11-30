import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const NotFound = (props) => {
    console.log(props)
    return(
        <>  
            <Header/>
            <div className='not-found-page'>
                <div className="container mt-3 mb-5">
                    <div className="text-center error-404">404</div>
                    <div className="d-flex text-center justify-content-center">
                        {/* <div className="error-404">404</div> */}
                        <div className="h3 not-found-msg">
                            This is not the
                            <div>web page you</div> 
                            are looking for.
                        </div>
                    </div>
                </div>
                </div>
            <Footer/>
        </>
    )
}

export default NotFound;