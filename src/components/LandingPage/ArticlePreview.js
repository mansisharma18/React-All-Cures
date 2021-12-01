import React, { useState, useEffect } from 'react';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom'
const ArticlePreview = (props) => {
    const [items, setItems] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    
    function allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/article/allkv`)
          .then((res) => res.json())
          .then((json) => {
            setItems(json.reverse())
            setLoaded(true)
          });
    }

    useEffect(() => {
        allPosts()
    }, [])

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
            <div className="main-hero">
                {items.map((i, index) => i.pubstatus_id === 3 && index<12 && (
                    <div className="col-4">
                    <div className="card my-2 ">
                        <div className="card-body">
                            <h5 className="card-title">{i.title}</h5>
                            <div className="card-info">
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {i.window_title}
                                </h6>
                                <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in scelerisque magna,  sed rutrum urna tincidunt.<Link to={`/cure/${i.article_id}`}>...read more</Link>
                                    {/* ${p.body.substr(0, 200)}<a href="#">...read more</a> */}
                                </p>
                            </div>
                            <a href="#" className="card-link" id="comment-link">Comment</a>
                            <a href="#" className="card-link">Like</a>
                        </div>
                    </div>
                </div>
                )) }
            </div>
        </>
    )
}
}

export default ArticlePreview