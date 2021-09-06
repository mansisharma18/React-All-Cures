import React, { Component } from 'react';
import { Button, Accordion, Card, Container, Form, Alert } from 'react-bootstrap';
import { Checkbox, FormGroup, FormControlLabel, Select, MenuItem , FormControl, InputLabel} from '@material-ui/core'

import Cookies from 'js-cookie';
import '../Article/article.css'
import Carousel from '../Article/Carousel'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../Article/tools';
import Options from '../Article/Options';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from 'axios';

export default class Test extends Component {
    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.instanceRef = React.createRef();
        
        // this.renderStatus = this.renderStatus.bind(this)
        // this.submitForm = this.submitForm.bind(this);
        // this.handleClick().bind(this)
        this.state = {
            // acPerm: Cookies.get('acPerm'),
            acPerm: Cookies.get('acPerm'),
            isLoggedIn: false,
            ac: '',
            showAuthorAccordian: false,
            ShowSubmitAlert: false,
            ShowErrorAlert: false,
            values: {
                authorFN: "",
                authorMN:"",
                authorLN:"",
                authorTel: "",
                authorStatus: "",
                authorAddr: "",
                authorEmail: "",
            },
            isSubmitting: false,
            isError: false,
            articleValues: {
                title: "",
                friendlyName: "",
                contentType: [],
                disclaimerId : 1,
                authById: 9,
                copyId: 11,
                articleStatus: 1,
                winTitle : "",
                language : 1,
                articleContent : "",
                countryId: 9,
                diseaseConditionId: 1,
                comments: ""
            },
        };
    }

    handleSubmit() {
        this.setState({ShowSubmitAlert: true});
        // this.state.articleValues.title = null;
    }

    handleErrorSubmit(){
        this.setState({ShowErrorAlert: true});
    }


    handleChange (e) {
        this.setState({
            articleValues: { ...this.state.articleValues, [e.target.name]:  Array.from(e.target.selectedOptions, (item) => item.value) }
        });
        console.log(this.state.articleValues.contentType)
    }
    
    componentDidMount(){
        Promise.all([

            fetch('/article/all/table/disease_condition').then(res => res.json()),
            fetch('/article/all/table/countries').then(res => res.json()),

        ]).then(([languageData, authorData, disclaimerData, diseaseData, countryData]) => {
            console.log('Language Data: ',languageData)
            console.log('Author Data: ',authorData)
            console.log('Disclaimer Data: ', disclaimerData)
            console.log('Speciality Data: ', diseaseData)
            this.setState({
                isLoaded: true,
                language: languageData,
                author: authorData,
                disclaimer: disclaimerData,
                speciality: diseaseData,
                country: countryData
            });

        })
    }
    // ARTICLE FORM SUBMIT

    
    handleArticleChange = e => {
        this.setState({
            articleValues: { ...this.state.articleValues, [e.target.name]: e.target.value }
        });
        console.log(e.target.name + e.target.value)
    }

    // submitForm = async e => {
    //     e.preventDefault();
    //     this.setState({ isSubmitting: true });

    //     const res = await fetch("/author?cmd=createAuthor", {
    //         method: "POST",
    //         body: `authorFN=${this.state.values.authorFN}&authorMN=${this.state.values.authorMN}&authorLN=${this.state.values.authorLN}&authorTel=${this.state.values.authorTel}&authorStatus=${this.state.values.authorStatus}&authorAddr=${this.state.values.authorAddr}&authorEmail=${this.state.values.authorEmail}`,
    //         headers: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //         }
    //     });
    //     this.setState({ isSubmitting: false });
    //     const data = await res.text();
    //     !data.hasOwnProperty("error")
    //     ? this.setState({ message: data.success })
    //     : this.setState({ message: data.error, isError: true });

    //     setTimeout(
    //     () =>
    //         this.setState({
    //         isError: false,
    //         message: "",
    //         values: { email: "", password: "" }
    //         }),
    //     1600
    //     );
    // };

    putSubscribtion() {
    
      // console.log(selected.join())
      // console.log(rejected.join())
      
      axios.put(`/users/updatesubscribe/7889761896`, {
      //   "articles_ids": selected.join(),
      //   "articles_ids_rejected": rejected.join()
      "nl_subscription_disease_id": 1,
      "nl_sub_type":1,
      "nl_subscription_cures_id":0,
      })
        .then(res => {
          console.log(res)
         
        })
        .catch(err => console.log(err))
   
      
    }

    




    renderStatus = () => {
        const {acPerm} =this.state;
        var permission = 1
        permission = parseInt(permission[1])
        console.log('Permission: ',typeof(permission))
        if(permission <= 4){
            // return(
            //     <Form.Group className="col-md-6 float-left">
            //         <Form.Label>Article Status</Form.Label>
            //         <Form.Control as="select" name="articleStatus" custom onChange={this.handleArticleChange} required>
            //             <option>Open this select menu</option>
            //             <option value="1">Work in Progress</option>
            //             <option value="2">Review</option>
            //             {/* <option value="3" disabled>Publish</option> */}
            //         </Form.Control>                       
            //     </Form.Group>
            // )
        } else if(permission === 7 || permission === 9){
            return(
                <Form.Group className="col-md-6 float-left">
                    <Form.Label>Article Status</Form.Label>
                    <Form.Control as="select" name="articleStatus" custom onChange={this.handleArticleChange} required>
                        <option>Open this select menu</option>
                        <option value="1">Work in Progress</option>
                        <option value="2">Review</option>
                        <option value="3">Publish</option>
                    </Form.Control>                       
                </Form.Group>
            )
        }
        else {
            return null
        }
    }
    render() {
        
        const isLoggedIn = this.state.isLoggedIn;
        const showAuthorAccordian = this.state.showAuthorAccordian;
        let showAuthorButton;
        if(showAuthorAccordian) {
            showAuthorButton = <HideAccordian onClick={this.handleAuthorClick}/>
        } else {
            showAuthorButton = <CreateAccordian className="btn bg-dark" onClick={this.handleAuthorClick}/>
        }
        var { isLoaded,language } = this.state;
        if(!isLoaded) {
        console.log(language);
        
        return (
        <>
            <Container className="mt-5 my-5 loading">
              <h3 className="text-left">Loading...</h3>
            </Container>
        </>  
      );
    } else if(isLoaded){
    return (
        <div>
            {/* <Header/> */}
            <Carousel/>
                <Container>  
                    <Card className="mainCard" >
                        

                        <Accordion>
                        <Greeting isLoggedIn={isLoggedIn} />

                        {/* AUTHOR ACCORDIAN */}

                        <Author acPerm={this.state.acPerm} showAuthorButton={showAuthorButton}/>

                        <Form onSubmit={this.submitForm}>
                            <CreateAuthorAccordian showAuthorAccordian={showAuthorAccordian} this={this} state={this.state.values}/>
                        </Form>

                         {/* Article Details  */}
                        {/* <AuthorAccordian/> */}
                        <Form onSubmit = {this.submitArticleForm}>
                        <Card>
                         
                                <Card.Body>
                                   
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Subsribe Here</Form.Label>
                                        <Form.Control as="select"
                                            name="contentType" 
                                            multiple 
                                            placeholder="Content Type"
                                            onChange={this.handleChange}
                                            value={this.state.articleValues.contentType}
                                            required
                                        >
                                            <option value="1">Disease</option>
                                            <option value="2">Cures</option>
                                            <option value="3">All</option>
                                        </Form.Control>
                                    </Form.Group>
                                    {
                                        this.state.articleValues.contentType.indexOf('1') === -1
                                        ?   console.log('Disease not selected')
                                            : <Form.Group className="col-md-6 float-left">
                                            <Form.Label>All Diseases</Form.Label>
                                                <Form.Control as="select" name="diseaseConditionId" custom
                                                onChange={this.handleArticleChange} placeholder="Disease" required>
                                                    <option>Open this menu</option>
                                                    {this.state.speciality.map((i) => (  
                                                        <Options
                                                            value={i[0]}
                                                            name={i[1]}
                                                        />
                                                    ))}
                                            </Form.Control>
                                        </Form.Group>
                                    }
                                   {
                                        this.state.articleValues.contentType.indexOf('2') === -1
                                        ?   console.log('Disease not selected')
                                            : <Form.Group className="col-md-6 float-left">
                                            <Form.Label>All Diseases</Form.Label>
                                                <Form.Control as="select" name="diseaseConditionId" custom
                                                onChange={this.handleArticleChange} placeholder="Disease" required>
                                                    <option>Open this menu</option>
                                                    {this.state.speciality.map((i) => (  
                                                        <Options
                                                            value={i[0]}
                                                            name={i[1]}
                                                        />
                                                    ))}
                                            </Form.Control>
                                        </Form.Group>
                                    }

                                    {this.renderStatus()}
                                  
                                </Card.Body>
                            {/* </Accordion.Collapse> */}
                        </Card>

                        {/* Editor Accordion  */}
                
                            <Card>
                                    
                                
                                <Card.Footer>
                                    {/* <Button variant="primary" onClick={this.handleSave} className="mr-3">Save & Preview</Button> */}
                                    {
                                        this.state.ShowSubmitAlert
                                            ? <SubmitAlert ShowSubmitAlert={this.state.ShowSubmitAlert}/>
                                            : console.log('Submit ALert')
                                    }

                                    {
                                        this.state.ShowErrorAlert
                                            ? <SubmitError ShowErrorAlert={this.state.ShowErrorAlert}/>
                                            : console.log('')
                                    }
                                    {/* <FormControlLabel
                                        control={<Checkbox name="Terms" value="on" required/>}
                                        label="Accept Terms & Conditions"
                                        required
                                    /> */}
                                    
                                    <div>
                                        {/* <Button type="submit" variant="dark">Submit</Button> */}
                                        <button onClick={() => {this.putSubscribtion()}}>Submit</button>
                                    </div>
                                </Card.Footer>
                            </Card>
                            </Form>
                        </Accordion>
                        <Card className="pt-4 pb-4"><div id="articlePreview"></div></Card>
                    </Card>
                
                {/* SLIDESHOW */}
                <div className="slideshow"></div>
            </Container>
            <Footer/>
        </div>
        );
        }
    }}
    
    function Article(props) {
        
        return(
            <Card>
                {/* <Card.Header style={{backgroundColor: "#fff"}}> */}
                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="h5 py-3">
                       Author Details 👩‍⚕️
                    </Accordion.Toggle>
                {/* </Card.Header> */}
                <Accordion.Collapse eventKey="0">
            
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control as="select">
                                <option>Enter name</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Article type"></Form.Control>
                        </Form.Group>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }

    function Author(props){

        if(props.acPerm){      // Check if User in session
            return null;        
        }
        return(
            <Card>
                {/* <Card.Header style={{backgroundColor: "#fff"}}> */}
                    {/* <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className="h5 py-3">
                        Author Details 👩‍⚕️
                    </Accordion.Toggle> */}
                {/* </Card.Header> */}
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Author Name</Form.Label>
                                <Form.Control type="text" placeholder="Author name"></Form.Control>
                            </Form.Group>
                                {props.showAuthorButton}                
                        </Card.Body>
                    </Accordion.Collapse>
            </Card>
        );
    }
  
  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <Article />;
    }
    return null;
  }

  function CreateAccordian(props){
      return (
        <button onClick={props.onClick}>
          Create Author
        </button>
      );
  }

  function HideAccordian(props){
      return(
        <button onClick={props.onClick}>
            Hide Author
        </button>
      )
  }

// AUTHOR ACCORDIAN

function CreateAuthorAccordian(props) {
    const showAuthorAccordian = props.showAuthorAccordian;
    if(showAuthorAccordian){
        return (
                <Card>
                    {/* <Card.Header style={{backgroundColor: "#fff"}}> */}
                        {/* <Accordion.Toggle as={Card.Header} variant="link" eventKey="4" className="h5 py-3">
                            Create Author 👩‍⚕️
                        </Accordion.Toggle> */}
                    {/* </Card.Header> */}
                    <Accordion.Collapse eventKey="4">
                    
                        <Card.Body>
                            <Form.Group>
                                <Form.Control type="text" id="authorFN" name="authorFN" value={props.state.authorFN}
                                onChange={props.this.handleInputChange} placeholder="First Name"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorMN" name="authorMN" value={props.state.authorMN}
                                onChange={props.this.handleInputChange} placeholder="Middle Name"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorLN" name="authorLN" value={props.state.authorLN}
                                onChange={props.this.handleInputChange} placeholder="Last Name"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorTel" name="authorTel" value={props.state.authorTel} onChange={props.this.handleInputChange} placeholder="Phone Number"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorStatus" name="authorStatus" value={props.state.authorStatus} onChange={props.this.handleInputChange} placeholder="Status"></Form.Control>   
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorAddr" name="authorAddr" value={props.state.authorAddr} onChange={props.this.handleInputChange} placeholder="Address"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" id="authorEmail" name="authorEmail" value={props.state.authorEmail} onChange={props.this.handleInputChange} placeholder="Email"></Form.Control>
                            </Form.Group>
                            <Button type="submit" id="postAuthor" variant="dark">Save Author</Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
        );
    }
    return null;
}

// SHOW ALERT

function SubmitAlert(props) {
    console.log('Submit ALert', props.ShowSubmitAlert)
    if(props.ShowSubmitAlert) {
        return(
            <Alert className="bg-green">Article has been saved successfully!</Alert>
        );
    }
}

// Show Error Alert

function SubmitError(props) {
    console.log('Submit ALert', props.ShowErrorAlert)
    if(props.ShowErrorAlert) {
        return(
            <Alert className="bg-red">Some Error occured!</Alert>
        );
    }
}