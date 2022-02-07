
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom';
import AllPost from './Allpost';
import { Alert, Form } from 'react-bootstrap';





function App() {
  const [first, setFirst] = useState();
  const [middle, setMiddle] = useState();
  const [last, setLast] = useState();
  const [status,setStatus] = useState('')
  const [authorAddr, setAddr] = useState()
  const [emaill, setEmail] = useState()
  const [type,setType] = useState()
  const[id,setId] = useState()
 
  const[hospital,setHospital] = useState()
  const[spl,setSpl] = useState('')
  const[splName,setSplName] = useState('')
  const[cityCode,setCityCode] = useState('')
  const[cityName,setCityName] = useState('')
  const[state, setState] = useState('')
    const[stateList,setStateList] = useState([])
    const[splId,setSplId] = useState()
    const [countriesList,setCountriesList] = useState([])
  const [country, setCountry] = useState('')
  const [stateName, setStateName] = useState()
  const[countryName,setCountryName] = useState()
  const [alert,setAlert] = useState()
  const [hospitalAlert,setHospitalAlert] = useState()
  const [specialtiesAlert,setSpecialtiesAlert] = useState()
  const [cityAlert,setCityAlert] = useState()
  const [stateAlert,setStateAlert] = useState()
  const [countryAlert,setCountryAlert] = useState()
  
  const submitForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}admin/create/author  `, {
        "author_firstname": first,
        "author_middlename": middle,
        "author_lastname": last,
        "author_status": parseInt(status),
        "reg_type": parseInt(type),
        "author_email": emaill,
        "reg_doc_pat_id":parseInt(id),
    })
    .then(res => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const hospitalForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}admin/create/hospital  `, {
        // "hospitalid": parseInt(hospitalId),
        "hospital_affliated": hospital,
    })
    .then(res => {
        setHospitalAlert(true)
        setTimeout(() => {
            setHospitalAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const specialtiesForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}admin/create/specialties  `, {
        // "splid": parseInt(spl),
        "spl_name": splName,
    })
    .then(res => {
        setSpecialtiesAlert(true)
        setTimeout(() => {
            setSpecialtiesAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const cityForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}admin/create/city  `, {
        // "citycode": parseInt(cityCode),
        "cityname": cityName,
        "state_name":parseInt(state),
        "country_code":parseInt(country),
    })
    .then(res => {
        setCityAlert(true)
        setTimeout(() => {
            setCityAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const statesForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}admin/create/states  `, {
        // "codeid": parseInt(state),
        "statename":stateName,
        "country_code":parseInt(country),
    })
    .then(res => {
        setStateAlert(true)
        setTimeout(() => {
            setStateAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}

const countriesForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}admin/create/countries  `, {
        // "countrycodeid": parseInt(country),
        "countryname":countryName,
       
    })
    .then(res => {
        setCountryAlert(true)
        setTimeout(() => {
            setCountryAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
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

const getSpecialties = () => {
    axios.get(`${backendHost}/article/all/table/specialties`)
    .then(res => {
        
        setSplId(res.data)
    })
    .catch(err => 
        console.log(err)
    )
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


useEffect(() => {
     getState()
     getCountries()   
     getSpecialties()
 
}, []) 
  return (
      
  
          
          <div className="promo-page">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Author Table</div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author First Name</Form.Label>
                            <Form.Control value={first} onChange={(e) => setFirst(e.target.value)}  type="text" name=""
                            placeholder="Enter Author First Name..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Middle Name</Form.Label>
                            <Form.Control  value={middle} onChange={(e) => setMiddle(e.target.value)} type="text" name=""
                            placeholder="Enter Author Middle Name..." />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Last Name</Form.Label>
                            <Form.Control value={last} onChange={(e) => setLast(e.target.value)}  type="text" name=""
                            placeholder="Enter Author Last Name..." required/>
                        </Form.Group>
                   
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Status</Form.Label>
                            <Form.Control value={status} onChange={(e) => setStatus(e.target.value)}   type="text" name=""
                            placeholder="Enter Author Status..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Email</Form.Label>
                            <Form.Control value={emaill} onChange={(e) => setEmail(e.target.value)}  type="text" name=""
                            placeholder="Enter Author Email..."
                            />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Type</Form.Label>
                            <Form.Control value={type} onChange={(e) => setType(e.target.value)}  type="text" name=""
                            placeholder="Enter Author Type..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Author Id</Form.Label>
                            <Form.Control value={id} onChange={(e) => setId(e.target.value)}  type="text" name=""
                            placeholder="Enter Author Id..." required/>
                        </Form.Group>
                        {
                            alert?
                                <Alert variant="success" className="h6 mx-3">Author Create successfully!!</Alert>
                                : null
                        }
                     
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>


                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Hospital Table</div>
                        <form onSubmit={hospitalForm}>
                            <div className="row m-4">
                        {/* <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Hospital Id</Form.Label>
                            <Form.Control value={hospitalId} onChange={(e) => setHospitalId(e.target.value)}  type="text" name=""
                            placeholder="Enter Hospital Id..." />
                        </Form.Group> */}
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Hospital Name</Form.Label>
                            <Form.Control value={hospital} onChange={(e) => setHospital(e.target.value)}  type="text" name=""
                            placeholder="Enter Hospital Name..." required/>
                        </Form.Group>
                        {
                            hospitalAlert?
                                <Alert variant="success" className="h6 mx-3">Hospital Create successfully!!</Alert>
                                : null
                        }
                   
                     
                        </div>
                     
                      
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Speciality Table</div>
                        <form onSubmit={specialtiesForm}>
                            <div className="row m-4">
                        {/* <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Speciality Id</Form.Label>
                            <Form.Control value={spl} onChange={(e) => setSpl(e.target.value)}  type="text" name=""
                            placeholder="Enter Speciality Id..." required/>
                        </Form.Group> */}
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Speciality Name</Form.Label>
                            <Form.Control value={splName} onChange={(e) => setSplName(e.target.value)}  type="text" name=""
                            placeholder="Enter Speciality Name..." required/>
                        </Form.Group>
                    
                        {
                            specialtiesAlert?
                                <Alert variant="success" className="h6 mx-3">Specialties Create successfully!!</Alert>
                                : null
                        }
                        
                        </div>
                     
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

                
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">City Table</div>
                        <form onSubmit={cityForm}>
                            <div className="row m-4">
                        {/* <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter City Id</Form.Label>
                            <Form.Control value={cityCode} onChange={(e) => setCityCode(e.target.value)}  type="text" name=""
                            placeholder="Enter City Id..." required/>
                        </Form.Group> */}
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter City Name</Form.Label>
                            <Form.Control value={cityName} onChange={(e) => setCityName(e.target.value)}  type="text" name=""
                            placeholder="Enter City Name..." required/>
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
                     
                        {
                            cityAlert?
                                <Alert variant="success" className="h6 mx-3">City Create successfully!!</Alert>
                                : null
                        }
                        </div>
                     
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

                    
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">State Table</div>
                        <form onSubmit={statesForm}>
                            <div className="row m-4">
                        {/* <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter State Id</Form.Label>
                            <Form.Control value={state} onChange={(e) => setState(e.target.value)}  type="text" name=""
                            placeholder="Enter State Id..." required/>
                        </Form.Group> */}
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter State Name</Form.Label>
                            <Form.Control value={stateName} onChange={(e) => setStateName(e.target.value)}  type="text" name=""
                            placeholder="Enter State Name..." required/>
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
                     
                        {
                            stateAlert?
                                <Alert variant="success" className="h6 mx-3">State Create successfully!!</Alert>
                                : null
                        }
                        </div>
                     
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>
                     
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Country Table</div>
                        <form onSubmit={countriesForm}>
                            <div className="row m-4">
                        {/* <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Country Id</Form.Label>
                            <Form.Control value={country} onChange={(e) => setCountry(e.target.value)}  type="text" name=""
                            placeholder="Enter Country Id..." required/>
                        </Form.Group> */}
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Country Name</Form.Label>
                            <Form.Control value={countryName} onChange={(e) => setCountryName(e.target.value)}  type="text" name=""
                            placeholder="Enter Country Name..." required/>
                        </Form.Group>
                   
                   
                     
                        {
                            countryAlert?
                                <Alert variant="success" className="h6 mx-3">Country Create successfully!!</Alert>
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