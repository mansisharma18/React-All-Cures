import React, {useEffect,useState, useRef} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import { Select, MenuItem } from '@material-ui/core'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../BlogPage/tools'
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Input from '@material-ui/core/Input';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { backendHost } from '../../api-config';
import CenterWell from '../Disease/CenterWell';
import { userId } from '../UserId'
import { userAccess } from '../UserAccess'
import { Button, Modal, Alert } from "react-bootstrap";

const EditModal = (props) => {

    const editId = useParams()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [articleDisplay, setArticleDisplay] = useState('')
    const [contentType,setContentType] = useState('')
    const [type,setType] = useState([])
    const [disclaimer, setDisclaimer] = useState('')
    const [copyright, setCopyright] = useState('')
    const [language, setLanguage] = useState('')
    const [author, setAuthor] = useState([])
    const [country, setCountry] = useState('')
    const [win, setWin] = useState('')
    const [articleStatus, setArticleStatus] = useStateWithCallbackLazy()
    const [editedBy, setEditedBy] = useState(0)
    const [disease, setDisease] = useState('')
    const [articleContent, setArticleContent] = useState('')
    const [diseaseList, setDiseaseList] = useState([])
    const [lanList,setLanList] = useState([])
    const [authList,setAuthList] = useState([])
    const [countriesList,setCountriesList] = useState([])
    const [disclaimerId,setDisclaimerId] = useState([]) 
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false);
    const [keywords, setKeywords] = useState('')
    const [lgShow, setLgShow] = useState(false);

   

    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')

    const [afterSubmitLoad, setafterSubmitLoad] = useState(false)
    
    function Alert(msg){
      setShowAlert(true)
      setAlertMsg(msg)
      setTimeout(() => {
         setShowAlert(false)
      }, 5000);
    }

    const getPosts = () =>{
        axios.get(`${backendHost}/article/${editId.id}`)
        .then(res => {
            setEditedBy(res.data.edited_by)
            setAuthor(JSON.parse(res.data.authored_by))
            setTitle(res.data.title);
            setDisclaimer(res.data.disclaimer_id)
            setCopyright(res.data.copyright_id)
            setLanguage(res.data.language_id)
            setWin(res.data.window_title)
            setArticleStatus(res.data.pubstatus_id)
            setArticleDisplay(res.data.friendly_name)
            setType(res.data.type)
            setContentType(res.data.content_type)
            setCountry(res.data.country_id)
            setDisease(res.data.disease_condition_id)
            setComment(res.data.comments) 
            setKeywords(res.data.keywords) 
            setArticleContent(JSON.parse(decodeURIComponent(res.data.content)))
        })
        .catch(err => 
            console.log("errrrrrrorrrrrrrrrrrrrrrrrr",err)
        )
    }
    
    const singlePostEdit = (e) => {
        e.preventDefault()
        setafterSubmitLoad(true)
        if(parseInt(articleStatus) === 3){
            axios.post(`${backendHost}/article/${editId.id}`, {
                "title":title,
                "friendly_name": articleDisplay,
                // "subheading": "1",,                
                "content_type": contentType,
                "type": type,
                // "keywords": "1",
                "window_title": win,
                // "content_location": "1",
                "authored_by": author,
                "published_by": parseInt(userId),
                // "edited_by": 1,
                // "copyright_id": parseInt(copyright),
                // "disclaimer_id": parseInt(disclaimer),
                "copyright_id": 11,
                "disclaimer_id": 1,
                "pubstatus_id": parseInt(articleStatus),
                "language_id": parseInt(language),
                "articleContent": encodeURIComponent(JSON.stringify(articleContent)),
                "country_id": parseInt(country),
                "keywords": keywords,
                "comments": comment,
                "disease_condition_id": disease
            })
            .then(res => {
                setafterSubmitLoad(false)
                if(res.data === 1){
                    Alert('Updated article successfully.') 
                    setTimeout(() => {
                        history.replace(`/cure/${editId.id}`)
                    }, 5000);  
                  } else {
                    Alert('Some error occured. Try again later')
                  }
                // setSuccMsg('Updated Successfully')
            })
            .catch(res => {
                setafterSubmitLoad(false)
                Alert('Some error occured. Try again later')
            })
        } else {
            axios.post(`${backendHost}/article/${editId.id}`, {
                "title":title,
                "friendly_name": articleDisplay,
                // "subheading": "1",
                "content_type": contentType,
                "type": type,
                // "keywords": "1",
                "window_title": win,
                // "content_location": "1",
                "authored_by": author,
                // "published_by": 1,
                "edited_by": parseInt(userId),
                // "copyright_id": parseInt(copyright),
                // "disclaimer_id": parseInt(disclaimer),
                "copyright_id": 11,
                "disclaimer_id": 1,
                "pubstatus_id": parseInt(articleStatus),
                "language_id": parseInt(language),
                "articleContent": encodeURIComponent(JSON.stringify(articleContent)),
                "comments": comment,
                "keywords": keywords,
                "country_id": parseInt(country),
            })
            .then(res => {
                setafterSubmitLoad(false)
                if(res.data === 1){
                    Alert('Updated article successfully.')
                    setTimeout(() => {
                        history.replace(`/cure/${editId.id}`)
                    }, 5000);
                  } else {
                    Alert('Some error occured. Try again later')
                  }
            })
            .catch(err => {
                setafterSubmitLoad(false)
                Alert('Some error occured. Try again later')
            })
        }
        
    }

    // useEffect(() => {
    //     checkAccess()
    // }, [articleStatus])

    const checkAccess = (stat) => {
        if(parseInt(userAccess) === 9 || [author].includes(userId) || parseInt(editedBy) === parseInt(userId) || parseInt(userAccess) === 4 || parseInt(userAccess) === 7){
            return null;
        }
        else if(stat === 2 && (parseInt(userAccess) === 7)){
            return null;
        }
        else{
            document.getElementById('article-submit').disabled = true
            window.alert('Restricted Access!!')
        }
    }
  



    const getLanguages = () => {
        axios.get(`${backendHost}/article/all/table/languages`)
        .then(res => {
            setLanList(res.data)
        })
        .catch(err => 
            console.log(err)
        )
    }

    const getAuthor = () => {
        axios.get(`${backendHost}/article/all/table/author`)
        .then(res => {
            setAuthList(res.data)
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

    const getDisclaimer = () => {
        axios.get(`${backendHost}/article/all/table/disclaimer`)
        .then(res => {
            setDisclaimerId(res.data)
        })
        .catch(err => 
            console.log(err)
        )
    }
    const getDisease = () => {
        axios.get(`${backendHost}/article/all/table/disease_condition`)
        .then(res => {
            setDiseaseList(res.data)
        })
        .catch(err => 
            console.log(err)
        )
    }
    
    const onAuthorChange = (e) => {
        if(author.includes(e.target.value)){
            return null
        } else {
            setAuthor(e.target.value)
        }
    }

    useEffect(() => {
        if(editId.id){
            getPosts()
        }
        getLanguages()
        getAuthor()
        getCountries()
        getDisclaimer()
        getDisease()  
        // eslint-disable-next-line   
    }, [userId])

    useEffect(() => {
        if(author !== undefined && parseInt(editedBy) !== 0){
            checkAccess(articleStatus, author, editedBy)
        }
        // eslint-disable-next-line
    }, [articleStatus])

    const instanceRef = useRef(null)

    const handleSelect = function(e, c) {
        const ctype = [];
        for (let i = 0; i < c.length; i++) {
            ctype.push(c[i].value);
        }
        setType(ctype, ()=> console.log(type));
    }

    const submitArticleForm = async e => {
        setafterSubmitLoad(true)
        e.preventDefault();
        console.log('author: ', author)
        axios.post(`${backendHost}/content?cmd=createArticle`, {
            "title":title,
                "friendlyName": articleDisplay,
                "contentType": contentType,
                "type": type,
                // "keywords": "1",
                "winTitle": win,
                // "content_location": "1",
                "authById": author.length !== 0? author: [],
                // "published_by": 1,
                // "copyright_id": parseInt(copyright),
                // "disclaimer_id": parseInt(disclaimer),
                "copyId": 11,
                "disclaimerId": 1,
                "diseaseConditionId": disease,
                "articleStatus": articleStatus? articleStatus: 2,
                "language": parseInt(language),
                "articleContent": encodeURIComponent(JSON.stringify(articleContent)),
                "comments": comment,
                "keywords": keywords,
                "countryId": country,
        })
        .then(res => {
            setafterSubmitLoad(false)
            if(parseInt(res.data) === 1){
                Alert('Cure created successfully! Wait for approval 😄')
            } else if(res.data === -2){
                Alert('Overview of this disease already exists.')
            } else {
                Alert('Some error occured! Please try again later.')
            }
        })
        .catch(err => {
            setafterSubmitLoad(false)
            Alert('Some error occured! Please try again later.')
        })
    }
    
    async function handleSave() {
        const savedData = await instanceRef.current.save();        
        setArticleContent(savedData)  
    }
    
    return (
        <>
            {   
                props.search === '?article'?
                    null
                : <Header history={history} />
            }
            {
                showAlert &&
                    <div className="alert alert-success pop-up border-bottom">
                        <div className="h5 mb-0 text-center">{alertMsg}</div>
                        <div className="timer"></div>
                    </div>
            }
            {
                afterSubmitLoad &&
                <div className="loader main on-submit-loading">
                    <i className="fa fa-spinner fa-spin fa-10x" />
                </div>
            }
            <div className="transparent_bg">
            <div className="container">
                <div className="card">
                <h2 className="mainTitle text-center h3 py-3 card-header">Cure</h2>
                    <div className="card-body">
                    <form action="" onSubmit={(e) => {
                        editId.id?
                        singlePostEdit(e)
                        : submitArticleForm(e)
                        // handleSave()
                    }}>
                    <div id="accordion">
                        <div className="card">
                            <div className="card-header" id="headingOne"  data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <h5 className="mb-0">
                                Cure Details
                            </h5>
                            </div>

                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                <div className="row">
                    <div className="col-lg-6 form-group">
                    <label htmlFor="">Title</label>
                    <input type="text" value={title}   onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" className="form-control" required/>
                </div>
                {
                    parseInt(userAccess) === 7 || parseInt(userAccess) === 9?
                    <>
                    <div className="col-lg-6 form-group">
                    <label htmlFor="">Cure Display Name</label>
                    <input type="text" value={articleDisplay}  onChange={(e) => setArticleDisplay(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Content Type</label>
                    <select name="contentType" placeholder="Content Type" 
                    value={contentType} 
                    onChange={(e)=> {
                        setContentType(e.target.value)
                     }}
                    required className="form-control">
                    <option>Open this select menu</option>
                        <option value="article">Article</option>
                        <option value="video">Video</option>
                      
                    </select>
                </div>
                


                <div className="col-lg-6 form-group">
                    <label htmlFor="">Type</label>
                    <select 
                    multiple
                    name="type" placeholder="Type" 
                    value={type}
                    onChange={(e)=> {
                        handleSelect(e, e.target.selectedOptions)
                    }}
                    required className="form-control">
                        <option value="1">Overview</option>
                        <option value="2">Treatment</option>
                        <option value="3">Symptoms</option>
                    </select>
                </div>
                
                {/* <div className="col-lg-6 form-group">
                    <label htmlFor="">Disclaimer ID</label>
                    <select name="" value={disclaimer}  onChange={(e) => setDisclaimer(e.target.value)} className="form-control" id="">
                    <option>Open this select menu</option>
                        {disclaimerId.map((lan) => {
                            return (
                                <option value={lan[0]}>{lan[0]}</option>
                            )
                        })}
                    </select>
                    
                </div>
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Copyright ID</label>
                    <select name="" value={copyright}  onChange={(e) => setCopyright(e.target.value)} className="form-control" id="">
                    <option>Open this select menu</option>
                        <option value="11">Temporary</option>
                    </select>
                    
                </div> */}
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Cure Status</label>
                    <select name="" value={articleStatus}  onChange={(e) => setArticleStatus(e.target.value)} className="form-control" id="">
                    <option>Open this select menu</option>
                        <option value="1">Work in Progress</option>
                        <option value="2">Review</option>
                        {
                            editId.id?
                            <option value="3">Publish</option>
                            : null
                        }
                    </select>
                </div>
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Language</label>
                    <select value={language} name="" onChange={(e) => setLanguage(e.target.value)} className="form-control" id="">
                    <option>Open this select menu</option>
                        {lanList.map((lan) => {
                            return (
                                <option value={lan[0]}>{lan[1]}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Disease and Conditions</label>
                    <select value={disease} name="" onChange={(e) => setDisease(e.target.value)} className="form-control" id="">
                    <option>Open this select menu</option>
                        {diseaseList.map((lan) => {
                            return (
                                <option value={lan[0]}>{lan[3]}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="col-lg-6 form-group">
                    <label htmlFor="">Author</label>
                        <Select multiple
                        value={author}
                        onChange={(e) => onAuthorChange(e)}
                        input={<Input id="select-multiple-chip" />}
                        // MenuProps={MenuProps}
                        placeholder="Select Author"
                        className="form-control">
                        {authList.map((lan) => {
                            return (
                                <MenuItem key={lan[0]}value={lan[0]} >
                                    {lan[1]+' '+lan[3]}
                                </MenuItem>
                            )
                        })}
                        </Select>
                </div>

                <div className="col-lg-6 form-group">
                    <label htmlFor="">Window Title</label>
                    <input type="text" value={win}  onChange={(e) => setWin(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                {   
                    type?
                    type.indexOf('2') === -1 
                    ? null 
                    : <div className="form-group col-lg-6">
                        <label htmlFor="">Country</label>
                        <select name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required="" className="form-control">
                        <option>Select Country</option>
                            {countriesList.map((c) => {
                                
                                return (
                                    <option value={c[0]}>{c[1]}</option>
                                )
                            })}
                        </select>
                    </div> 
                    : null
                }
                <div className="col-md-6 float-left">
                    <label>Keywords</label>
                    <input className="form-control"
                    value={keywords}
                    // defaultValue={about}
                    onChange={(e) => setKeywords(e.target.value)}
                    name="keywords"
                    as="textarea"
                    placeholder="Enter Keywords here"
                    // style={{ height: '100px' }}
                    />
                </div>
                </>
                : null
                }

                <div className="col-md-6 float-left">
                    <label>Remarks</label>
                    <input className="form-control"
                    value={comment}
                    // defaultValue={about}
                    onChange={(e) => setComment(e.target.value)}
                    name="comments"
                    as="textarea"
                    placeholder="Leave a comment here"
                    />
                </div>

                </div>
                            </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <h5 className="mb-0">
                                Write Cure Here
                            </h5>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body">
                                {
                                    articleContent.time &&
                                    <EditorJs
                                    onChange={handleSave}
                                    data = {articleContent}
                                    // enableReInitialize = {true}
                                    instanceRef={instance => (instanceRef.current = instance)}
                                    tools = {EDITOR_JS_TOOLS} 
                                    />
                                }
                                {
                                    articleContent === ''?
                                    <EditorJs
                                    onChange={handleSave}
                                    instanceRef={instance => (instanceRef.current = instance)}
                                    tools = {EDITOR_JS_TOOLS} 
                                    />
                                    : null
                                }
                                    
                            </div>
                            </div>
                        </div>
                    </div>
                    {/* {succMsg ? <h4 className="mt-3 alert alert-success">{succMsg}</h4> : null} */}
                    <FormControlLabel
                                        control={<Checkbox name="Terms" value="on" required/>}
                                        label="Accept Terms & Conditions"checked
                                        required
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="Policy" value="on" required/>}
                                        label="Privacy Policy"checked
                                        required
                                        onClick={() => setLgShow(true)}
                                      
                                        
                                    />



    
      {/* <Button onClick={() => setLgShow(true)}>Large modal</Button> */}

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" className='container'>
         <b> Privacy Policy</b>
          </Modal.Title>
        </Modal.Header><hr/>
        <Modal.Body>  
        <h2 class="cols__main-title cols__main-title--top">Introduction</h2>

<p class="p1">Welcome to Etherium Technologies Private Limited.
Etherium Technologies hereinafter called as ETPL (“us”, “we”, or “our”) operates <a href="https://www.etheriumtech.com">www.etheriumtech.com</a> (hereinafter referred to as “Service”).
Our Privacy Policy governs your visit to <a href="https://www.etheriumtech.com">www.etheriumtech.com</a>, and explains how we collect, safeguard and disclose information that results from your use of our Service.
We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
Our Terms and Conditions (“Terms”) govern all use of our Service and together with the Privacy Policy constitutes your agreement with us (“agreement”).</p>

<h2 class="cols__main-title cols__main-title--top" >Definitions</h2>

<p class="p1">SERVICE means the <a href="https://www.etheriumtech.com">www.etheriumtech.com</a>
PERSONAL DATA means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).
USAGE DATA is data collected automatically either generated by the use of Service or from Service infrastructure itself (for example, the duration of a page visit).
COOKIES are small files stored on your device (computer or mobile device).
DATA CONTROLLER means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.
DATA PROCESSORS (OR SERVICE PROVIDERS) means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.
DATA SUBJECT is any living individual who is the subject of Personal Data.
THE USER is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.</p>

<h2 class="cols__main-title cols__main-title--top">Information Collection and Use</h2>
<p class="p1" >We collect several different types of information for various purposes to provide and improve our Service to you.</p>

<h2 class="cols__main-title cols__main-title--top">Types of Data Collected</h2>
<p class='p1'>Personal Data<br/>
While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (“Personal Data”). Personally identifiable information may include, but is not limited to:<br/>
•	Email address<br/>
•	First name and last name<br/>
•	Cookies and Usage Data<br/>
We may use your Personal Data to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at <a href="mailto:support@etheriumtech.com">support@etheriumtech.com</a>.<br/>
Usage Data<br/>
We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through a mobile device (“Usage Data”).<br/>
This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.<br/>
When you access Service with a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.<br/>
Tracking Cookies Data<br/>
We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information.<br/>
Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service.<br/>
You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.<br/>
Examples of Cookies we use:<br/>
•	Session Cookies: We use Session Cookies to operate our Service.<br/>
•	Preference Cookies: We use Preference Cookies to remember your preferences and various settings.<br/>
•	Security Cookies: We use Security Cookies for security purposes.<br/>
•	Advertising Cookies: Advertising Cookies are used to serve you with advertisements that may be relevant to you and your interests.<br/>
•	Use of Data<br/>
ETPL uses the collected data for various purposes:<br/>
•	to provide and maintain our Service;<br/>
•	to notify you about changes to our Service;<br/>
•	to allow you to participate in interactive features of our Service when you choose to do so;<br/>
•	to provide customer support;<br/>
•	to gather analysis or valuable information so that we can improve our Service;<br/>
•	to monitor the usage of our Service;<br/>
•	to detect, prevent and address technical issues;<br/>
•	to fulfill any other purpose for which you provide it;<br/>
•	to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;<br/>
•	to provide you with notices about your account and/or subscription, including expiration and renewal notices, email-instructions, etc.;<br/>
•	to provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information;<br/>
•	in any other way we may describe when you provide the information;<br/>
•	for any other purpose with your consent.<br/>
•	Retention of Data<br/>
We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.<br/>
We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.</p>



<h2 class="cols__main-title cols__main-title--top">Transfer of Data</h2>
<p class='p1'>Your information, including Personal Data, may be transferred to – and maintained on – computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.<br/>
ETPL will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organisation or a country unless there are adequate controls in place including the security of your data and other personal information.</p><br/>
<h2 class="cols__main-title cols__main-title--top">Disclosure of Data</h2>
<p class='p1'>We may disclose personal information that we collect, or you provide:</p><br/>
<h2 class="cols__main-title cols__main-title--top">Disclosure for Law Enforcement.</h2>
<p class="p1">Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.</p>
<h2 class="cols__main-title cols__main-title--top">Business Transaction.</h2>
<p class="p1">If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.<br/>
Other cases. We may disclose your information also:<br/>
•	to our subsidiaries and affiliates;<br/>
•	for the purpose of including your company’s logo on our website;<br/>
•	Security of Data<br/>
The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p><br/>
<h2 class="cols__main-title cols__main-title--top">Service Providers</h2>
<p class="p1" >We may employ third party companies and individuals to facilitate our Service (“Service Providers”), provide Service on our behalf, perform Service-related services or assist us in analysing how our Service is used.<br/>
These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p><br/>
<h2 class="cols__main-title cols__main-title--top">Analytics</h2>
<p class="p1">We may use third-party Service Providers to monitor and analyze the use of our Service.<br/>
Google Analytics<br/>
Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualise and personalise the ads of its own advertising network.<br/>
For more information on the privacy practices of Google, please visit the Google Privacy Terms web page: <a href="https://policies.google.com/privacy?hl=en
">https://policies.google.com/privacy?hl=en
</a><br/>
We also encourage you to review the Google's policy for safeguarding your data: <a href="https://support.google.com/analytics/answer/6004245">https://support.google.com/analytics/answer/6004245</a>.</p><br/>
<h2 class="cols__main-title cols__main-title--top">Changes to This Privacy Policy</h2>
<p class="p1">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.<br/>
We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update “effective date” at the top of this Privacy Policy.<br/>
You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p><br/>
<h2 class="cols__main-title cols__main-title--top">Contact Us</h2>
<p class='p1'>If you have any questions about this Privacy Policy, please contact us:<br/>
By email: <a href="mailto:support@etheriumtech.com">support@etheriumtech.com</a>.<br/>
By visiting this page on our website: <a href="https://www.etheriumtech.com">www.etheriumtech.com</a>.</p>
        </Modal.Body>
      </Modal>
                    <div className="form-group">
                        <button type="submit" id="article-submit" className="btn mt-3 btn-dark">Submit</button>
                        {/* <button onClick={(e) => finishLater(e)} id="article-submit" className="btn ml-3 mt-3 btn-secondary">Finish Later</button> */}
                    </div>
                    </form>
                    <div id="article-preview">
                        {
                            articleContent.time?
                            articleContent.blocks.map((i) => (
                                <CenterWell
                                    content = {i.data.content}
                                    type = {i.type}
                                    text = {i.data.text}
                                    title = {i.data.title}
                                    message = {i.data.message}
                                    source = {i.data.source}
                                    embed = {i.data.embed}
                                    caption = {i.data.caption}
                                    alignment = {i.data.alignment}
                                    imageUrl = {i.data.file? i.data.file.url: null}
                                    url = {i.data.url}
                                />
                              ))
                            : null
                        }
                    </div>
                    </div>
                </div>
            </div>
            </div>
            {   
                props.search === '?article'?
                    null
                : <Footer/>
            } 
        </>
    )         
}

export default EditModal;