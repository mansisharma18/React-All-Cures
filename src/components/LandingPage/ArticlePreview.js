import React, { useState, useEffect } from 'react';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom'
import CenterWell from '../Disease/CenterWell'

const ArticlePreview = (props) => {
    const [items, setItems] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [articleFilter, setArticleFilter]= useState('recent')
    
    function allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/article/allkv`)
          .then((res) => res.json())
          .then((json) => {
              if(articleFilter === 'recent'){
                var temp = []
                json.forEach(i => {
                    if(i.pubstatus_id === 3){
                        temp.push(i)
                    }
                });
                setItems(temp)
              } else if(articleFilter === 'earliest'){
                //   setItems(json)
                  var temp = []
                  json.forEach(i => {
                      if(i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  setItems(temp.reverse())
                //   console.log(/json.reverse())
              }
            setLoaded(true)
          })
          .catch(err => 
            console.log(err)
        )
    }

    function articleFilterClick(e, filter) {
        setArticleFilter(filter)
        e.target.parentElement.classList.add('active')
        if(e.target.parentElement.previousSibling){
            e.target.parentElement.previousSibling.classList.remove('active')
            if(e.target.parentElement.previousSibling.previousSibling){
                e.target.parentElement.previousSibling.previousSibling.classList.remove('active')
            }
        }
        
        if(e.target.parentElement.nextSibling){
            e.target.parentElement.nextSibling.classList.remove('active')
            if(e.target.parentElement.nextSibling.nextSibling){
                e.target.parentElement.nextSibling.nextSibling.classList.remove('active')
            }
        }
    }

    useEffect(() => {
        allPosts()
    }, [articleFilter])

    if(!isLoaded){
        return (
            <div className="loader my-4">
                <i className="fa fa-spinner fa-spin fa-6x" />
            </div>
        );
    }
    else {
        return(
        <>
        <div className="container">
            <div className="row">
            <div class="tab-nav">
               <div class="comman-heading">
                  <div class="h4 mt-4 text-capitalize">
                     {articleFilter} Cures
                  </div>
               </div>
               <ul>
                  <li role="presentation" class="active ">
                     <button className="btn mr-2" 
                        onClick={(e) => articleFilterClick(e, 'recent')}
                     >Recent</button>
                  </li>
                  <li role="presentation">
                     <button className="btn mr-2" onClick={(e) => articleFilterClick(e, 'earliest')}>Earliest</button>
                  </li>
                  {/* <li role="presentation">
                     <button className="btn" onClick={(e) => articleFilterClick(e, 'recent')}>Most Rated</button>
                  </li> */}
               </ul>
            </div>
               {/* <div className="comman-heading">
                  <div className="h4 float-left mr-4">Recent Articles</div> */}
                {/* <span><Link className="btn btn-article-search color-white" to="/cures">All Articles</Link></span> */}

               {/* </div> */}
            </div>
            <div className="row">
            <div className="main-hero" id="main-hero">
                {items.map((i, index) => index<9 && (
                    <div className="col-4">
                    <div className="card my-2 ">
                        <div className="card-body">
                            <h5 className="card-title">{i.title}</h5>
                            <div className="card-info">
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {i.window_title}
                                </h6>
                                <p className="card-text" id='right-menu-card-article-content-preview'>
                                {
                                    i.content && JSON.parse(i.content) ?
                                    JSON.parse(i.content).blocks.map((j) => (
                                        <CenterWell
                                            content = {j.data.content}
                                            type = {j.type}
                                            text = {j.data.text}
                                            title = {j.data.title}
                                            message = {j.data.message}
                                            source = {j.data.source}
                                            embed = {j.data.embed}
                                            caption = {j.data.caption}
                                            alignment = {j.data.alignment}
                                            imageUrl = {j.data.file? j.data.file.url: null}
                                            url = {j.data.url}
                                        />
                                    ))
                                    : null
                                }
                                    {/* ${p.body.substr(0, 200)}<a href="#">...read more</a> */}
                                </p>
                                <span><Link to={`/cure/${i.article_id}`}>...read more</Link></span>
                            </div>
                            {/* <a href="#" className="card-link" id="comment-link">Comment</a> */}
                            {/* <a href="#" className="card-link">Like</a> */}
                        </div>
                    </div>
                </div>
                )) }
            </div>
            </div>
            </div>
        </>
    )
}
}

export default ArticlePreview