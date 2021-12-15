import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { backendHost } from '../../api-config';
import { useHistory } from 'react-router-dom';


export default function Userprofile(props) {
    const [profileId, setProfile] = useState(Cookies.get('acPerm').split('|')[0])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [regType, setRegType] = useState('')
    const [email, setEmail] = useState('')
    const [isLoaded, setLoaded] = useState(false)
    const history = useHistory()

    const getProfile = () => {
        axios.get(`${backendHost}/profile/${profileId}`)
        .then(res => {
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setEmail(res.data.email_address)
            // setRegType(res.data.registration_type)
            setLoaded(true)
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        getProfile()
        // eslint-disable-next-line
    }, [])
    
    if(!isLoaded){
      return(
      <>
      <Header history={history}/>
      <div className="loader my-4">
        <i className="fa fa-spinner fa-spin fa-6x" />
      </div>
      <Footer/>
      </>
      );
    } else {
      return (
        <div>
          <Header history={history}/>
          
          <section className="Profileleft" id="sectionMain">
            <div className="container">
              <div className="row">
                <div className="col-md-8 pd-0">
                  <div className="profile-card clearfix">
                    <div className="col-md-3">
                      <div className="profileImageBlok">
                        <div className="profile-card-img text-center">
                          <i className="fas fa-user-md fa-6x"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="profile-info">
                        <div className="profile-infoL-card">
                          <div className="profile-info-name" id="DocDetails">
                          <div className="h4 font-weight-bold">
                          <div>
            <div className="h4 text-capitalize">Name: {firstName} {lastName}</div>
            <div className="h5"><span className=''>Email:</span> {email}</div>
            {/* <div className="h5"><span className=''>Registration Type:</span> {regType}</div> */}
        </div>
                            </div>
                            {/* <!--  <button onclick="loadUsers()">Click</button> --> */}
                          </div>
                          
                        </div>
                      </div>
                    {/* </div> */}
                  
                    
                  </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      );
    }
    } 
    
        