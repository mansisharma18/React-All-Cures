import React, { useState, useEffect } from 'react';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom'
import CenterWell from '../Disease/CenterWell'
import Heart from"../../assets/img/heart.png";
import Date from '../Date'

const ArticlePreview = (props) => {
    const [items, setItems] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [articleFilter, setArticleFilter]= useState(props.dcName? props.dcName: 'recent')
    
    function diseasePosts(type){                     // For specific blogs like "/blogs/diabetes"
        // if(type){
          fetch(`${backendHost}/isearch/${type}`)
          .then((res) => res.json())
          .then((json) => {
            setLoaded(true)
            setItems(json)
          })
          .catch(err => null)
      }

    function allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/article/allkv?limit=50`)
          .then((res) => res.json())
          .then((json) => {
            var temp = []
            if(articleFilter === props.dcName){
                json.forEach(i => {
                    if(i.dc_name === props.dcName && i.pubstatus_id === 3 && i.type.includes(2)){
                        temp.push(i)
                    }
                });
                setItems(temp)
            }
              else if(articleFilter === 'recent'){
                json.forEach(i => {
                    if(i.pubstatus_id === 3){
                        temp.push(i)
                    }
                });
                setItems(temp)
              } else if(articleFilter === 'earliest'){
                  json.forEach(i => {
                      if(i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  setItems(temp)
              }
            setLoaded(true)
          })
          .catch(err => null)
    }

    function articleFilterClick(e, filter) {
        setArticleFilter(filter)
        var siblings = e.target.parentNode.parentElement.children
        if(siblings){
            for(var i=0;i<siblings.length; i++){
                if(siblings[i].classList.contains('active')){
                    siblings[i].classList.remove('active')
                }
              }
            e.target.parentElement.classList.add('active')
        }
    }

    function IsJsonValid(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return [];
        }
        return JSON.parse(str).blocks;
    }

    useEffect(() => {
        allPosts()
    }, [])

    if(!isLoaded){
        return (
            <div className="loader my-4">
                <img src={Heart} alt="All Cures Logo" id="heart"/>
            </div>
        );
    }
    else {
        return(
        <>
        <div className="container">
            <div className="row">
            <div className="tab-nav">
                {
                   props.type === "cures"?
                   null:
                   <>
               <div className="comman-heading">
                  <div className="h4 mt-4 text-capitalize">
                     {articleFilter} Cures
                  </div>
               </div>
                    <div>
                   <ul>
                   <li role="presentation" className='my-1'>
                      <button className="btn mr-2" 
                        onClick={(e) => { 
                            allPosts() 
                            articleFilterClick(e, 'recent')
                        }}>Recent</button>
                   </li>
                   {/* <li role="presentation" className='my-1'>
                      <button className="btn mr-2" onClick={(e) => { 
                            allPosts() 
                            articleFilterClick(e, 'earliest')
                        }}>Earliest</button>
                   </li> */}
                   <li role="presentation" className='my-1'>
                      <button className="btn mr-2" 
                        onClick={(e) => {
                            diseasePosts('diabetes')
                            articleFilterClick(e, 'diabetes')
                        }}>Diabetes</button>
                   </li>
                   <li role="presentation" className='my-1'>
                      <button className="btn mr-2" onClick={(e) => {
                            diseasePosts('Thyroid')
                            articleFilterClick(e, 'Thyroid')
                        }}>Thyroid</button>
                   </li>
                   <li role="presentation" className='my-1'>
                      <button className="btn mr-2" onClick={(e) => {
                            diseasePosts('arthritis')
                            articleFilterClick(e, 'arthritis')
                        }}>Arthritis</button>
                   </li>
                   <li role="presentation" className='my-1'>
                      <button className="btn mr-2" onClick={(e) => {
                            diseasePosts('Insomnia')
                            articleFilterClick(e, 'Insomnia')
                        }}>Insomnia</button>
                   </li>
                   <li role="presentation" className='my-1'>
                      <button className="btn mr-2" onClick={(e) => {
                            diseasePosts('migraine')
                            articleFilterClick(e, 'migraine')
                        }}>Migraine</button>
                   </li>
                   {/* <li role="presentation" className='my-1'>
                      <button className="btn mr-2" onClick={(e) => {
                            diseasePosts('Hypertension')
                            articleFilterClick(e, 'Hypertension')
                        }}>Hypertension</button>
                   </li> */}
                   <li role="presentation" className='my-1'>
                      <button className="btn mr-2" onClick={(e) => {
                            diseasePosts('Skin Care')
                            articleFilterClick(e, 'Skin Care')
                        }}>Skin Care</button>
                   </li>
                   <li role="presentation" className='my-1'>
                      <button className="btn mr-2" onClick={(e) => {
                            diseasePosts('Psoriasis')
                            articleFilterClick(e, 'Psoriasis')
                        }}>Psoriasis</button>
                   </li>
                   {/* <li role="presentation" className='my-1'>
                      <button className="btn mr-2" onClick={(e) => {
                            diseasePosts('Healthy Living')
                            articleFilterClick(e, 'Healthy Living')
                        }}>Healthy Living</button>
                   </li> */}
                   {/* <li role="presentation" className='my-1'>
                      <button className="btn" onClick={(e) => articleFilterClick(e, 'recent')}>Most Rated</button>
                   </li> */}
                </ul>
                </div>
               </>
    }
               
            </div>
               {/* <div className="comman-heading">
                  <div className="h4 float-left mr-4">Recent Articles</div> */}
                {/* <span><Link className="btn btn-article-search color-white" to="/cures">All Articles</Link></span> */}

               {/* </div> */}
            </div>
            <div className="row">
            <div className="main-hero" id="main-hero">
                {
                    items.length !== 0?
                    items.filter((i, idx) => idx < 9).map((i) => {
                    var content = []
                    var imgLocation = i.content_location
                    var imageLoc = '';
                    if(i.content){
                        content = IsJsonValid(decodeURIComponent(i.content))
                    }
                    if(imgLocation && imgLocation.includes('cures_articleimages')){
                        imageLoc = `https://all-cures.com:444/`+imgLocation.replace('json', 'png').split('/webapps/')[1]
                    } else {
                        imageLoc = 'https://all-cures.com:444/cures_articleimages//299/default.png'
                    }

                    var title = i.title
                    var regex = new RegExp(' ', 'g');

                    //replace via regex
                    title = title.replace(regex, '-');
                    return(
                    <div className="col-4" key={i.article_id.toString()}>
                    <div className="card my-2 w-100">
                        <div className='card-img'><img src={imageLoc} /></div>
                        <div className="card-body">
            
                            <h6 className='pb-2 text-muted'>
                            {
                                    i.authors_name !== "All Cures Team"?
                                    <Link to={`/profile/${i.rowno}`}>{i.authors_name}</Link> 
                                    : i.authors_name
                                }{" "}▪️ {<Date dateString={i.published_date} />}</h6>
                            <h5 className="card-title text-capitalize"><Link to={`/cure/${i.article_id}-${title}`}>{i.title.toLowerCase()}</Link></h5>
                            <div className="card-info">
                                {/* <h6 className="card-subtitle mb-2 text-muted text-capitalize">
                                    {i.window_title.toLowerCase()}
                                </h6> */}
                                <div className="card-text card-article-content-preview">
                                    {
                                        content?
                                            content.map((j, idx) => idx<1 && (
                                                <CenterWell
                                                    key = {idx}
                                                    content = {j.data.content}
                                                    type = {j.type}
                                                    text = {j.data.text.substr(0, 250) + '....'}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                
                // : null
                
                ): 
                <div className='my-5 py-4 h5 container text-center'>We do not have any cures for this condition yet but our editorial team is working on it. In the meantime, if you have a cure, Please <Link to="/article">Click Here</Link> to add the cure to our site.</div>
            }
            </div>
            </div>
            </div>
        </>
    )
}
}

export default ArticlePreview