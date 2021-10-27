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
        console.log(props)
        const params = props.match.params
        this.state = { 
          // url: props.url,
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
            console.log(json);
            this.setState({
              isLoaded: true,
              items: json,
            });
          });
      }
      
      diseasePosts(type){                     // For specific blogs like "/blogs/diabetes"
        if(type){
          fetch(`${backendHost}/isearch/${type}`)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            this.setState({
              isLoaded: true,
              items: json,
            });
          });
        }
        else {
          fetch(`${backendHost}/isearch/${this.props.match.params.type}`)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            this.setState({
              isLoaded: true,
              items: json,
            });
          });
        }
      }

      regionalPosts(){
        fetch(`${backendHost}/isearch/treatmentregions/2`)          // /isearch/treatmentregions/${this.state.diseaseCondition}
        .then((res) => res.json())
        .then((json) => {
          console.log('Regional posts: ',json)
          this.setState({
            regionPostsLoaded: true,
            items: json,
          });
        })
      }

      componentDidMount() {
        if(this.state.param.type){
          console.log('Disease Post executed')
          this.diseasePosts()
        } else if(this.props.location.search){
          this.regionalPosts()
        } else {
          console.log('All Post executed')
          this.allPosts()
        }
      }

      componentDidUpdate(prevProps){
        if ( prevProps.match.params.type !== this.props.match.params.type){
          console.log('prevpropsssssssss: ', prevProps.match.params.type, this.props.match.params.type )
          this.diseasePosts(this.props.match.params.type)
        }
      }
      
    render(){
        var { isLoaded,items, regionPostsLoaded, country } = this.state;
        console.log(new URLSearchParams(this.props.location.search).get('c'))
        console.log(this.state.url)
      console.log('kakhgauhdkjadkudhkajsdksjhd7rny9: ', regionPostsLoaded)

        if(!isLoaded && !regionPostsLoaded) {
          console.log('not is loaded')
        console.log(items);
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
      console.log('is loaded')
        return(
            <>
            <Header history={this.props.history}/>
            
                <div className="container my-4">
                  {
                    this.state.param.type?
                    <h1 className="h2 text-center">Blogs related to "{this.props.match.params.type}"</h1>
                    :<h1 className="h2 text-center">All Blogs</h1>
                  }
                    <div className="row" id="posts-container">
                    {items.map((i) => (
                      i.pubstatus_id === 3 ?            // Selects articles with publish status = 3 (Published)
                        <AllPost
                            id = {i.article_id}
                            title = {i.title}
                            f_title = {i.friendly_name}
                            w_title = {i.window_title}
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