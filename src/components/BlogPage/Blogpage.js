import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import EditModal from './EditModal'
import {Container} from "react-bootstrap";
import AllPost from './Allpost';

export default class Blogpage extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          items: [],
          isLoaded: false,
        };
      }
    

      allPosts() {
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
 
      componentDidMount() {
        this.allPosts()
      }
      
    render(){
        var { isLoaded,items } = this.state;
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
                    <h1 className="h1 text-center">Recent Posts</h1>
                    <div className="row" id="posts-container">
                    {items.map((i) => (
                        <AllPost
                            key={i[0]}
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