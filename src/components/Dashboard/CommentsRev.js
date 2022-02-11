import React, { Component } from "react";

import axios from 'axios';
import Results from './Results'
import { Alert } from 'react-bootstrap';
import { backendHost } from '../../api-config';
import Cookies from 'js-cookie';

class CommentsRev extends Component {
  constructor(props) {
    super(props);
    // const params = props.match.params
    this.state = { 
      items: [],
      commentItems: [],
      isLoaded: false,
      selectedCheckboxes: [],
      unselectedCheckboxes: [],
      isChecked: true,
      currentlySelected: '',
      acPerm: Cookies.get('acPerm'),
     
      // param: params,
      // getComments: 'all',
    };
  }

  
  getComments(val) {
    
    axios.get(`${backendHost}/rating/comments${val}`)
      .then(res => {
        const approvedIds = res.data.filter(item => {
          if(item.reviewed) return true
          return false
        }).map(item => item.rate_id)

        this.setState({ approvedIds })

        var s = [];
        res.data.map(i => (
          s.push(i.rate_id)
        ))
        this.setState({
          commentItems:res.data,
          unselectedCheckboxes: s
        })
        
      })
      .catch(err => {return})
    
  }


  postApproved(selected, rejected) {

    const isCurrentItemApproved = !this.state.approvedIds.includes(this.state.currentlySelected) ? 1 : 0
    
    axios.post(`${backendHost}/rating/reviewedby/${Cookies.get("acPerm").split('|')[0]}/reviewed/${isCurrentItemApproved}`, {
      "rateids": selected.join(),
      "rateids_rejected": rejected.join()
    })
      .then(res => {
        this.setState({ShowSubmitAlert: true});
       
      })
      .catch(err => {return})
      this.setState({ShowErrorAlert: true});
      setTimeout(()=>{
      this.setState({ShowErrorAlert: false});
      },4000)

    
  }

  

  componentDidMount() {
    
  
    this.getComments('/')

    
  }
  
  onChange = id => {
    this.setState({ currentlySelected: id })

    const index = this.state.unselectedCheckboxes.indexOf(id);
    if (index > -1) {
      this.state.unselectedCheckboxes.splice(index, 1);
    }
    const selectedCheckboxes = this.state.selectedCheckboxes;

    // Find index
    const unselectedCheckboxes = this.state.unselectedCheckboxes
    const findIdx = selectedCheckboxes.indexOf(id);
    const unselectIdx = unselectedCheckboxes.indexOf(id);

    // Index > -1 means that the item exists and that the checkbox is checked
    // and in that case we want to remove it from the array and uncheck it
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }

    if(unselectIdx > -1){
      return null
    }
    this.setState({
      selectedCheckboxes: selectedCheckboxes
    });

    
   
  };
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }
render(){
  const { selectedCheckboxes, unselectedCheckboxes } = this.state;
  
   function select(e) {
    
    var checkboxes = document.getElementsByClassName('check');
    for (var checkbox of checkboxes) {
        checkbox.checked = e.target.checked;
    }
    
  }

  
  return (
    <>
    
              <div className="tab-content">
              <div><input type="checkbox" onClick={select} className="select-all all" />
              <label for="checkbox" className="select-all">Select All</label></div>
              <div className="my-3 container" style={{zIndex: '999999'} }>
                <Results/>
                
                                    <select name=""className="form-select"
                                      onChange={(e)=> {
                                        
                                        // this.setState({
                                        //   getComments: e.target.value
                                        // })
                                        if(parseInt(e.target.value) === 0) {
                                          this.getComments('/0')
                                        }else if(parseInt(e.target.value) === 1) {
                                          this.getComments('/1')
                                        }else {
                                          this.getComments('/')
                                        }
                                      }}
                                      id="">
                                      <option value="all"  onClick={() => this.getComments('/')}>All</option>
                                      <option value="1" onClick={() => this.getComments('/1')} >Approved</option>
                                      <option value="0"  onClick={() => this.getComments('/0')}>UN Approved</option>
                                      
                                    </select>
                                    
                                </div>
             

 
    
                      <div id="patient" className="tab-pane active">
                        
                        <div className="rating-outer" id="rating">
                        
                        {this.state.commentItems.map((item,i) => {
                            return (
                              <>
                                <div className="rating-patient">
                            <div className="rating-patient-grid clearfix">
                              <div className="paitent-profile">
                             
                                {" "}
                              </div>
                              {
                                item.reviewed === 1 ?
                                  <div>
                                  <input type = "checkbox"
                                  onChange={() => {
                                    this.onChange(item.rate_id)
                                    
                                    this.setState({
                                      customSelector: [...new Set(this.state.customSelector), item.rate_id ],
                                      checked: !this.state.isChecked
                                    })
                                  }}
                                  selected={selectedCheckboxes.includes(item.rate_id)}
                                  className="check c1"
                                  defaultChecked={item.reviewed}
                                //  onChange={this.toggleChange}
                                  
                                />
                                
                                

                              </div>
                              

                              
                              : <input type = "checkbox"
                              onChange={() => this.onChange(item.rate_id)}
                              selected={selectedCheckboxes.includes(item.rate_id)}
                              className="check c1"
                              
                              
                            />
                        }
                              
                              
                             
                             

                              <div className="patient-msg">
                              
                                {/* <p>{item.rate_id}</p> */}
                                <div className="pb-2"><span className="font-weight-bold"> <h2><b>(1): Comments:</b></h2></span> {item.comments}</div>
                              
                                <div className="pb-2"><span className="font-weight-bold"><h2><b>(2): Commented By:</b></h2></span> <h5>{item.first_name} {item.last_name}</h5></div>
                               <h2><b>(3): Commented on </b></h2>
                                {
                                  
                               parseInt(item.target_type_id) === 1?
                              
                                    <div className="chip overview mr-2">Doctor id {item.target_id}</div>
                                    
                                : parseInt(item.target_type_id)=== 2?
                                    <div className="chip cure mr-2">Article id {item.target_id}</div>
                               
                                : null
                            }

                              </div>
                            </div>
                          </div>
                              </>
                            )
                          })}
                          {/* <p>Selected checkboxes: {JSON.stringify(selectedCheckboxes)}</p>
                          <p>unselected checkboxes: {JSON.stringify(unselectedCheckboxes)}</p> */}
                         
                          <div>
                          {
                                        this.state.ShowSubmitAlert
                                            ? <SubmitAlert ShowSubmitAlert={this.state.ShowSubmitAlert}/>
                                            : null
                                    }
                                
                                <button className='bcolor' onClick={() => {this.postApproved(selectedCheckboxes, unselectedCheckboxes)}}>Submit</button>
                              </div>
                         
                        </div>
                      </div>
                      <div id="recomended" className="tab-pane fade">
                        <h3>Menu 1</h3>
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
    </>
    
  )
}

}

// SHOW ALERT

function SubmitAlert(props) {
  if(props.ShowSubmitAlert) {
      return(
          <Alert className="bg-green">Comments has been saved successfully!</Alert>
      );
  }
}

// Show Error Alert

// function SubmitError(props) {
//   if(props.ShowErrorAlert) {
//       return(
//           <Alert className="bg-red">Some Error occured!</Alert>
//       );
//   }
// }
export default CommentsRev; 