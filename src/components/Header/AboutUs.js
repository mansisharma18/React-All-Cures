import React, { Component } from 'react';
import axios from "axios";
import { backendHost } from "../../api-config";
import Header from "./Header";
import Footer from '../Footer/Footer';

export default class AboutUs extends Component{
    constructor(props) {
        super(props);
        const params = props.match.params
        this.state = { 
            limit: 15,
            offset: 0,
            dc: props.location.search.split('&')[1],
            noMoreArticles: false,
            param: params,
            items: [],
            isLoaded: false,
            LoadMore: false,
            regionPostsLoaded: false,
            country: new URLSearchParams(this.props.location.search).get('c'),
            diseaseCondition: new URLSearchParams(this.props.location.search).get('dc'),
            articleFilter: 'recent'
          };
        }
          render(){
            var { isLoaded, items, regionPostsLoaded, LoadMore } = this.state;
    return(
<>
<div>
<Header history={this.props.history}/>
<div className="container my-4">
    <h1>About Us</h1>
    <p>All Cures is a product developed, managed and owned by Etherium Technologies. 
        Our mission is to make it simple and convenient for users to get information on 
        Cures from anywhere in the world. Our belief is that your wellness is your well-being.
         We are passionate about giving our users the unique experience that is both fulfilling and wholesome.
         
         </p>
         <div><a href="/feedback"><button id=""
          className="article-search btn btn-dark mt-10">Submit Your Feedback</button></a></div><br/><br/>
</div>
<Footer></Footer>
</div>
</>
    );

}
}