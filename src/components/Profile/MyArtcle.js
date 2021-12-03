import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
// import EditModal from './EditModal'
import {Container} from "react-bootstrap";
// import PostArticle from '././components/BlogPage/PostArticle';
import { backendHost } from '../../api-config';
import ListArticle from './ListArticle'
import Cookies from 'js-cookie';

export default class Blogpage extends Component{

    constructor(props) {
        super(props);
        const params = props.match.params
        this.state = { 
          // url: props.url,
          param: params,
          items: [],
          isLoaded: false,
          regionPostsLoaded: false,
        };
      }
    

      PostArticles() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/article/allkv`)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              isLoaded: true,
              items: json,
            });
          })
          .catch(err => 
            console.log(err)
        )
      }

      componentDidMount() {
        this.PostArticles()  
      }

      componentDidUpdate(prevProps){
        if ( prevProps.match.params.type !== this.props.match.params.type){
          this.diseasePosts(this.props.match.params.type)
        }
      }
      
    render(){
        var { isLoaded,items } = this.state;

        if(!isLoaded) {
        return (
        <>
          <Header history={this.props.history}/>
            <Container className="mt-5 my-5 loading">
              <h3 className="text-left">Loading...</h3>
            </Container>
          <Footer/>
        </>  
      );
    } else if(isLoaded){
        return(
            <>
            <Header history={this.props.history}/>
            
                <div className="container my-4">
                    :<h1 className="h2 text-center">My Cures</h1>
                    <div className="row" id="posts-container">
                      
                    {items.map((i) => (
                      parseInt(this.state.acPerm[0]) === parseInt(i.published_by)?
                                // Selects articles with publish status = 3 (Published)
                      <ListArticle
                        id = {i.article_id}
                        title = {i.title}
                        f_title = {i.friendly_name}
                        w_title = {i.window_title}
                        country = {i.country_id}
                        type = {i.type}
                        pubstatus_id= {i.pubstatus_id}
                        PostArticlesContent={() => this.PostArticles()}
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