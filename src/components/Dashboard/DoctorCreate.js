
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom';
import AllPost from './Allpost';
import { Alert, Form } from 'react-bootstrap';





function App() {
  const[prefix,setPrefix] = useState()  
  const[first,setFirst] = useState()
  const[middle,setMiddle] = useState()
  const[last,setLast] = useState()
  const[gender,setGender] = useState('')
  const[edu,setEdu] = useState('')
  const[insurance,setInsurance] = useState('')
  const[location,setLocation] = useState('')
  const[pincode,setPincode] = useState('')
  const [countriesList,setCountriesList] = useState([])
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [cityList,setCityList] = useState([])
  const[state, setState] = useState('')
  const[stateList,setStateList] = useState([])
  const[disease,setDisease] = useState('')
  const[diseaseList,setDiseaseList] = useState([])
  const[hospital,setHospital] = useState('')
  const[hospitalList,setHospitalList] = useState([])
  const [alert,setAlert] = useState()



  

  const submitForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}admin/create/doctors  `, {
        "prefix":prefix,
        "docname_first": first,
        "docname_middle": middle,
        "docname_last": last,
        "gender":parseInt(gender),
        "edu_training":edu,
        "insurance_accept":parseInt(insurance),
        "hospital_affliated":parseInt(hospital),
        "primary_spl":parseInt(disease),
        "city":parseInt(city),
        "state":parseInt(state),
        "country_code":parseInt(country),
        "location":parseInt(location),
        "pincode":parseInt(pincode)
    
    })
    .then(res => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}
  const getCountries = () => {
    axios.get(`${backendHost}/article/all/table/countries`)
    .then(res => {
        
        setCountriesList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getCity = () => {
    axios.get(`${backendHost}/article/all/table/city`)
    .then(res => {
        
        setCityList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getState = () => {
    axios.get(`${backendHost}/article/all/table/states`)
    .then(res => {
        
        setStateList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getDisease = () => {
    axios.get(`${backendHost}/article/all/table/specialties`)
    .then(res => {
        
        setDiseaseList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getHospital = () => {
    axios.get(`${backendHost}/article/all/table/hospital`)
    .then(res => {
        
        setHospitalList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}
 

useEffect(() => {
    
  
    getCountries()
    getCity()
   getState()
   getDisease()
   getHospital()
 
}, []) 



  return (
      
  
          
          <div className="promo-page">
                <div className="container">
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Doctors Table</div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                            <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Doctor Prefix</Form.Label>
                            <Form.Control value={prefix} onChange={(e) => setPrefix(e.target.value)}   type="text" name=""
                            placeholder="Enter Doctor Prefix..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Doctor First Name</Form.Label>
                            <Form.Control value={first} onChange={(e) => setFirst(e.target.value)}  type="text" name=""
                            placeholder="Enter Doctor First Name..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Doctor Middle Name</Form.Label>
                            <Form.Control value={middle} onChange={(e) => setMiddle(e.target.value)}  type="text" name=""
                            placeholder="Enter Doctor Middle Name..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Doctor Last Name</Form.Label>
                            <Form.Control value={last} onChange={(e) => setLast(e.target.value)}  type="text" name=""
                            placeholder="Enter Doctor Last Name..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Doctor Gender</Form.Label>
                            <Form.Control value={gender} onChange={(e) => setGender(e.target.value)}  type="text" name=""
                            placeholder="Enter Doctor Gender..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Edu Training</Form.Label>
                            <Form.Control value={edu} onChange={(e) => setEdu(e.target.value)}  type="text" name=""
                            placeholder="Enter Edu Training..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Insurance Accept</Form.Label>
                            <Form.Control value={insurance} onChange={(e) => setInsurance(e.target.value)}  type="text" name=""
                            placeholder="Enter Insurance Accept..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Hospital</label>
<select name="hospital" value={hospital} onChange={(e) => setHospital(e.target.value)} placeholder=" Enter Hospital" required="" className="form-control">
<option>Select Hospital</option>
    {hospitalList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Speciality</label>
<select name="speciality" value={disease} onChange={(e) => setDisease(e.target.value)} placeholder=" Enter Speciality" required="" className="form-control">
<option>Select speciality</option>
    {diseaseList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter City</label>
<select name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder=" Enter City" required="" className="form-control">
<option>Select City</option>
    {cityList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter State</label>
<select name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter State" required="" className="form-control">
<option>Select State</option>
    {stateList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            {/* <Form.Label>Enter Country</Form.Label> */}

                            <label htmlFor="">Enter Country</label>
<select name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder=" Enter Country" required="" className="form-control">
<option>Select Country</option>
    {countriesList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Location</Form.Label>
                            <Form.Control value={location} onChange={(e) => setLocation(e.target.value)}  type="number" name=""
                            placeholder="Enter Location..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Pincode</Form.Label>
                            <Form.Control value={pincode} onChange={(e) => setPincode(e.target.value)}  type="text" name=""
                            placeholder="Enter Pincode..." required/>
                        </Form.Group>
                        {
                            alert?
                                <Alert variant="success" className="h6 mx-3">Doctor Create successfully!!</Alert>
                                : null
                        }
                        </div>
                     
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

                   

                
                   

                    
                   
                     
                     
                </div>
            </div>
   
   
       
       
        

  );
}

export default App;