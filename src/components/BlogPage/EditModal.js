import React, {useEffect,useState, useRef} from 'react';
import Cookies from 'js-cookie';
import {useParams} from 'react-router-dom';
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

const EditModal = (props) => {

    const acPerm = Cookies.get("acPerm")
    const [userAccess, setAccess] = useState(acPerm? acPerm.split('|')[1]: null);
    const [userId, setId] = useState(acPerm? acPerm.split('|')[0]: null);
    const editId = useParams()
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
    const [succMsg,setSuccMsg] = useState('')
    const [disclaimerId,setDisclaimerId] = useState([]) 
    const [comment, setComment] = useState('')
    const [keywords, setKeywords] = useState('')

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
        if(articleStatus == 3){
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
                setSuccMsg('Updated Successfully')
                window.location.reload(`false`)     
            })
            .catch(err => {
                console.log(err);
                setSuccMsg('error in updating')
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
                setSuccMsg('Updated Successfully')
                // history.incognito(`/blogs`)
                // window.location.reload(`false`)    
            })
            .catch(err => {
                console.log(err);
                setSuccMsg('error in updating')
            })
        }
        
    }

    // useEffect(() => {
    //     checkAccess()
    // }, [articleStatus])

    const checkAccess = (stat) => {
        if(userAccess == 9 || [author].includes(userId) || editedBy == userId || userAccess == 4 || userAccess == 7){
            return null;
        }
        else if(stat == 2 && (userAccess == 7)){
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
    }, [userId])

    useEffect(() => {
        if(author != undefined && editedBy != 0){
            checkAccess(articleStatus, author, editedBy)
        }
    }, [articleStatus])

    const instanceRef = useRef(null)

    const handleSelect = function(e, c) {
        const ctype = [];
        for (let i=0; i<c.length; i++) {
            ctype.push(c[i].value);
        }
        setType(ctype);
    }

    const submitArticleForm = async e => {
        e.preventDefault();
        axios.post(`${backendHost}/content?cmd=createArticle`, {
            "title":title,
                "friendlyName": articleDisplay,
                "contentType": contentType,
                "type": type,
                // "keywords": "1",
                "winTitle": win,
                // "content_location": "1",
                "authById": [parseInt(userId)],
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
                "country_id": parseInt(country),
        })
        // fetch(`${backendHost}/content?cmd=createArticle`, {
        //     method: "POST",
        //     body: `title=${title}&language=${language}&friendlyName=${articleDisplay}&contentType=${contentType}&type=${type}&disclaimerId=1&authById=[${userId}]&copyId=11&articleStatus=${articleStatus? articleStatus: 2}&winTitle=${win}&countryId=${country}&diseaseConditionId=${disease}&articleContent=${encodeURIComponent(JSON.stringify(articleContent))}&comments=${comment}&keywords=${keywords}`,
        //     headers: {
        //     "Content-Type": "application/x-www-form-urlencoded"
        //     }
        .then(res => {
            if(res.data == 1){
                setSuccMsg('Article Created Successfully!')
            } else{
                setSuccMsg('Some error occured!')
            }
        })
        .catch(err => {
            setSuccMsg('Error in updating!')
        })
    }
    
    // const finishLater = (e) => {
    //     e.preventDefault();
    //     axios.post(`${backendHost}/content?cmd=createArticle`, {
    //         "title":title,
    //             "friendlyName": articleDisplay,
    //             "contentType": contentType,
    //             "type": type,
    //             // "keywords": "1",
    //             "winTitle": win,
    //             // "content_location": "1",
    //             "authById": [userId],
    //             // "published_by": 1,
    //             // "copyright_id": parseInt(copyright),
    //             // "disclaimer_id": parseInt(disclaimer),
    //             "copyId": 11,
    //             "disclaimerId": 1,
    //             "diseaseConditionId": disease,
    //             "articleStatus": articleStatus? articleStatus: ,
    //             "language": parseInt(language),
    //             "articleContent": encodeURIComponent(JSON.stringify(articleContent)),
    //             "comments": comment,
    //             "keywords": keywords,
    //             "countryId": country,
    //     })
    //     fetch(`${backendHost}/content?cmd=createArticle`, {
    //         method: "POST",
    //         body: `title=${title}&language=${language}&friendlyName=${articleDisplay}&contentType=${contentType}&type=${type}&disclaimerId=1&authById=[${userId}]&copyId=11&articleStatus=1&winTitle=${win}&countryId=${country}&diseaseConditionId=${disease}&articleContent=${encodeURIComponent(JSON.stringify(articleContent))}&comments=${comment}&keywords=${keywords}`,
    //         headers: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //         }
    //     }).then(res => {
    //         res.json().then(function(data){
    //             if(data == 1){
    //                 setSuccMsg('Article Created Successfully!')
    //             } else{
    //                 setSuccMsg('Some error occured!')
    //             }
    //         })
    //         // history.incognito(`/cure/${editId.id}`)
    //         // window.location.href(`blog/${editId.id}`)
    //     })
    //     .catch(err => {
    //         setSuccMsg('Error in updating!')
    //     })
    // }
    async function handleSave() {
        const savedData = await instanceRef.current.save();        
        setArticleContent(savedData)  
    }
    
    return (
        <>
            {   
                props.search == '?article'?
                    null
                : <Header/>
            } 
            <div className="transparent_bg">
            <div className="container">
                <div className="card">
                <h2 className="mainTitle text-center h3 py-3 card-header">Article</h2>
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
                                Article Details
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
                    userAccess == 7 || userAccess == 9?
                    <>
                    <div className="col-lg-6 form-group">
                    <label htmlFor="">Article Display Name</label>
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
                    <label htmlFor="">Article Status</label>
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
                                Write Article Here
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
                                    articleContent == ''?
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
                    {succMsg ? <h4 className="mt-3 alert alert-success">{succMsg}</h4> : null}
                    <FormControlLabel
                                        control={<Checkbox name="Terms" value="on" required/>}
                                        label="Accept Terms & Conditions"
                                        required
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="Policy" value="on" required/>}
                                        label="Privacy Policy"
                                        required
                                    />
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
                props.search == '?article'?
                    null
                : <Footer/>
            } 
        </>
    )         
}

export default EditModal;