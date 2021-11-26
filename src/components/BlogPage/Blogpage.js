import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
// import EditModal from './EditModal'
import {Container} from "react-bootstrap";
import AllPost from './Allpost.js';
import { backendHost } from '../../api-config';

export default class Blogpage extends Component{

    constructor(props) {
        super(props);
        const params = props.match.params
        this.state = { 
          dc: props.location.search.split('&')[1],
          param: params,
          items: [],
          isLoaded: false,
          regionPostsLoaded: false,
          country: new URLSearchParams(this.props.location.search).get('c'),
          diseaseCondition: new URLSearchParams(this.props.location.search).get('dc')
        };
      }
    

      allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/article/allkv`)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              isLoaded: true,
              items: json.reverse(),
            });
          });
      }
      
      diseasePosts(type){                     // For specific blogs like "/blogs/diabetes"
        // if(type){
        //   fetch(`${backendHost}/isearch/${type}`)
        //   .then((res) => res.json())
        //   .then((json) => {
        //     this.setState({
        //       isLoaded: true,
        //       items: json.reverse(),
        //     });
        //   });
        // }
        // else {
        if(type !== undefined){
          fetch(`${backendHost}/isearch/${this.props.match.params.type}`)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              isLoaded: true,
              items: json.reverse(),
            });
          });
        } else {
          this.allPosts()
        }
      }

      regionalPosts(){
        fetch(`${backendHost}/isearch/treatmentregions/${this.state.dc.split('=')[1]}`)       // /isearch/treatmentregions/${this.state.diseaseCondition}
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            regionPostsLoaded: true,
            items: json.reverse(),
          });
        })
      }

      componentDidMount() {
        if(this.state.param.type){
          this.diseasePosts()
        } else if(this.props.location.search){
          this.regionalPosts()
        } else {
          this.allPosts()
        }
      }

      componentDidUpdate(prevProps){
        if ( prevProps.match.params.type !== this.props.match.params.type){
          this.diseasePosts(this.props.match.params.type)
        }
      }
      
    render(){
        var { isLoaded,items, regionPostsLoaded, country } = this.state;
        if(!isLoaded && !regionPostsLoaded) {
        return (
        <>
          <Header history={this.props.history}/>
            <div className="loader my-4">
              <i className="fa fa-spinner fa-spin fa-6x" />
            </div>
          <Footer/>
        </>  
      );
    } else if(isLoaded){
        return(
            <>
            <Header history={this.props.history}/>
            
                <div className="container my-4">
                  {
                    this.state.param.type?
                    <h1 className="h2 text-center">Articles related to "{this.props.match.params.type}"</h1>
                    :<h1 className="h2 text-center">Articles</h1>
                  }
                    <div className="row" id="posts-container">
                    {items.map((i) => (
                      i.pubstatus_id === 3 ?            // Selects articles with publish status = 3 (Published)
                        <AllPost
                            id = {i.article_id}
                            title = {i.title}
                            f_title = {i.friendly_name}
                            w_title = {i.window_title}
                            country = {i.country_id}
                            type = {i.type}
                            key = {i.article_id}
                            allPostsContent={() => this.allPosts()}
                        />
                        : null
                    ))}
                    </div>
                </div>
            <Footer/>
            </>
        );
    } else if(regionPostsLoaded){
      return(
        <>
            <Header history={this.props.history}/>
            
                <div className="container my-4">
                  {
                    this.state.param.type?
                    <h1 className="h2 text-center">Blogs related to "{this.state.param.type}"</h1>
                    :<h1 className="h2 text-center">All Blogs</h1>
                  }
                    <div className="row" id="posts-container">
                    {items.map((i) => (
                      i.country_id == this.state.country ?            // Selects articles according to country required
                        <AllPost
                            id = {i.article_id}
                            title = {i.title}
                            key = {i.article_id}
                            // f_title = {i.friendly_name}
                            // w_title = {i.window_title}
                            // allPostsContent={() => this.allPosts()}
                        />
                        : null
                    ))}
                    </div>
                </div>
            <Footer/>
            </>
      );
    }
}
}