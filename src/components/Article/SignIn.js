import React, { Component } from 'react';

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
        fetch('/login?email=mr.sahilgupta@gmail.com&rempwd=on&psw=Sahil123&cmd=login')
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
            {/* <form onSubmit={this.submitForm}>
              <div className="input-group">
                <label htmlFor="email">E-mail Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={this.state.values.email}
                  onChange={this.handleInputChange}
                  title="Email"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="psw"
                  id="password"
                  value={this.state.values.psw}
                  onChange={this.handleInputChange}
                  title="password"
                  required
                />
              </div>
              <button type="submit">Sign In</button>
            </form> */}
            <div className={`message ${this.state.isError && "error"}`}>
              {this.state.isSubmitting ? "Submitting..." : this.state.message}
            </div>
            <div id="editorjs"></div>
          </div>
        );
      }
    
}