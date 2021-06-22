import React, { Component } from 'react';
import Modal from './modal.js';
import LoginForm from './loginForm'
export default class LoginPage extends Component {
    render() {
        const params = new URLSearchParams(this.props.location.search);
        return (
            params.get('login') && <Modal
                // onClick={()=>{
                //     this.props.history.push(this.props.location.pathname)
                // }}
            >
                {/* <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%"
                    }}
                >
                    Login Modal
                </div> */}
                <div 
                    id="modal-close"
                    onClick={()=>{
                        this.props.history.push(this.props.location.pathname)
                    }}
                >✖</div>
                <LoginForm/>
                
            </Modal>
        ); 
    }
}