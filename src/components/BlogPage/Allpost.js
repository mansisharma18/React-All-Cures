import React from 'react';
import { Link } from 'react-router-dom';
import CenterWell from '../Disease/CenterWell';
const AllPost = ({id, title, content, f_title, w_title, country, type, published_date}) => {
        return (
            <>
            <div key={id.toString()} className="py-3 w-100">
                <div >
                    {/* <div className="card-body"> */}
                            
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Link to={ `/cure/${id}` }  className="d-flex justify-content-between align-items-center">
                                        <div className="card-title h5 text-capitalize">{title.toLowerCase()}</div>
                                    </Link>
                                </div>
                                <div>
                                {
                                type.includes('1') || type === '1'?
                                    <div className="chip overview mr-2">Overview</div>
                                : null
                                //     <div className="chip cure mr-2">Cures</div>
                                // : type === '3'?
                                //     <div className="chip symptoms mr-2">Symptoms</div>
                                // : null
                            }
                            {
                                type.includes('2') || type === '2'?
                                    <div className="chip cure mr-2">Cure</div>
                                    : null
                            }
                            {
                                type.includes('3') || type === '3'?
                                <div className="chip symptoms mr-2">Symptoms</div>
                                    : null
                            }
                            {   
                                country !== 0?
                                    country === 9?
                                        <div className ="chip country">India</div>
                                        : country === 10?
                                            <div className="chip country">Iran</div>
                                            :null
                                        : null
                            }
                            </div>
                            </div>
                        
                        <div className="card-info">
                            <div className="card-subtitle text-muted text-capitalize">{w_title.toLowerCase()}</div>
                            <div className='card-article-content-preview'>
                            {
                                    content && JSON.parse(content) ?
                                    JSON.parse(content).blocks.map((j) => (
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
                        </div>
                        <div className="text-left mt-2 text-muted">Published on: {published_date}</div>
        <hr/>
                        </div>
                        
                    {/* </div> */}
                </div>
            </div>
            </>
        )    

}
export default AllPost;