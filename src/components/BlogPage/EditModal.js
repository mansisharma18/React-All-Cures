import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './tools'
const EditModal = () => {

    const editId = useParams()
    const [title,setTitle] = useState('')
    const [articleDisplay,setArticleDisplay] = useState('')
    const [content,setContent] = useState('')
    const [disclaimer,setDisclaimer] = useState('')
    const [copyright,setCopyright] = useState('')
    const [language,setLanguage] = useState('')
    const [author,setAuthor] = useState('')
    const [win,setWin] = useState('')
    const [articleStatus,setArticleStatus] = useState('')
    const [postsList,setPostsList] = useState([])

    console.log(editId.id)
    const getPosts = () =>{

        axios.get(`/article/${editId.id}`)
        .then(res => {
            console.log(res);
            setTitle(res.data.title)
            setContent(res.data.content)
            setDisclaimer(res.data.disclaimer_id)
            setCopyright(res.data.copyright_id)
            setLanguage(res.data.language)
            setWin(res.data.window_title)
            setArticleStatus(res.data.articleStatus)
            setArticleDisplay(res.data.friendly_name)
            setAuthor(res.data.authored_by)
        })
        .catch(err => console.log(err))
    }


    
    const singlePostEdit = (e) => {
        e.preventDefault()
        alert(editId)
        const data = {
            "title": title,
            "friendly_name": JSON.stringify(articleDisplay),
            "subheading": "1",
            "content_type": content,
            "keywords": "1",
            "window_title": win,
            "content_location": "1",
            "authored_by": author,
            "published_by": 1,
            "edited_by": 1,
            "copyright_id": copyright,
            "disclaimer_id": disclaimer,
            "pubstatus_id": articleStatus,
            "language_id": language,
            "content": "12121"

            
                // "title": "2",
                // "friendly_name": "1",
                // "subheading": "1",
                // "content_type": 1,
                // "keywords": "1",
                // "window_title": "1",
                // "content_location": "1",
                // "authored_by": 1,
                // "published_by": 1,
                // "edited_by": 1,
                // "copyright_id": 11,
                // "disclaimer_id": 12,
                // "pubstatus_id": 1,
                // "language_id": 1,
                // "content": "12121"
              

        }

        axios.post(`/article/${editId}`, data)
        .then(res => {
            console.log(res);
            
        })
        .then(err => {
            console.log(err);
        })


    }


    useEffect(() => {
        getPosts()
    }, [])
    
    return (
        <>
        <Header/>
            <form action="" onSubmit={(e) => singlePostEdit(e)} className="container">
                {/* {postsList.map((post,index) => {
                    return (
                        <div>
                            <p>{post.article_id}</p>
                        </div>
                    )
                })} */}
                <div className="form-group">
                    <label htmlFor="">Article Title</label>
                    <input type="text" value={title}   onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Article Display Name</label>
                    <input type="text" value={articleDisplay}  onChange={(e) => setArticleDisplay(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Content Type</label>
                    <input type="text" value="" onChange={(e) => setContent(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Disclaimer ID</label>
                    <input type="text" value={disclaimer}  onChange={(e) => setDisclaimer(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Copyright ID</label>
                    <input type="text" value={copyright}  onChange={(e) => setCopyright(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Article Status</label>
                    <select name="" value={language}  onChange={(e) => setArticleStatus(e.target.value)} className="form-control" id="">
                        <option value="1">Work in Progress</option>
                        <option value="2">Review</option>
                        <option value="3">Publish</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="">Language</label>
                    <select name=""   onChange={(e) => setLanguage(e.target.value)} className="form-control" id="">
                        <option value="1">Hindi</option>
                        <option value="2">English</option>
                        <option value="3">Chinese</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="">Author By ID</label>
                    <input type="text" value={author}  onChange={(e) => setAuthor(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Win Title</label>
                    <input type="text" value={win}  onChange={(e) => setWin(e.target.value)} placeholder="Enter title" className="form-control" />
                </div>
                <EditorJs tools={EDITOR_JS_TOOLS} data={content}
                                        
                                        // onChange={this.handleSave}
                                        // onClick={this.focusText}
                                        // instanceRef={instance => this.instanceRef = instance}
                                    />
                <div className="form-group">
                    <button type="submit" className="btn-btn-success">Submit</button>
                </div>
            </form>
            <Footer/>
        </>
    )
}

export default EditModal;