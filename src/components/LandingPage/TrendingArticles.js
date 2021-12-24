import React from 'react';
import { Link } from 'react-router-dom'

const TrendingArticles = () => {
    
        return(
        <>
            <div className="trending-articles">
                <div className="col-md-4 my-3">
                    <Link to="/searchcures/Ayurveda">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark col-md-6 text-center">Ayurveda</div>
                        <div className="col-md-6 rounded" id="ayurveda">
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 my-3">
                    <Link to="/searchcures/Unani">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark col-md-6 text-center">Unani</div>
                        <div className="col-md-6 rounded" id="unani">
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 my-3">
                    <Link to="/searchcures/Persian">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark col-md-6 text-center">Persian</div>
                        <div className="col-md-6 rounded" id="naturopathy">
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 my-3">
                    <Link to="/searchcures/Chinese">
                        <div className="card d-flex justify-content-between">
                            <div className="h5 text-dark col-md-6 text-center">Chinese<br/> Medicine</div>
                            <div className="col-md-6 rounded" id="chinese">
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-4 my-3">
                    <Link to="/searchcures/Japanese">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark col-md-6 text-center">Japanese</div>
                        <div className="col-md-6 rounded" id="homeopathy">
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 my-3">
                <Link to="/searchcures/Scandinavian">
                    <div className="card d-flex justify-content-between rounded">
                        <div className="h5 text-dark col-md-6 text-center">Scandinavian</div>
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