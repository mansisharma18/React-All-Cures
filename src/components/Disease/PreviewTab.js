import React from 'react';
import CenterWell from './CenterWell';
import {Link } from 'react-router-dom'

export const PreviewTab = ({id, title, windowTitle, content, imageLoc}) => {
        return(
               
                <div className="col-4">
                    <div className="card my-2 w-100 mh-18">
                    {/* <Link to={`/cure/${id}`}> */}
                        <div className='card-img'><img src={imageLoc} /></div>
                        <div className="card-body px-2 py-0">
                            <div className="card-title text-capitalize mb-0 pt-1"><Link to={`/cure/${id}`}>{title}</Link></div>
                            <div className="card-info">
                                {/* <h6 className="card-subtitle mb-2 text-muted text-capitalize">
                                    {windowTitle}
                                </h6> */}
                                <p className="card-text card-article-content-preview">
                                    {
                                        content?
                                            content.map((j, idx) => idx<1 && (
                                                <CenterWell
                                                    content = {j.data.content}
                                                    type = {j.type}
                                                    text = {j.data.text.substr(0, 60) + '....'}
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
                                </p>
                            </div>
                        </div>
                        {/* </Link> */}
                    </div>
                </div>
    )}