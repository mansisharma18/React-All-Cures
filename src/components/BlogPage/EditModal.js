import React, {useEffect,useState, useRef} from 'react';
import Cookies from 'js-cookie';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { Select, MenuItem } from '@material-ui/core'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../BlogPage/tools'
import Input from '@material-ui/core/Input';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import { Redirect } from 'react-router';
import history from '../history';

const EditModal = (props) => {

    const acPerm = Cookies.get("acPerm")
    const [userAccess, setAccess] = useState(acPerm? acPerm.split('|')[1]: null);
    const [userId, setId] = useState(acPerm? acPerm.split('|')[0]: null);
    // if(acPerm){
    //     setId(acPerm.split('|')[0])
    //     setAccess(acPerm.split('|')[1])
    // }
    const editId = useParams()
    const [title, setTitle] = useState('')
    const [articleDisplay, setArticleDisplay] = useState('')
    const [content, setContent] = useState()
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
    const [showCountry, setShowCountry] = useState(false)
    const [lanList,setLanList] = useState([])
    // const [contentType, setContentType] = useState([])
    const [authList,setAuthList] = useState([])
    const [countriesList,setCountriesList] = useState([])
    const [succMsg,setSuccMsg] = useState('')
    const [disclaimerId,setDisclaimerId] = useState([]) 
    const [getContentList,setGetContentList] = useState([]) 
    const [comment, setComment] = useState('')

    const getPosts = () =>{

        axios.get(`/article/${editId.id}`)
        .then(res => {
            console.log("get post",res);
            setEditedBy(res.data.edited_by)
            setAuthor(author.concat((res.data.authored_by).split(',')))
            setTitle(res.data.title);
            setDisclaimer(res.data.disclaimer_id)
            setCopyright(res.data.copyright_id)
            setLanguage(res.data.language_id)
            setWin(res.data.window_title)
            // if(author != undefined & editedBy != 0){
                setArticleStatus(res.data.pubstatus_id)
                    // window.alert('khbdksjbckjsb')
                //     checkAccess(articleStatus, author, editedBy);
                // });
            // }
            // setArticleStatus(res.data.pubstatus_id, () => checkAccess(articleStatus))
            
            setArticleDisplay(res.data.friendly_name)
            setType(res.data.type)
            setContentType(res.data.content_type)
            setCountry(res.data.country_id)
            setDisease(res.data.disease_condition_id)
            setComment(res.data.comments) 
            setArticleContent(JSON.parse(res.data.content))
        })
        .catch(err => console.log("errrrrrrorrrrrrrrrrrrrrrrrr",err))
    }

    // new EditorJs({        
    //     placeholder: 'Let`s write an awesome story!'
    //   });
    
    const singlePostEdit = (e) => {
        e.preventDefault()
        console.log(editId);
        if(articleStatus == 3){
            axios.post(`/article/${editId.id}`, {
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
                "copyright_id": parseInt(copyright),
                "disclaimer_id": parseInt(disclaimer),
                "pubstatus_id": parseInt(articleStatus),
                "language_id": parseInt(language),
                "articleContent": JSON.stringify(articleContent),
                "comments": comment
            })
            .then(res => {
                setSuccMsg('Updated Successfully')
                // history.incognito(`/blog/${editId.id}`)
                // window.location.href(`blog/${editId.id}`)    
            })
            .catch(err => {
                console.log(err);
                setSuccMsg('error in updating')
            })
        } else {
            axios.post(`/article/${editId.id}`, {
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
                "copyright_id": parseInt(copyright),
                "disclaimer_id": parseInt(disclaimer),
                "pubstatus_id": parseInt(articleStatus),
                "language_id": parseInt(language),
                "articleContent": JSON.stringify(articleContent),
                "comments": comment
            })
            .then(res => {
                setSuccMsg('Updated Successfully')
                // history.incognito(`/blog/${editId.id}`)
                // window.location.href(`blog/${editId.id}`)    
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
        console.log('Article Status', stat,'author', author, 'user access', userAccess, 'edited BY:', editedBy)
        if(userAccess == 9 || [author].includes(userId) || editedBy == userId || userAccess == 4){
            return null;
        }
        else if(stat == 2 && (userAccess == 7)){
            return null;
        }
        else{
            document.getElementById('article-submit').disabled = true
            window.alert('Restricted Access!!')
            // return(
            //     // history.push('/home')
            //     <Redirect to="/home"/>
            // )
        }
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
            console.log('author: ', res.data)
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
            console.log('disclaimer: ', res.data)
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
    
    const onAuthorChange = (e) => {
        if(author.includes(e.target.value)){
            return null
        } else {
            setAuthor(author.concat(e.target.value), console.log(author))
        }
    }

    useEffect(() => {
        if(editId.id){
            console.log("Useeffect: ", editId.id)
            getPosts()
        }
        getLanguages()
        getAuthor()
        getCountries()
        getDisclaimer()
        getDisease()  
        // checkAccess()      
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
        console.log('submit article formmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
        fetch("/content?cmd=createArticle", {
            method: "POST",
            body: `title=${title}&language=${language}&friendlyName=${articleDisplay}&contentType=${contentType}&type=${type}&disclaimerId=${disclaimer}&authById=${author}&copyId=${copyright}&articleStatus=${articleStatus}&winTitle=${win}&countryId=${country}&diseaseConditionId=${disease}&articleContent=${JSON.stringify(articleContent)}&comments=${comment}`,
            headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            res.json().then(function(data){
                if(data == 1){
                    setSuccMsg('Article Created Successfully!')
                } else{
                    setSuccMsg('Some error occured!')
                }
            })
            // history.incognito(`/blog/${editId.id}`)
            // window.location.href(`blog/${editId.id}`)
        })
        .catch(err => {
            console.log(err);
            setSuccMsg('Error in updating!')
        })
    }
    
    async function handleSave() {
        // console.log('ksdufhaouhaohoaih')
        const savedData = await instanceRef.current.save();        
        // console.log("savedData", savedData);
        setArticleContent(savedData)
        let articleHTML = '';
  
        // RENDER DIFFERENT TYPES OF DATA
      
        savedData.blocks.map(obj => {
        switch (obj.type) {
            case 'paragraph':
            articleHTML += `<div class="ce-block">
            <div class="ce-block__content">
                <div class="ce-paragraph cdx-block">
                <p>${obj.data.text}</p>
                </div>
            </div>
            </div>\n`;
            break;
            case 'table':
                obj.data.content.map((i) => (
                    articleHTML += `
                    <div class="container">
                    <table class="tc-table text-center">
                                    <tbody>
                                        <tr style="border: 1px solid #ebebeb">
                                            <td class="tc-table__cell">
                                                <div class="tc-table__area">
                                                    <div class="text-center" contenteditable="true">${i[0]}<br></div>
                                                </div>
                                            </td>
                                            <td class="tc-table__cell">
                                                <div class="tc-table__area">
                                                    <div class="text-center" contenteditable="true">${i[1]}</div>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                    `
                ))
                break;
            case 'simpleImage':
            articleHTML += `<div class="ce-block">
            <div class="ce-block__content">
                <div class="cdx-block cdx-simple-image">
                <div class="cdx-simple-image__picture">
                <img src="${obj.data.url}" alt="${obj.data.caption}" />
                </div>
                <div class="text-center">
                <i>${obj.data.caption}</i>
                </div>
            </div>
            </div>
        </div>\n`;
            break;
            case 'header':
            articleHTML += `<div class="ce-block">
            <div class="ce-block__content">
                <div class="ce-paragraph cdx-block">
                <h3>${obj.data.text}</h3>
                </div>
            </div>
            </div>\n`;
            break;
            case 'raw':
            articleHTML += `<div class="ce-block">
            <div class="ce-block__content">
                    <div class="ce-code">
                <code>${obj.data.html}</code>
                </div>
            </div>
            </div>\n`;
            break;
            case 'code':
                articleHTML += `<div class="ce-block">
                <div class="ce-block__content">
                <div class="ce-code">
                <code>${obj.data.code}</code>
                </div>
            </div>
        </div>\n`;
        break;
        case 'list':
        if (obj.data.style === 'unordered') {
            const list = obj.data.items.map(item => {
            return `<li class="cdx-list__item">${item}</li>`;
            });
            articleHTML += `<div class="ce-block">
            <div class="ce-block__content">
                <div class="ce-paragraph cdx-block">
                <ul class="cdx-list--unordered">${list.join('')}</ul>
                </div>
                </div>
            </div>\n`;
        } else {
            const list = obj.data.items.map(item => {
            return `<li class="cdx-list__item">${item}</li>`;
            });
            articleHTML += `<div class="ce-block">
            <div class="ce-block__content">
                <div class="ce-paragraph cdx-block">
                <ol class="cdx-list--ordered">${list}</ol>
                </div>
                </div>
            </div>\n`;
        }
        break;
        case 'delimiter':
        articleHTML += `<h1 class="text-center my-2">***</h1>\n`;
        break;
        case 'warning':
            articleHTML+= `<div class="ce-block">
            <div class="ce-block__content py-2 text-center" style="background-color: blanchedalmond">
                <strong> ${obj.data.title}: </strong><span>${obj.data.message}</span>
            </div>
            </div>\n`;
            break;
        case 'embed':
            articleHTML += `<div class="ce-block ce-block--focused"><div class="ce-block__content"><div class="cdx-block embed-tool"><preloader class="embed-tool__preloader"><div class="embed-tool__url">${obj.data.source}</div></preloader>
            <iframe style="width:100%;" allowfullscreen="" src=${obj.data.embed} class="embed-tool__content" height="320" frameborder="0"></iframe>
            <div class="text-center">
                <i>${obj.data.caption}</i>
                </div>\n`;
                break;
        case 'quote':
            articleHTML+= `<div style="text-align: ${obj.data.alignment}" class="ce-block ce-block--focused"><div class="ce-block__content"><h3 style="font-style: italic" class="cdx-block">"${obj.data.text}"</h3></div>
            <div class="text-center">
                <i>- ${obj.data.caption}</i>    
            </div>
        </div>\n`;
            break;
        default:
        return '';
        }
        });
        document.getElementById('article-preview').innerHTML=articleHTML;
    }

    return (
        <>
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
                    <select name="contentType" placeholder="Content Type" 
                    value={contentType} 
                    onChange={(e)=> {
                        setContentType(e.target.value)
                     }}
                    required class="form-control">
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
                    required class="form-control">
                        <option value="1">Disease</option>
                        <option value="2">Treatment</option>
                        <option value="3">Specialities</option>
                    </select>
                </div>
                
                <div className="col-lg-6 form-group">
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
                    
                </div>
                <div className="col-lg-6 form-group">
                    <label htmlFor="">Article Status</label>
                    <select name="" value={articleStatus}  onChange={(e) => setArticleStatus(e.target.value)} className="form-control" id="">
                    <option>Open this select menu</option>
                        <option value="1">Work in Progress</option>
                        <option value="2">Review</option>
                        <option value="3">Publish</option>
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

                                    <div className="col-md-6 float-left">
                                        <label>Remarks</label>
                                    <input className="form-control"
                                        value={comment}
                                        // defaultValue={about}
                                        onChange={(e) => setComment(e.target.value)}
                                        name="comments"
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        // style={{ height: '100px' }}
                                    />
                              </div>
                {   
                    type?
                    type.indexOf('2') === -1 
                    ? null 
                    : <div className="form-group col-lg-6">
                        <label htmlFor="">Country</label>
                        <select name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required="" class="form-control">
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
                                {
                                    articleContent != ''?
                                        <EditorJs
                                        onChange={handleSave}
                                        data = {articleContent}
                                        enableReInitialize = {true}
                                        instanceRef={instance => (instanceRef.current = instance)}
                                        tools = {EDITOR_JS_TOOLS} 
                                        />
                                    :   <EditorJs
                                        onChange={handleSave}
                                        instanceRef={instance => (instanceRef.current = instance)}
                                        tools = {EDITOR_JS_TOOLS} 
                                        />
                                }
                                    
                            </div>
                            </div>
                        </div>
                    </div>
                    {succMsg ? <h4 className="mt-3 alert alert-success">{succMsg}</h4> : null}
                    <div className="form-group">
                        <button type="submit" id="article-submit" className="btn mt-3 btn-dark">Submit</button>
                    </div>
                    </form>
                    <div id="article-preview"></div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )         
}

export default EditModal;