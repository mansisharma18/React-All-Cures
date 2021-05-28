import { Link } from 'react-router-dom'
import Special1 from '../../assets/img/special-1.jpg'

const ProfileTab = ({ docid, name, pSpl, hospital, state, country}) => (
  
    <div>
      <div className="tab-content">
        <div id="men" className="tab-pane fade in active">
          <div className="tab-content-detail clearfix mr-20">
            <div className="dr-detail">
              <div className="tab-content-img">
                  <img src={Special1} alt="special-1"/> 
                  </div>
              <div className="col-md-6 col-sm-12">
                <div className="detail-l">
                  <div className="rating"> <span className="icon-star-1"></span>
                    <p>4.2</p>
                  </div>
                  <div className="name">
                  <h2>{name}</h2>
                  <h3>{pSpl}</h3>           {/* Primary Specialization */}
                  <h4>{hospital} {state} {country}</h4>
                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales dolor in ante fermentum, vitae varius turpis imperdiet.”</p>
                  </div>
                  <div className="btn-group"> 
                    <Link to={ `/profile/${docid}` } className="btn-bg profile-btn color-white">
                        Profile
                    </Link> 
                    <Link to="#" className="bg-gray video-btn color-light-gray">Video Consult</Link> </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="detail-r">
                  <ul className="mon coman-ul">
                    <p>Mon</p>
                    <li><Link to="#" className="active">9.00 am</Link></li>
                    <li><Link to="#">10.00 am</Link></li>
                    <li><Link to="#">1.00 pm</Link></li>
                    <li><Link to="#">2.00 pm</Link></li>
                  </ul>
                  <ul className="tue coman-ul">
                    <p>Tue</p>
                    <li><Link to="#">9.00 am</Link></li>
                    <li><Link to="#">10.00 am</Link></li>
                    <li><Link to="#">1.00 pm</Link></li>
                    <li><Link to="#">2.00 pm</Link></li>
                  </ul>
                  <ul className="wed coman-ul">
                    <p>Wed</p>
                    <li><Link to="#">9.00 am</Link></li>
                    <li><Link to="#">10.00 am</Link></li>
                    <li><Link to="#">1.00 pm</Link></li>
                    <li><Link to="#">2.00 pm</Link></li>
                  </ul>
                  <ul className="ted coman-ul">
                    <p>Thu</p>
                    <li><Link to="#">9.00 am</Link></li>
                    <li><Link to="#">10.00 am</Link></li>
                    <li><Link to="#">1.00 pm</Link></li>
                    <li><Link to="#">2.00 pm</Link></li>
                  </ul>
                  <ul className="fri coman-ul">
                    <p>Fri</p>
                    <li><Link to="#">9.00 am</Link></li>
                    <li><Link to="#">10.00 am</Link></li>
                    <li><Link to="#">1.00 pm</Link></li>
                    <li><Link to="#">2.00 pm</Link></li>
                  </ul>
                 </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );

  export default ProfileTab;