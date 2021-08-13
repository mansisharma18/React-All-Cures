import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const EditProfile = (props) => {
    const item = props.items
    const [firstName, setFirst] = useState(item.docname_first)
    const [lastName, setLast] = useState(item.docname_last)
    const [primarySpl, setPrimary] = useState(item.primary_spl_code)
    const [secondarySpl, setSecondary] = useState(item.specialties)
    const [otherSpl, setOther] = useState(item.other_spls)
    const [education, setEducation] = useState(item.edu_training)
    const [num, setNum] = useState(item.telephone_nos)
    const [hospital, setHospital] = useState(item.hospital_affliated_code)
    const [acceptInsurance, setInsurance] = useState(item.insurance_accept)
    const [gender, setGender] = useState(item.gender)
    const [about, setAbout] = useState(item.about)
    const [diseaseList, setDiseaseList] = useState([])
    const [hospitalList, setHospitalList] = useState([])

    const history = useHistory();

    const routeChange = (docid) =>{ 
        let path = `/profile/${docid}`; 
        history.replace(path);
    }

    const formSubmit = (e) => {
        e.preventDefault()
        console.log(firstName, lastName, primarySpl, secondarySpl, otherSpl, education, num, hospital, acceptInsurance, gender)
        axios.post("/doctors/updateprofile", {
            "docid": item.docid,
            "docname_first" : firstName,
            "docname_last" : lastName,
            "primary_spl" : primarySpl,
            "sub_spls": secondarySpl,
            "other_spls": otherSpl,
            "edu_training": education,
            "telephone_nos": num,
            "hospital_affliated": hospital,
            "insurance_accept": acceptInsurance,
            "gender": gender,
            "about": about
        })
        .then(res => {
            console.log(res)
            setTimeout(() => {
              window.location.reload()
            }, 1000);
            // window.location.reload()
        })
        .catch(res => {
            console.error(res)
        })
    }

    const fetchTables = () => {
        Promise.all([
            fetch('/article/all/table/specialties').then(res => res.json()),
            fetch('/article/all/table/hospital').then(res => res.json()),
            // fetch('/article/all/table/countries').then(res => res.json()),
        ]).then(([diseaseData, hospitalData]) => {
            console.log('Speciality Data: ', diseaseData)
            console.log('Hospital Data: ', hospitalData)
            setDiseaseList(diseaseData)
            setHospitalList(hospitalData)
        })
    }

    useEffect(() => {
        fetchTables()
    }, [])

    console.log(props.items.primary_spl)
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-4"
      >
          <form onSubmit={formSubmit}>
        <Modal.Header className="p-4 mb-4" closeButton style={{backgroundColor: '#b9daf1'}}>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4">
          {/* <div className="h5">Centered Modal</div> */}
          <Form.Group className="col-md-6 float-left" >
            <Form.Label>First Name</Form.Label>
            <Form.Control value={firstName} onChange={(e) => setFirst(e.target.value)} style={{border: "1px solid #ced4da"}} type="text" name=""
              placeholder="Enter first name" required/>
          </Form.Group>
          <Form.Group className="col-md-6 float-left" >
            <Form.Label>Last Name</Form.Label>
            <Form.Control value={lastName} onChange={(e) => setLast(e.target.value)} style={{border: "1px solid #ced4da"}} type="text" name=""
            placeholder="Enter last name" />
          </Form.Group>
          <Form.Group className="col-md-12 float-left" >
          <FormControl component="fieldset">
      <FormLabel component="legend" className="text-dark">Gender</FormLabel>
      <RadioGroup value={gender} onChange={(e) => {setGender(e.target.value); console.log(e.target.value)}}
      style={{display: 'flex', flexDirection:'row'}}>
        <FormControlLabel value="1" control={<Radio />} label="Female" />
        <FormControlLabel value="2" control={<Radio />} label="Male" />
        <FormControlLabel value="3" control={<Radio />} label="Other" />
      </RadioGroup>
      
    </FormControl>
    </Form.Group>
          <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Primary Speciality</Form.Label>
                                        <Form.Control onChange={(e)=> {setPrimary(e.target.value)}} value={primarySpl} as="select" name="diseaseConditionId" custom required>
                                        <option>Select primary speciality</option>
                                            {diseaseList.map((i) => (  
                                                <option value={i[0]}>{i[1]}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
          <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Secondary Speciality</Form.Label>
                                        <Form.Control onChange={(e) => setSecondary(e.target.value)} value={secondarySpl} as="select" name="diseaseConditionId" custom>
                                        <option>Select secondary speciality</option>
                                            {diseaseList.map((i) => (  
                                                <option value={i[0]}>{i[1]}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
          <Form.Group className="col-md-12 float-left" >
            <Form.Label>Additional Specialities</Form.Label>
            <Form.Control value={otherSpl} onChange={(e) => setOther(e.target.value)} style={{border: "1px solid #ced4da"}} type="text" name=""
            placeholder="Enter additional specialities" />
          </Form.Group>
          <Form.Group className="col-md-12 float-left" >
            <Form.Label>Education</Form.Label>
            <Form.Control value={education} onChange={(e) => setEducation(e.target.value)} style={{border: "1px solid #ced4da"}} type="text" name=""
            placeholder="Enter education"/>
          </Form.Group>
          <Form.Group className="col-md-12 float-left" >
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control value={num} onChange={(e) => setNum(e.target.value)} style={{border: "1px solid #ced4da"}} type="text" name=""
            placeholder="Enter contact number" />
          </Form.Group>
          <Form.Group className="col-md-12 float-left">
                                        <Form.Label>Hospital Affliated</Form.Label>
                                        <Form.Control onChange={e => setHospital(e.target.value)} as="select" name="hospital_affliated" custom value={hospital} >
                                        <option>Select hospital</option>
                                            {hospitalList.map((i) => (  
                                                <option value={i[0]}>{i[1]}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
          
          <Form.Group className="col-md-12 float-left" >
          <FormControl component="fieldset">
      <FormLabel component="legend" className="text-dark">Do you accept insurance</FormLabel>
      <RadioGroup defaultValue={acceptInsurance}
      onChange={(e) => {setInsurance(e.target.value)}} 
      style={{display: 'flex', flexDirection:'row'}} >
        <FormControlLabel value="1" control={<Radio />} label="Yes" />
        <FormControlLabel value="0" control={<Radio />} label="No" />
      </RadioGroup>
      
    </FormControl>
    </Form.Group>
          <Form.Group className="col-md-12 float-left" style={{zIndex: 1}}>
          <Form.Label>Tell us about yourself</Form.Label>
      <Form.Control
        defaultValue={about}
        onChange={(e) => setAbout(e.target.value)}
        as="textarea"
        placeholder="Leave a comment here"
        style={{ height: '100px' }}
      />
                              </Form.Group>
          <p className="text-center">
            We never share your details without your consent.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="dark" type="submit">Submit</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }

  export default EditProfile;