import { Link } from 'react-router-dom'

const ProfileTab = ({ firstName, lastName, rowno, name, pSpl, hospital, state, country }) => {

  const onError = (e) => {
    e.target.parentElement.innerHTML = `<i class="fas fa-user-md fa-6x"></i>`
 }
  
  return (
  
    <div>
      <div className="tab-content">
        <div id="men" className="tab-pane fade in active">
          <div className="tab-content-detail clearfix mr-20">
            <div className="dr-detail">
              <div className="tab-content-img">
                  <img src={`https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`} 
      onError={(e) => onError(e)}/>
                  </div>
              <div className="col-md-12 col-sm-12">
                <div className="detail-l">
                  {/* <div className="rating"> <span className="icon-star-1"></span>
                    <p>{ratingVal}</p>
                  </div> */}
                  <div className="name">
                  <h3>{name}</h3>
                  <h4>{pSpl}</h4>           {/* Primary Specialization */}
                  <h4>{hospital} {state} {country}</h4>
                  <h5 id="about">About {name}</h5>
                    <p></p>
                  </div>
                  <div className="btn-group"> 
                  <Link to={ `/profile/${rowno}-${firstName}-${lastName}` } className="btn-bg profile-btn color-white" id="profile">
                         Visit Profile
                        </Link>
                    {/* {
                      acPerm ? 
                        <Link to={ `/profile/${rowno}` } className="btn-bg profile-btn color-white" id="profile">
                         Visit Profile
                        </Link>
                      : <button id="profile"
                          className="btn btn-bg profile-btn color-white text-capitalize font-weight-normal" 
                          onClick={() => setModalShow(true)}
                        >
                         Visit Profile
                        </button>
                    } */}
                  
                    </div>
                </div>
              </div>
          
              </div>
            </div>
          </div>
      </div>
    </div>
  )};

export default ProfileTab;