import React, { useState, useEffect } from 'react';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom'

const TrendingArticles = () => {
    
        return(
        <>
            <div className="trending-articles">
                <div className="col-4 my-3">
                    <div className="card d-flex justify-content-between rounded">
                        <div className="h5">Yoga</div>
                        <div id="trending-articles-1">
                        <Link to="/cures/yoga">
                            <img className="rounded-right" src="https://images.pexels.com/photos/2294353/pexels-photo-2294353.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></img>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-4 my-3">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-center">Chinese<br/> Medicine</div>
                        <div id="trending-articles-2">
                        <Link to="/cures/Chinese">
                            <img className="rounded-right" src="https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWVkaXRhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"></img>
                        </Link>
                        </div>
                    </div>
                </div>
                <div className="col-4 my-3">
                    <div className="card d-flex justify-content-between">
                        <div className="h5">Ayurveda</div>
                        <div id="trending-articles-3">
                        <Link to="/cures/Ayurveda">
                            <img className="rounded-right" src="https://images.unsplash.com/photo-1495461199391-8c39ab674295?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXl1cnZlZGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"></img>
                        </Link>
                        </div>
                    </div>
                </div>
                
                <div className="col-4 my-3">
                    <div className="card d-flex justify-content-between">
                        <div className="h5">Homeopathy</div>
                        <div id="trending-articles-3">
                        <Link to="/cures/Homeopathy">
                            <img className="rounded-right" src="https://images.unsplash.com/photo-1529058993007-d6011678776d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbWVvcGF0aHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"></img>
                        </Link>
                        </div>
                    </div>
                </div>
                <div className="col-4 my-3">
                    <div className="card d-flex justify-content-between">
                        <div className="h5">Naturopathy</div>
                        <div id="trending-articles-3">
                        <Link to="/cures/Natiropathy">
                            <img className="rounded-right" src="https://images.pexels.com/photos/161599/scent-sticks-fragrance-aromatic-161599.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></img>
                        </Link>
                        </div>
                    </div>
                </div>
                <div className="col-4 my-3">
                    <div className="card d-flex justify-content-between">
                        <div className="h5">Yunani</div>
                        <div id="trending-articles-3">
                        <Link to="/cures/Yunani">
                            <img className="rounded-right" src="https://cdn.pixabay.com/photo/2019/11/19/10/07/olives-4636996__340.jpg"></img>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrendingArticles