import React from 'react';
import { Link } from 'react-router-dom'
import { backendHost } from '../../api-config';
const TrendingArticles = () => {
    function doThis(medicine_type){                     // For specific blogs like "/blogs/diabetes"
        // if(type){
          fetch(`${backendHost}/isearch/medicinetype/${medicine_type}`)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              isLoaded: true,
              items: json,
            });
          })
          .catch(err => {return})
        // }
      }

        return(
        <>
            <div className="trending-articles">
                <div className="col-md-4 my-3">
                   
                    <div className="card d-flex justify-content-between" style={{cursor:'pointer'}} onClick={() => doThis()}>
                        <div className="h5 text-dark col-md-6 text-center">Ayurveda</div>
                        <div className="col-md-6 rounded" id="ayurveda">
                        </div>
                    </div>
                    
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
                    <Link to="/searchcures/Persian">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark col-md-6 text-center">Persian</div>
                        <div className="col-md-6 rounded" id="naturopathy">
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