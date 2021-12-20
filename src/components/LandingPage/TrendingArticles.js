import React from 'react';
import { Link } from 'react-router-dom'

const TrendingArticles = () => {
    
        return(
        <>
            <div className="trending-articles">
                <div className="col-md-4 my-3">
                    <Link to="/cures/Ayurveda">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark col-md-6 text-center">Ayurveda</div>
                        <div className="col-md-6 rounded" id="ayurveda">
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 my-3">
                    <Link to="/cures/Unani">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark col-md-6 text-center">Unani</div>
                        <div className="col-md-6 rounded" id="unani">
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 my-3">
                    <Link to="/cures/Persian">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark col-md-6 text-center">Persian</div>
                        <div className="col-md-6 rounded" id="Persian">
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 my-3">
                    <Link to="/cures/Chinese">
                        <div className="card d-flex justify-content-between">
                            <div className="h5 text-dark col-md-6 text-center">Chinese<br/> Medicine</div>
                            <div className="col-md-6 rounded" id="chinese">
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-4 my-3">
                    <Link to="/cures/Homeopathy">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark col-md-6 text-center">Homeopathy</div>
                        <div className="col-md-6 rounded" id="homeopathy">
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 my-3">
                <Link to="/cures/yoga">
                    <div className="card d-flex justify-content-between rounded">
                        <div className="h5 text-dark col-md-6 text-center">Yoga</div>
                        <div className="col-md-6 rounded" id="yoga">                           
                        </div>
                    </div>
                    </Link>
                </div>
                
            </div>
        </>
    )
}

export default TrendingArticles