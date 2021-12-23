import React from 'react';
import { Link } from 'react-router-dom';
import CenterWell from '../Disease/CenterWell';

const AllPost = ({id, title, content, f_title, w_title, country, type, published_date, over_allrating, imgLocation}) => {
    console.log(content)
    var imageLoc = '';
    if(imgLocation && imgLocation.includes('cures_articleimages')){
        imageLoc = `https://all-cures.com/`+imgLocation.replaceAll('json', 'png').split('/webapps/')[1]
    } else {
        imageLoc = 'https://all-cures.com/cures_articleimages//299/default.png'
    }
        return (
            <>
            <div key={id.toString()} className="d-flex cures-search-tab w-100 card mb-5">
                <div className='col-md-3 cures-tab-img rounded px-0'>
                        <img src={`${imageLoc}`} />
                                {/* {
                                    over_allrating !== 0?
                                    <div className='checked'id="starMob"><span class="fa fa-star checked mr-1"></span>{Math.round(over_allrating * 10) / 10}</div>
                                    : null
                                } */}
                                </div>
                <div className='col-md-9 mb-2'>
                    {/* <div className="card-body"> */}
                            {/* <div className='col-md-3'></div> */}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <Link to={ `/cure/${id}` }  className="d-flex justify-content-between align-items-center">
                                        <div className="card-title h5 text-capitalize article-title">{title.toLowerCase()}</div>
                                    </Link>
                                </div>
                                {
                                    over_allrating !== 0?
                                    <div className='checked'id="starWeb"><span class="fa fa-star checked mr-1"></span>{Math.round(over_allrating * 10) / 10}</div>
                                    : null
                                }
                                
                            </div>
                        
                        <div className="card-info">
                            <div className="card-subtitle text-muted text-capitalize">{w_title.toLowerCase()}</div>
                            <div className='card-article-content-preview'>
                            {
                                    content !== undefined && content?
                                        JSON.parse(content)?
                                    JSON.parse(content).blocks.map((j, idx) => idx<1 && (
                                        <CenterWell
                                            content = {j.data.content}
                                            type = {j.type}
                                            text = {j.data.text.substr(0, 250)+'...'}
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
                                    : null
                                }
                        </div>
                        <div className="text-left mt-2 text-muted" id="publish-date">Published on: {published_date}</div>
                        </div>
                        <div className='cures-tab-chips'>
                                {
                                type.includes('1') || type === '1'?
                                    <div className="chip overview">Overview</div>
                                : null
                                //     <div className="chip cure">Cures</div>
                                // : type === '3'?
                                //     <div className="chip symptoms">Symptoms</div>
                                // : null
                            }
                            {
                                type.includes('2') || type === '2'?
                                    <div className="chip cure">Cure</div>
                                    : null
                            }
                            {
                                type.includes('3') || type === '3'?
                                <div className="chip symptoms">Symptoms</div>
                                    : null
                            }
                            {   
                                country !== 0?
                                    country === 9?
                                        <div className ="chip country ml-2">India</div>
                                        : country === 10?
                                            <div className="chip country ml-2">Iran</div>
                                            :null
                                        : null
                            }
                            </div>
                    {/* </div> */}
                </div>
            </div>
            </>
        )    

}
export default AllPost;