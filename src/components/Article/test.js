import React, { Component } from 'react';
import { Button, Accordion, Card, Container, Form, Alert, variant } from 'react-bootstrap';

import Cookies from 'js-cookie';
import './article.css'
import editor from './Index'
import Carousel from './Carousel'
import EditorJs from 'react-editor-js';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleAuthorClick = this.handleAuthorClick.bind(this);
        // this.submitForm = this.submitForm.bind(this);
        // this.handleClick().bind(this)
        this.state = {
            // acPerm: Cookies.get('acPerm'),
            acPerm: Cookies.get('acPerm'),
            isLoggedIn: false,
            ac: '',
            showAuthorAccordian: false,
            ShowSubmitAlert: false,
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
                contentType: "",
                disclaimerId : 12,
                authById: "",
                copyId: 11,
                articleStatus: 1,
                winTitle : "",
                language : 1,
                articleContent : "",
            },
        };
    }

    saveArticle = () => {    
        editor.save().then((output) => {
            console.log('Article Data:', output)
            this.setState({ac: output})
            console.log("kjaxkajbxkajb",this.state.ac)



            let articleHTML = '';

    // RENDER DIFFERENT TYPES OF DATA
    
output.blocks.map(obj => {
switch (obj.type) {
    case 'paragraph':
    articleHTML += `<div class="ce-block">
     <div class="ce-block__content">
       <div class="ce-paragraph cdx-block">
        <p>${obj.data.text}</p>
      </div>
     </div>
    </div>\n`;
    break;
    case 'image':
    articleHTML += `<div class="ce-block">
     <div class="ce-block__content">
       <div class="cdx-block cdx-simple-image">
      <div class="cdx-simple-image__picture">
        <img src="${obj.data.url}" alt="${obj.data.caption}" />
      </div>
      <div class="text-center">
        <i>${obj.data.caption}</i>
      </div>
    </div>
  </div>
</div>\n`;
    break;
    case 'header':
    articleHTML += `<div class="ce-block">
     <div class="ce-block__content">
       <div class="ce-paragraph cdx-block">
         <h3>${obj.data.text}</h3>
       </div>
     </div>
    </div>\n`;
    break;
    case 'raw':
    articleHTML += `<div class="ce-block">
    <div class="ce-block__content">
          <div class="ce-code">
        <code>${obj.data.html}</code>
      </div>
    </div>
    </div>\n`;
    break;
    case 'code':
        articleHTML += `<div class="ce-block">
      <div class="ce-block__content">
       <div class="ce-code">
         <code>${obj.data.code}</code>
       </div>
  </div>
</div>\n`;
break;
case 'list':
if (obj.data.style === 'unordered') {
  const list = obj.data.items.map(item => {
    return `<li class="cdx-list__item">${item}</li>`;
  });
  articleHTML += `<div class="ce-block">
    <div class="ce-block__content">
      <div class="ce-paragraph cdx-block">
        <ul class="cdx-list--unordered">${list.join('')}</ul>
      </div>
      </div>
    </div>\n`;
} else {
  const list = obj.data.items.map(item => {
    return `<li class="cdx-list__item">${item}</li>`;
  });
  articleHTML += `<div class="ce-block">
    <div class="ce-block__content">
      <div class="ce-paragraph cdx-block">
        <ol class="cdx-list--ordered">${list}</ol>
      </div>
      </div>
    </div>\n`;
}
break;
case 'delimeter':
articleHTML += `<div class="ce-block ce-block--focused"><div class="ce-block__content"><div class="ce-delimiter cdx-block">***</div></div></div>\n`;
break;
case 'warning':
    articleHTML+= `<div class="ce-block">
    <div class="ce-block__content py-2 text-center" style="background-color: blanchedalmond">
        <strong> ${obj.data.title}: </strong><span>${obj.data.message}</span>
    </div>
    </div>\n`;
    break;
case 'embed':
    articleHTML += `<div class="ce-block ce-block--focused"><div class="ce-block__content"><div class="cdx-block embed-tool"><preloader class="embed-tool__preloader"><div class="embed-tool__url">${obj.data.source}</div></preloader>
    <iframe style="width:100%;" allowfullscreen="" src=${obj.data.embed} class="embed-tool__content" height="320" frameborder="0"></iframe>
    <div class="text-center">
        <i>${obj.data.caption}</i>
      </div>\n`;
      break;
case 'quote':
    articleHTML+= `<div style="text-align: ${obj.data.alignment}" class="ce-block ce-block--focused"><div class="ce-block__content"><h3 style="font-style: italic" class="cdx-block">"${obj.data.text}"</h3></div>
    <div class="text-center">
        <i>- ${obj.data.caption}</i>    
    </div>
</div>\n`;
    break;
default:
return '';
}
});


// PREVIEW ARTICLE

document.getElementById('articlePreview').innerHTML=articleHTML;


        }).catch((error)=>{
            console.log("Saving Failed", error)
        });
    }

    handleSubmit() {
        this.setState({ShowSubmitAlert: true});
    }

    handleAuthorClick() {
        this.setState({showAuthorAccordian: true});
    }

    handleAuthorHideClick() {
        this.setState({showAuthorAccordian: false})
    }

    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }

    // ARTICLE FORM SUBMIT

    submitArticleForm = async e => {
        e.preventDefault();
        console.log(JSON.parse(JSON.stringify(this.state.articleValues)))
        this.setState({ isSubmitting: true });

        const res = await fetch("/content?cmd=createArticle", {
            method: "POST",
            body: `title=${this.state.articleValues.title}&language=${this.state.articleValues.language}&friendlyName=${this.state.articleValues.friendlyName}&contentType=${this.state.articleValues.contentType}&disclaimerId=${this.state.articleValues.disclaimerId}&authById=${this.state.articleValues.authById}&copyId=${this.state.articleValues.copyId}&articleStatus=${this.state.articleValues.articleStatus}&winTitle=${this.state.articleValues.winTitle}&articleContent=${JSON.stringify(this.state.ac)}`,
            headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        this.setState({ isSubmitting: false });
        const data = await res.text();
        !data.hasOwnProperty("error")
        ? this.setState({ message: data.success })
        : this.setState({ message: data.error, isError: true });

        this.handleSubmit();
        setTimeout(() => this.setState({
            isError: false,
            message: "",
            articleValues: { 
                title: '', 
                language: '',
                friendlyName: '',
                contentType: '',
            }
            }), 1600);
    }

    handleArticleChange = e => 
        this.setState({
            articleValues: { ...this.state.articleValues, [e.target.name]: e.target.value }
        });

    submitForm = async e => {
        e.preventDefault();
        console.log(JSON.parse(JSON.stringify(this.state.values)))
        this.setState({ isSubmitting: true });

        const res = await fetch("/author?cmd=createAuthor", {
            method: "POST",
            body: `authorFN=${this.state.values.authorFN}&authorMN=${this.state.values.authorMN}&authorLN=${this.state.values.authorLN}&authorTel=${this.state.values.authorTel}&authorStatus=${this.state.values.authorStatus}&authorAddr=${this.state.values.authorAddr}&authorEmail=${this.state.values.authorEmail}`,
            headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        this.setState({ isSubmitting: false });
        const data = await res.text();
        !data.hasOwnProperty("error")
        ? this.setState({ message: data.success })
        : this.setState({ message: data.error, isError: true });

        setTimeout(
        () =>
            this.setState({
            isError: false,
            message: "",
            values: { email: "", password: "" }
            }),
        1600
        );
    };

    handleInputChange = e =>
    this.setState({
      values: { ...this.state.values, [e.target.name]: e.target.value }
    });

    onStatusChange(e) {
        this.setState({ articleStatus: e.target.value })
    }
    onLanguageChange(e) {
        this.setState({ language: e.target.value })
    }

    render() {
        console.log("Article Status:"+ this.state.articleValues.articleStatus)
        console.log("Article language:"+ this.state.articleValues.language)
        console.log("Account Session:"+ this.state.acPerm)
        const isLoggedIn = this.state.isLoggedIn;
        const showAuthorAccordian = this.state.showAuthorAccordian;
        const acPerm = this.state.acPerm;
        let button;
        let showAuthorButton;


        if(showAuthorAccordian) {
            showAuthorButton = <HideAccordian onClick={this.handleAuthorClick}/>
        } else {
            showAuthorButton = <CreateAccordian className="btn bg-dark" onClick={this.handleAuthorClick}/>
            console.log(showAuthorButton)
        }

        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

    
    return (
        <div>
            <Carousel/>
                <Container>  
                    <Card className="mainCard" >
                        <Card.Header className="mainTitle text-center h3 py-3">ARTICLE</Card.Header>
                        <Accordion>
                        <Greeting isLoggedIn={isLoggedIn} />

                        {/* AUTHOR ACCORDIAN */}

                        <Author acPerm={this.state.acPerm} showAuthorButton={showAuthorButton}/>

                        <Form onSubmit={this.submitForm}>
                            <CreateAuthorAccordian showAuthorAccordian={showAuthorAccordian} this={this} state={this.state.values}/>
                        </Form>

                         {/* Article Details  */}
                        <authorAccordian/>
                        <Form onSubmit = {this.submitArticleForm}>
                        <Card>
                            {/* <Card.Header style={{backgroundColor: "white"}}> */}
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey="2" className="bg-black h5 py-3">
                                Article Details
                                </Accordion.Toggle>
                            {/* </Card.Header> */}
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <Form.Group className="col-md-12 float-left">
                                        <Form.Label>Article Title</Form.Label>
                                        <Form.Control type="text" name="title" value={this.state.values.title}
                                        onChange={this.handleArticleChange} placeholder="Article Title" />
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Article Display Name</Form.Label>
                                        <Form.Control type="text" name="friendlyName" value={this.state.values.friendlyName}
                                        onChange={this.handleArticleChange} placeholder="Friendly Name" />
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Content Type</Form.Label>
                                        <Form.Control type="text" name="contentType" value={this.state.values.contentType}
                                        onChange={this.handleArticleChange} placeholder="Content Type" />
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Disclaimer ID</Form.Label>
                                        <Form.Control as="select" name="disclaimer" custom onChange={this.handleArticleChange}>
                                            <option value="12">Temporary</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Copyright ID</Form.Label>
                                        <Form.Control as="select" name="copyleft" custom onChange={this.handleArticleChange}>
                                            <option value="11">Temporary</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Article Status</Form.Label>
                                        <Form.Control as="select" name="articleStatus" custom onChange={this.handleArticleChange}>
                                            <option value="1">Work in Progress</option>
                                            <option value="2">Review</option>
                                            <option value="3">Publish</option>
                                        </Form.Control>
                                    </Form.Group>
                                    
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Language</Form.Label>
                                        <Form.Control as="select" name="language" custom onChange={this.handleArticleChange}>
                                            <option value="1">Hindi</option>
                                            <option value="2">English</option>
                                            <option value="3">Chinese</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Author By ID</Form.Label>
                                        <Form.Control type="text" name="authById" value={this.state.values.authById}
                                        onChange={this.handleArticleChange} placeholder="Author By ID" />
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Win Title</Form.Label>
                                        <Form.Control type="text" name="winTitle" value={this.state.values.winTitle}
                                        onChange={this.handleArticleChange} placeholder="Win Title" />
                                    </Form.Group>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        {/* Editor Accordion  */}
                
                            <Card>
                                {/* <Card.Header style={{backgroundColor: "white"}}> */}
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="3" className="h5 py-3">
                                    Write Article Here 📝
                                    </Accordion.Toggle>
                                {/* </Card.Header> */}
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                    {/* <div id="editorjs"></div> */}
                                    <EditorJs data="" />
                                    </Card.Body>
                                </Accordion.Collapse>
                                <Card.Footer>
                                    {/* <Form.Group controlId="formBasicCheckbox"> */}
                                        {/* <Form.Check type="checkbox" label="Check me out" />
                                    </Form.Group> */}

                                    {/* <submitAlert ShowSubmitAlert={this.state.ShowSubmitAlert} /> */}

                                    <Button onClick={this.saveArticle} variant="primary" className="mr-3">Save & Preview</Button>
                                    <Button onClick={this.submitArticleForm} variant="secondary">Submit</Button>
                                </Card.Footer>
                            </Card>
                            </Form>
                        </Accordion>
                        <Card className="pt-4 pb-4"><div id="articlePreview"></div></Card>
                    </Card>
                    {/* {button} */}
                
                {/* SLIDESHOW */}
                <div className="slideshow">
                    {/* <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li> */}
                </div>
            </Container>
        </div>
        );
        }
    }
    
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
        console.log("props acperm:"+props.acPerm)
        console.log("props showAUthoracc:"+ props.showAuthorButton)
        return(
            <Card>
                {/* <Card.Header style={{backgroundColor: "#fff"}}> */}
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className="h5 py-3">
                        Author Details 👩‍⚕️
                    </Accordion.Toggle>
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

  function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        Login
      </button>
    );
  }
  
  function LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        Logout
      </button>
    );
  }

// AUTHOR ACCORDIAN

function CreateAuthorAccordian(props) {
    const showAuthorAccordian = props.showAuthorAccordian;
    if(showAuthorAccordian){
        console.log("STATE:" + JSON.stringify(props.state))
        return (
                <Card>
                    {/* <Card.Header style={{backgroundColor: "#fff"}}> */}
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="4" className="h5 py-3">
                            Create Author 👩‍⚕️
                        </Accordion.Toggle>
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

function submitAlert(props) {
    const ShowSubmitAlert = props.ShowSubmitAlert;
    if(ShowSubmitAlert) {
        <Alert className="bg-green">Article has been saved successfully!</Alert>
    }
}