import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
// import EditModal from './EditModal'
import AllPost from './Allpost.js';
import { backendHost } from '../../api-config';

export default class Blogpage extends Component{

    constructor(props) {
        super(props);
        const params = props.match.params
        this.state = { 
          limit: 250,
          dc: props.location.search.split('&')[1],
          param: params,
          items: [],
          isLoaded: false,
          regionPostsLoaded: false,
          country: new URLSearchParams(this.props.location.search).get('c'),
          diseaseCondition: new URLSearchParams(this.props.location.search).get('dc'),
          articleFilter: 'recent'
        };
      }
    

      allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/article/allkv`)
          .then((res) => res.json())
          .then((json) => {
            var temp = []
              if(this.state.articleFilter === 'recent'){
                
                json.forEach(i => {
                    if(i.pubstatus_id === 3){
                        temp.push(i)
                    }
                });
                this.setState({isLoaded: true, items: temp})
              } else if(this.state.articleFilter === 'earliest'){
                  json.forEach(i => {
                      if(i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  this.setState({isLoaded: true, items: temp.reverse()})
              } else if(this.state.articleFilter === 'diabetes'){
                  json.forEach(i => {
                      if(i.dc_name === 'Diabetes' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  this.setState({isLoaded: true, items: temp})
              } else if(this.state.articleFilter === 'neurology'){
                  json.forEach(i => {
                      if(i.dc_name === 'Neurology' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  this.setState({isLoaded: true, items: temp})
              } else if(this.state.articleFilter === 'arthritis'){
                  json.forEach(i => {
                      if(i.dc_name === 'Arthritis' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  this.setState({isLoaded: true, items: temp})
              } else if(this.state.articleFilter === 'anemia'){
                  json.forEach(i => {
                      if(i.dc_name === 'Anemia' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  this.setState({isLoaded: true, items: temp})
              }
            this.setState({
              isLoaded: true,
              items: json,
              maxLimit: json.length
            });
          })
          .catch(err => console.log(err))
      }
      
      diseasePosts(type){                     // For specific blogs like "/blogs/diabetes"
        if(type){
          fetch(`${backendHost}/isearch/${type}`)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              isLoaded: true,
              items: json,
            });
          })
          .catch(err => console.log(err))
        }
        else {
        // if(type !== undefined){
          fetch(`${backendHost}/isearch/${this.props.match.params.type}`)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              isLoaded: true,
              items: json.reverse(),
            });
          });
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
        .catch(err => console.log(err))
      }

      // handleScroll = () => {
      //   const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
      //   if (bottom) {
      //     console.log('inside', bottom)
      //     this.setState({
      //       limit: this.state.limit + 25
      //     }, () => this.allPosts());
      //   }
      // };
      // React.useEffect(() => {
        
      // }, []);
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
        console.log(prevProps)
        // window.addEventListener('scroll', this.handleScroll, {
        //   passive: true
        // });
    
        // return () => {
        //   window.removeEventListener('scroll', this.handleScroll);
        // };
      }
      
    render(){
        var { isLoaded, items, regionPostsLoaded } = this.state;
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
            
                <div className="container cures-search my-4">
                  {
                    this.props.match.params.type?
                    <div className="h3 text-capitalize text-center font-weight-bold mb-4">Cures Related to "{this.props.match.params.type.toLowerCase()}"</div>
                    :<div class="tab-nav">
                    <div class="comman-heading">
                       <div class="h3 mb-4 text-capitalize mr-5">
                          Recent Cures
                       </div>
                    </div>
                    <ul>
                       <li role="presentation" class="active ">
                          <button className="btn mr-2" onClick={(e) => this.setState({ articleFilter: 'recent'}, () => this.allPosts())}>Recent</button>
                       </li>
                       <li role="presentation">
                          <button className="btn mr-2" onClick={(e) => this.setState({ articleFilter: 'earliest'}, () => this.allPosts())}>Earliest</button>
                       </li>
                       <li role="presentation">
                          <button className="btn mr-2" onClick={(e) => this.setState({ articleFilter: 'diabetes'}, () => this.allPosts())}>Diabetes</button>
                       </li>
                       <li role="presentation">
                          <button className="btn mr-2" onClick={(e) => this.setState({ articleFilter: 'neurology'}, () => this.allPosts())}>Neurology</button>
                       </li>
                       <li role="presentation">
                          <button className="btn mr-2" onClick={(e) => this.setState({ articleFilter: 'arthritis'}, () => this.allPosts())}>Arthritis</button>
                       </li>
                       <li role="presentation">
                          <button className="btn mr-2" onClick={(e) => this.setState({ articleFilter: 'anemia'}, () => this.allPosts())}>Anemia</button>
                       </li>
                       {/* <li role="presentation">
                          <button className="btn" onClick={(e) => articleFilterClick(e, 'recent')}>Most Rated</button>
                       </li> */}
                    </ul>
                 </div>
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
                            content = {decodeURIComponent(i.content)}
                            type = {i.type}
                            published_date = {i.published_date}
                            over_allrating = {i.over_allrating}
                            key = {i.article_id}
                            allPostsContent={() => this.allPosts()}
                        />
                        : null
                    ))}
                    {/* <button className="white-button-shadow btn w-100" 
                    onClick={() => {
                      this.setState({
                        limit: this.state.limit+25
                      }, () => this.allPosts())
                    }}>Show more</button> */}
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
                    <h1 className="h2 text-center">Cures related to "{this.state.param.type}"</h1>
                    :<h1 className="h2 text-center">All Cures</h1>
                  }
                    <div className="row" id="posts-container">
                    {items.map((i) => (
                      parseInt(i.country_id) === parseInt(this.state.country) ?            // Selects articles according to country required
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