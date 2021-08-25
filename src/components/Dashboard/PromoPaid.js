import React, { Component } from "react";

import axios from 'axios';
import Results from './Results'



class PromoPaid extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      commentItems: [],
      isLoaded: false,
      selectedCheckboxes: [],
      unselectedCheckboxes: [],
      isChecked: true,
     
     
    };
  }

  
  getComments(val) {
    
    axios.get(`/promo/articlespromostage/${val}`)
      .then(res => {
        console.log(res.data)
        var s = [];
        res.data.map(i => {
          s.push(i.article_id);
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
      //     console.log(i.article_id)
      //   })
      //   // console.log(check)
      // })
      .catch(err => console.log(err))
    
  }


  postApproved(selected, rejected) {
    
    console.log(selected.join())
    console.log(rejected.join())
    
    axios.post(`/promo/reviewedby/1/stage/1`, {
      "articles_ids": selected.join(),
      "articles_ids_rejected": rejected.join()
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
              <div><input type="checkbox" onClick={select} className="select-all" />
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
                                      <option value="1" onClick={() => this.getComments('/1')} >Paid</option>
                                      <option value="0"  onClick={() => this.getComments('/0')}>UN Paid</option>
                                      
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
                              {item.article_id}
                              {item.promo_code}
                                {" "}
                              </div>
                              {
                                item.promo_stage === 1 ?
                                  <div>
                                  <input type = "checkbox"
                                 onChange={() => this.onChange(item.article_id)}
                                 selected={selectedCheckboxes.includes(item.article_id)}
                                 className="check"
                                 checked
                                  
                                />
                                
                                

                              </div>
                              

                              
                              : <input type = "checkbox"
                              onChange={() => this.onChange(item.article_id)}
                              selected={selectedCheckboxes.includes(item.article_id)}
                              className="check"
                              
                              
                            />
                        }
                              
                              
                             
                             

                              <div className="patient-msg">
                              
                                <p>{item.article_id}</p>
                              </div>
                            </div>
                          </div>
                              </>
                            )
                          })}
                          <p>Selected checkboxes: {JSON.stringify(selectedCheckboxes)}</p>
                          <p>unselected checkboxes: {JSON.stringify(unselectedCheckboxes)}</p>
                         
                          <div>
                                
                                <button onClick={() => {
                                const confirmBox = window.confirm(
                                  "Are You Sure?"
                                )
                                if (confirmBox === true) {
                                  {this.postApproved(selectedCheckboxes, unselectedCheckboxes)} }
                              }}>
                                  
                                  
                                  Submit</button>
                              </div>
                         
                        </div>
                      </div>
                      <div id="recomended" className="tab-pane fade">
                        
                     
                      </div>
                    </div>
    </>
    
  )
}

}
export default PromoPaid; 