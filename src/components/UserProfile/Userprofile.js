import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Userprofile(props) {
    const [profileId, setProfile] = useState(Cookies.get('acPerm').split('|')[0])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')

    const getProfile = () => {
        axios.get(`/profile/${profileId}`)
        .then(res => {
            setFirstName(res.data.first_name)
            setLastName(res.data.last_name)
            setAge(res.data.age)
            setEmail(res.data.email)
            setGender(res.data.gender)
            console.log('Profile: ', res.data)
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        getProfile()
    }, [])
    
    return (
        <div>
            <div className="h6 text-capitalize">Name: {firstName} {lastName}</div>
            <div className="h6">Age: {age}</div>
            <div className="h6">Email: {email}</div>
            <div className="h6">Gender: {gender}</div>
        </div>
    );
}