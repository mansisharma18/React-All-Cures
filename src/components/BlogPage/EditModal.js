import React, {useEffect,useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './tools'
const EditModal = () => {

    const editId = useParams()
    const [title, setTitle] = useState('')
    const [articleDisplay, setArticleDisplay] = useState('')
    const [content, setContent] = useState()
    const [contentType,setContentType] = useState([])
    const [disclaimer, setDisclaimer] = useState('')
    const [copyright, setCopyright] = useState('')
    const [language, setLanguage] = useState('')
    const [author, setAuthor] = useState('')
    const [country, setCountry] = useState('')
    const [win, setWin] = useState('')
    const [articleStatus, setArticleStatus] = useState('')
    const [disease, setDisease] = useState('')
    const [articleContent, setArticleContent] = useState('')
    const [diseaseList, setDiseaseList] = useState([])
    const [showCountry, setShowCountry] = useState(false)
    const [lanList,setLanList] = useState([])
    // const [contentType, setContentType] = useState([])
    const [authList,setAuthList] = useState([])
    const [countriesList,setCountriesList] = useState([])
    const [succMsg,setSuccMsg] = useState('')
    const [disclaimerId,setDisclaimerId] = useState([]) 
    const [getContentList,setGetContentList] = useState([]) 

    const getPosts = () =>{

        axios.get(`/article/${editId.id}`)
        .then(res => {
            console.log("get post",res);
            setTitle(res.data.title);
            setContent(JSON.parse(res.data.content));
            setDisclaimer(res.data.disclaimer_id)
            setCopyright(res.data.copyright_id)
            setLanguage(res.data.language_id)
            setWin(res.data.window_title)
            setArticleStatus(res.data.pubstatus_id)
            setArticleDisplay(res.data.friendly_name)
            setAuthor(res.data.authored_by)
            setContentType(res.data.content_type)
            setCountry(res.data.country_id)
            setDisease(res.data.disease_condition_id)
        })
        .catch(err => console.log("errrrrrrorrrrrrrrrrrrrrrrrr",err))
    }

    // new EditorJs({        
    //     placeholder: 'Let`s write an awesome story!'
    //   });
    
    const singlePostEdit = (e) => {
        e.preventDefault()
        console.log(editId);
        axios.post(`/article/${editId.id}`, {
            "title":title,
            "friendly_name": articleDisplay,
            "subheading": "1",
            "content_type": contentType,
            "keywords": "1",
            "window_title": win,
            // "content_location": "1",
            "authored_by": author,
            "published_by": 1,
            "edited_by": 1,
            "copyright_id": copyright,
            "disclaimer_id": disclaimer,
            "pubstatus_id": articleStatus,
            "language_id": language,
            "articleContent": articleContent,
        })
        .then(res => {
            setSuccMsg('Updated Successfully')
        })
        .catch(err => {
            console.log(err);
            setSuccMsg('error in updating')
        })


    }

    const getLanguages = () => {
        axios.get('/article/all/table/languages')
        .then(res => {
            setLanList(res.data)
        })
        .catch(err => console.log(err))
    }

    const getAuthor = () => {
        axios.get('/article/all/table/author')
        .then(res => {
            setAuthList(res.data)
        })
        .catch(err => console.log(err))
    }

    const getCountries = () => {
        axios.get('/article/all/table/countries')
        .then(res => {
            setCountriesList(res.data)
        })
        .catch(err => console.log(err))
    }

    const getDisclaimer = () => {
        axios.get('/article/all/table/disclaimer')
        .then(res => {
            setDisclaimerId(res.data)
        })
        .catch(err => console.log(err))
    }
    const getDisease = () => {
        axios.get('/article/all/table/disease_condition')
        .then(res => {
            console.log(res.data);
            setDiseaseList(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log("Useeffect")
        getPosts()
        getLanguages()
        getAuthor()
        getCountries()
        getDisclaimer()
        getDisease()
    }, [win])

    const instanceRef = useRef(null)

    
    const handleSelect = function(countries) {
        const flavors = [];
        for (let i=0; i<countries.length; i++) {
            flavors.push(countries[i].value);
        }
        setContentType(flavors);
        console.log(contentType)
    }
   console.log("COntent : ", content)
   
    return (
        <>
            <div className="transparent_bg">
            <div className="container">
                <div className="card">
                <h2 className="mainTitle text-center h3 py-3 card-header">Article</h2>
                    <div className="card-body">
                    <form action="" onSubmit={(e) => {
                        singlePostEdit(e)
                        // handleSave()
                    }}>
                    <div id="accordion">
                        <div class="card">
                            <div class="card-header" id="headingOne"  data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <h5 class="mb-0">
                                Article Details
                            </h5>
                            </div>

                            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                <div className="row">
                    <div className="col-lg-6 form-group">
                    <label htmlFor="">Article Title</label>
                    <input type="text" value={title}   onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Article Display Name</label>
                    <input type="text" value={articleDisplay}  onChange={(e) => setArticleDisplay(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Content Type</label>
                    <select multiple name="contentType" placeholder="Content Type" 
                    value={contentType} 
                    onChange={(e)=> {
                        handleSelect(e.target.selectedOptions)
                        if(contentType.indexOf('2') === -1){
                            setShowCountry(false)
                        } else {
                            setShowCountry(true)
                        }
                        
                    }}
                    required class="form-control">

                   
                     
                        <option value="1">Disease</option>
                        <option value="2">Treatment</option>
                        <option value="3">Specialities</option>
                    </select>
                </div>
                
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Disclaimer ID</label>
                    <select name="" value={disclaimer}  onChange={(e) => setDisclaimer(e.target.value)} className="form-control" id="">
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
                        <option value="11">Temporary</option>
                    </select>
                    
                </div>
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Article Status</label>
                    <select name="" value={articleStatus}  onChange={(e) => setArticleStatus(e.target.value)} className="form-control" id="">
                        <option value="1">Work in Progress</option>
                        <option value="2">Review</option>
                        <option value="3">Publish</option>
                    </select>
                </div>
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Language</label>
                    <select value={language} name="" onChange={(e) => setLanguage(e.target.value)} className="form-control" id="">
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
                        {diseaseList.map((lan) => {
                            return (
                                <option value={lan[0]}>{lan[3]}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Author By ID</label>
                     <select name="" value={author} onChange={(e) =>  setAuthor(e.target.value)} className="form-control" id="">

                    {authList.map((lan) => {
                            return (
                                <option value={lan[0]}>{lan[1]}</option>
                            )
                        })}
                        </select>
                    
    
                </div>
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Win Title</label>
                    <input type="text" value={win}  onChange={(e) => setWin(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                {contentType.indexOf('2') === -1 
                    ? null 
                    : <div className="form-group col-lg-6">
                 <label htmlFor="">Country</label>
                 <select name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required="" class="form-control">
                     
                     {countriesList.map((lan) => {
                         return (
                             <option value={lan[0]}>{lan[1]}</option>
                         )
                     })}
                     
                 </select>
             </div> }
                </div>
                            </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <h5 class="mb-0">
                                
                                Write Article Here
                            </h5>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div class="card-body">
                                    <EditorJs
                                        data = {content}
                                        enableReInitialize = {true}
                                        instanceRef={(instance) => (instanceRef.current = instance)}
                                        tools = {EDITOR_JS_TOOLS} 
                                       
                                    />
                            </div>
                            </div>
                        </div>
                    </div>
                    {succMsg ? <h4 className="mt-3">{succMsg}</h4> : null}
                    <div className="form-group">
                        <button type="submit" className="btn mt-3 btn-dark">Submit</button>
                    </div>
                    </form>
                    </div>
                </div>
            </div>
            </div>
        </>
    )         
}

export default EditModal;