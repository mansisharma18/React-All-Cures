import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendHost } from '../../api-config';


class RegisterUser extends React.Component {
  
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false,
            
		};
	}

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
       axios.get(`${backendHost}/article/all/table/registration`)
        // .then(res => res.json())
       .then(res => {

				this.setState({
					items: res.data,
					DataisLoaded: true
				});
			})
	}

	render() {
		const { DataisLoaded, items } = this.state;
       
		if (!DataisLoaded) return( <div><h1> wait.... </h1> </div> );
		else return (
		<div class="Regist123">
		<h1> Registered users </h1> 
        <table class="table">
            <thead>
        <tr>
                                    <th scope="col " style={{width:"230px"}}>Id</th>
                                    <th style={{width:"230px"}}>First Name</th>
                                    <th style={{width:"230px"}}>Last Name</th>
                                    <th style={{width:"230px"}}>Email id</th>
                                </tr>
                                </thead></table>{
				items.map((item) => (
				<table class="table table-striped" >
                            
                            <tbody>
                                
                                <tr >
                                    <td style={{width:"230px"}}>{item[0]}</td>
                                    <td style={{width:"230px"}}>{item[1]}</td>
                                    <td style={{width:"230px"}}>{item[2]}</td>
                                    <td style={{width:"230px"}}>{item[3]}</td>
                                </tr>
                                
                            </tbody>
                        </table>





				))
			}
		</div>

	);
	}
}

export default RegisterUser;