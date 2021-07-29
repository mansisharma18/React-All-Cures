import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
// import EditModal from './EditModal'
import {Container} from "react-bootstrap";
import AllPost from './Allpost';

export default class Blogpage extends Component{
    constructor(props) {
        super(props);
        const params = props.match.params
        this.state = { 
          // url: props.url,
          param: params,
          items: [],
          isLoaded: false,
        };
      }
    

      allPosts() {                        // For all available blogs "/bligs"
        fetch(`/article/all`)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            this.setState({
              isLoaded: true,
              items: json,
            });
          });
      }
      
      diseasePosts(){                     // For specific blogs like "/blogs/diabetes"
        fetch(`/isearch/${this.state.param.type}`)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            this.setState({
              isLoaded: true,
              items: json,
            });
          });
      }
      
      componentDidMount() {
        if(this.state.param.type){
          console.log('Disease Post executed')
          this.diseasePosts()
        } else {
          console.log('All Post executed')
          this.allPosts()
        }
      }
      
    render(){
        var { isLoaded,items } = this.state;
        console.log(this.state.param)
        console.log(this.state.url)
        if(!isLoaded) {
        console.log(items);
        return (
        <>
          <Header/>
            <Container className="mt-5 my-5 loading">
              <h3 className="text-left">Loading...</h3>
            </Container>
          <Footer/>
        </>  
      );
    } else if(isLoaded){
        return(
            <>
            <Header/>
            
                <div className="container my-4">
                    <h1 className="h2 text-center">All Blogs</h1>
                    <div className="row" id="posts-container">
                    {items.map((i) => (
                        <AllPost
                            id = {i[0]}
                            title = {i[1]}
                            f_title = {i[2]}
                            w_title = {i[6]}
                            allPostsContent={() => this.allPosts()}
                        />
                    ))}
                    </div>
                </div>
            <Footer/>
            </>
        );
    }
}
}