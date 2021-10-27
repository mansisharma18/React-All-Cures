import React, { Component } from 'react';
import { backendHost } from '../../api-config';


export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            values: {
                email: "",
                psw: "",
                rempwd: "on"
            },
            isSubmitting: false,
            isError: false
        };
    }
    submitForm = async e => {
        e.preventDefault();
        console.log(this.state);
        fetch(`${backendHost}/login?email=mr.sahilgupta@gmail.com&rempwd=on&psw=Sahil123&cmd=login`)
        .then(response => response.json())
        .then(data => this.setState({ totalReactPackages: data.total }));
      };
    
      handleInputChange = e =>
        this.setState({
          values: { ...this.state.values, [e.target.name]: e.target.value }
        });
    
      render() {
        return (
          <div>
              <button onClick={this.submitForm}>Login</button>
            <div className={`message ${this.state.isError && "error"}`}>
              {this.state.isSubmitting ? "Submitting..." : this.state.message}
            </div>
            <div id="editorjs"></div>
          </div>
        );
      }
    
}