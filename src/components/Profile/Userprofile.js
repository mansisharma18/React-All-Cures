import React, { useState, useEffect } from 'react';
import Cookies, { set } from 'js-cookie';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { backendHost } from '../../api-config';
import { useHistory } from 'react-router-dom';

export default function Userprofile(props) {
    const [profileId, setProfile] = useState(Cookies.get('acPerm').split('|')[0])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [isLoaded, setLoaded] = useState(false)
    const history = useHistory()

    const getProfile = () => {
        axios.get(`${backendHost}/profile/${profileId}`)
        .then(res => {
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setAge(res.data.age)
            setEmail(res.data.email)
            setGender(res.data.gender)
            setLoaded(true)
            console.log('Profile: ', res.data)
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        getProfile()
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
      // console.log(new URLSearchParams(this.props.location.search).get("edit"))
      return (
        <div>
          <Header history={history}/>
          
          <section className="Profileleft mb-5">
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
            <div className="h6">Age: {age}</div>
            <div className="h6">Email: {email}</div>
            <div className="h6">Gender: {gender}</div>
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
    
        