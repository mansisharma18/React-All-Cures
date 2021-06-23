import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.2)",
    overflow: "hidden"
    // color: "white",
}

export default class Modal extends Component{
    constructor(props) {
        super(props);
        this.state= {
            open: true
        }
    }
    
    componentDidMount() {    
        if(this.state.open){
          document.body.style.overflow = 'hidden';
        }    
    }
      
    componentWillUnmount() {
        document.body.style.overflow = 'unset';
    }
    
    render() {
        console.log('Modal Propssssssssssssssssss: ',this.state)
        return createPortal (
            <div style={modalStyle} onClick={this.props.onClick}>
                {this.props.children}
            </div>,
            document.getElementById("modal-root"),
            // document.body.style.position = 'fixed'
        );
    }
}