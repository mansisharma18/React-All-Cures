import Cookies from "js-cookie";
import React, { Component } from "react";
import './style.css'
export default class Login extends Component {
    render() {
        return (
            <form id="Login-form" >
                <div className="card px-4 py-4 my-4 mx-auto">
                <h3 className="text-center">Sign in here</h3>
                
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                <h4 className="text-center">OR</h4>
                <button type="submit" className="btn btn-dark  btn-block">Sign Up</button>
                </div>
            </form>
        );
    }
}