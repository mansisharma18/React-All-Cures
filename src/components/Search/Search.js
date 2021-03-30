import React, { Component } from 'react';
import SearchService from '../../services/SearchService';


class Search extends Component {

    constructor(){
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        SearchService.getResponse().then((response) => {
            this.setState({ users: response.data })
        });
    }

    render() {
        console.log(users);
        return(
            <div>
                lkscn;aknc;akn
            </div>
        );
    }
}

export default UserComponent;