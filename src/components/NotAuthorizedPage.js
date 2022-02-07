import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useHistory } from 'react-router';

const NotAuthorizedPage = (props) => {
    const [count , setCount] = useState(6)
    const history = useHistory()

    function redirectToCures() {
        setTimeout(() => {
            setCount(count - 1)
        }, 1000);
        if(count === 0){
            history.replace('/cures')
        }
    }
    useEffect(() => {
        redirectToCures()
    }, [count])
    return(
        <>  
            <Header history={history}/>
            <div className='not-found-page'>
                <div className="container mt-3 mb-5">
                    <div className="text-center error-404">403</div>
                    <div className="d-flex text-center justify-content-center">
                        {/* <div className="error-404">404</div> */}
                        <div className="h3 not-found-msg text-center">
                            Oops...
                            <div>You don't have</div> 
                            the authorization 
                            <div>for that Web Page.</div>
                        </div>
                    </div>
                    <div className="h4 text-center">Redirecting to Cures in {count}....</div>

                </div>
                </div>
            <Footer/>
        </>
    )
}

export default NotAuthorizedPage;