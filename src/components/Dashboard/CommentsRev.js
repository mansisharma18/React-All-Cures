import React, { Component } from "react";

import axios from 'axios';
import Results from './Results'
import Grid from '@material-ui/core/Grid';



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
      currentlySelected: ''
     
      // param: params,
      // getComments: 'all',
    };
  }

  
  getComments(val) {
    
    axios.get(`/rating/comments${val}`)
      .then(res => {
        console.log(res.data)
        
        // comments: 8
        // reviewed: 1
        const approvedIds = res.data.filter(item => {
          if(item.reviewed) return true
          return false
        }).map(item => item.comments)

        this.setState({ approvedIds })

        var s = [];
        res.data.map(i => {
          s.push(i.comments);
        })
        console.log(s)
        this.setState({
          commentItems:res.data,
          unselectedCheckboxes: s
        })
        
        console.log('kjdghkhgkhgsd',this.state.unselectedCheckboxes)
      })
      // .then(res => {
      //   res.data.map((i) => {
      //     console.log(i.comments)
      //   })
      //   // console.log(check)
      // })
      .catch(err => console.log(err))
    
  }


  postApproved(selected, rejected) {
    // console.log('post approved fired!');
    console.log(selected.join())
    console.log(rejected.join())

    const isCurrentItemApproved = !this.state.approvedIds.includes(this.state.currentlySelected) ? 1 : 0
    console.log(isCurrentItemApproved, this.state.currentlySelected,this.state.approvedIds)
    
    axios.post(`/rating/reviewedby/1/reviewed/${isCurrentItemApproved}`, {
      "rateids": selected.join(),
      "rateids_rejected": rejected.join()
    })
      .then(res => {
        console.log(res)
       
      })
      .catch(err => console.log(err))

    
  }

  

  componentDidMount() {
    
  
    this.getComments('/')

    
  }
  
  onChange = id => {
    // event.target.checked
    this.setState({ currentlySelected: id })

    const index = this.state.unselectedCheckboxes.indexOf(id);
    if (index > -1) {
      this.state.unselectedCheckboxes.splice(index, 1);
    }
    console.log('after delete: ',this.state.unselectedCheckboxes)
    console.log('##########################',id)
    const selectedCheckboxes = this.state.selectedCheckboxes;
    console.log(selectedCheckboxes)
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

    
    // this.setState({
    //   UnselectedCheckboxes: UnselectedCheckboxes
    // });
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
    console.log(checkboxes)
    for (var checkbox of checkboxes) {
        checkbox.checked = e.target.checked;
    }
    
  }

  
  return (
    <>
    
              <div className="tab-content">
              <div><input type="checkbox"  onClick={select} className="select-all all" />
              <label for="checkbox" className="select-all">Select All</label></div>
              <div className="my-3 container" style={{zIndex: '999999'} }>
                <Results/>
                
                                    <select name=""className="form-select"
                                      onChange={(e)=> {
                                        
                                        // this.setState({
                                        //   getComments: e.target.value
                                        // })
                                        if(e.target.value == '0') {
                                          this.getComments('/0')
                                        }else if(e.target.value == '1') {
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
                            <div >
                              <div className="paitent-profile">
                             
                                {" "}
                              </div>
                              {
                                item.reviewed === 1 ?
                                  <div>
                                  <input type = "checkbox" 
                                  onChange={() => {
                                    this.onChange(item.comments)
                                    
                                    this.setState({
                                      customSelector: [...new Set(this.state.customSelector), item.comments ],
                                      checked: !this.state.isChecked
                                    })
                                    console.log('custom select ' + this.state.customSelector);
                                  }}
                                  selected={selectedCheckboxes.includes(item.comments)}
                                  className="check c1"
                                  defaultChecked={item.reviewed}
                                
                                  
                                />
                              </div>
                              : <input type = "checkbox" 
                              onChange={() => this.onChange(item.comments)}
                              selected={selectedCheckboxes.includes(item.comments)}
                              className="check c1"
                              
                              
                            />
                        }
                              
                              <div>
                              <div className="pb-2"><span className="font-weight-bold"><h2>Comments:</h2></span> {item.comments}</div>
                                {/* <p>{item.comments}</p> */}
                              </div>
                            </div>
                          </div>
                              </>
                            )
                          })}
                         
                          <div><br/>
                                
                                <button class="bcolor"onClick={() => {this.postApproved(selectedCheckboxes, unselectedCheckboxes)}}>Submit</button>
                              </div>
                         
                        </div>
                      </div>
                     
                    </div>
    </>
    
  )
}

}
export default CommentsRev; 