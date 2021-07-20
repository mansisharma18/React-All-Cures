import React, { Component } from 'react';
import { Button, Accordion, Card, Container, Form, Alert } from 'react-bootstrap';

import Cookies from 'js-cookie';
import './article.css'
import Carousel from './Carousel'
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './tools';
import Options from './Options';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleAuthorClick = this.handleAuthorClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.instanceRef = React.createRef();
        this.handleSave = this.handleSave.bind(this)
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
                diseaseConditionId: 1
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

    handleChange (e) {
        this.setState({
            articleValues: { ...this.state.articleValues, [e.target.name]:  Array.from(e.target.selectedOptions, (item) => item.value) }
        });
        console.log(this.state.articleValues.contentType)
    }
    
    componentDidMount(){
        Promise.all([

            fetch('/article/all/table/languages').then(res => res.json()),
            fetch('/article/all/table/author').then(res => res.json()),
            fetch('/article/all/table/disclaimer').then(res => res.json()),
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

    submitArticleForm = async e => {
        e.preventDefault();
        this.setState({ isSubmitting: true });

        const res = await fetch("/content?cmd=createArticle", {
            method: "POST",
            body: `title=${this.state.articleValues.title}&language=${this.state.articleValues.language}&friendlyName=${this.state.articleValues.friendlyName}&contentType=${this.state.articleValues.contentType}&disclaimerId=${this.state.articleValues.disclaimerId}&authById=${this.state.articleValues.authById}&copyId=${this.state.articleValues.copyId}&articleStatus=${this.state.articleValues.articleStatus}&winTitle=${this.state.articleValues.winTitle}&countryId=${this.state.articleValues.countryId}&diseaseConditionId=${this.state.articleValues.diseaseConditionId}&articleContent=${JSON.stringify(this.state.ac)}`,
            headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        this.setState({ isSubmitting: false });
        const data = await res.text();
        console.log('Data', data)
        !data.hasOwnProperty("error")
        ? this.setState({ message: data.success })
        : this.setState({ message: data.error, isError: true });
        if(res.status === 200){
            this.handleSubmit();
        } else {
            this.handleErrorSubmit();
        }
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

    handleArticleChange = e => {
        this.setState({
            articleValues: { ...this.state.articleValues, [e.target.name]: e.target.value }
        });
        console.log(e.target.name + e.target.value)
    }

    submitForm = async e => {
        e.preventDefault();
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

    focusText(){
      this.instanceRef.current.focus();
    }

    async handleSave() {
      const savedData = await this.instanceRef.save();
        console.log('Saved Data: ', savedData)
      this.setState({ac: savedData})

      let articleHTML = '';

    // RENDER DIFFERENT TYPES OF DATA
    
savedData.blocks.map(obj => {
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
    case 'table':
        obj.data.content.map((i) => (
            articleHTML += `
            <div class="container">
            <table class="tc-table text-center">
                            <tbody>
                                <tr style="border: 1px solid #ebebeb">
                                    <td class="tc-table__cell">
                                        <div class="tc-table__area">
                                            <div class="text-center" contenteditable="true">${i[0]}<br></div>
                                        </div>
                                    </td>
                                    <td class="tc-table__cell">
                                        <div class="tc-table__area">
                                            <div class="text-center" contenteditable="true">${i[1]}</div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                            `
        ))
        break;
    case 'simpleImage':
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
case 'delimiter':
articleHTML += `<h1 class="text-center my-2">***</h1>\n`;
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
document.getElementById('articlePreview').innerHTML=articleHTML;

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
                        {/* <AuthorAccordian/> */}
                        <Form onSubmit = {this.submitArticleForm}>
                        <Card>
                            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2" className="bg-black h5 py-3">
                                Article Details
                            </Accordion.Toggle>
                            {/* </Card.Header> */}
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    <Form.Group className="col-md-12 float-left">
                                        <Form.Label>Article Title</Form.Label>
                                        <Form.Control type="text" name="title" value={this.state.values.title}
                                        onChange={this.handleArticleChange} placeholder="Article Title" required aria-required="true"/>
                                    </Form.Group>
                                    <Form.Group className="col-md-12 float-left">
                                        <Form.Label>Article Display Name</Form.Label>
                                        <Form.Control type="text" name="friendlyName" value={this.state.values.friendlyName}
                                        onChange={this.handleArticleChange} placeholder="Friendly Name" required/>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Content Type</Form.Label>
                                        <Form.Control as="select"
                                            name="contentType" 
                                            multiple 
                                            placeholder="Content Type"
                                            onChange={this.handleChange}
                                            value={this.state.articleValues.contentType}
                                            required
                                        >
                                            <option value="1">Disease</option>
                                            <option value="2">Treatment</option>
                                            <option value="3">Specialities</option>
                                        </Form.Control>
                                    </Form.Group>
                                    {
                                        this.state.articleValues.contentType.indexOf('2') === -1
                                        ?   console.log('Treatment not selected')
                                            : <Form.Group className="col-md-6 float-left">
                                            <Form.Label>Country</Form.Label>
                                                <Form.Control as="select" name="countryId" custom
                                                onChange={this.handleArticleChange} placeholder="Country" required>
                                                    {this.state.country.map((i) => (  
                                                        <Options
                                                            value={i[0]}
                                                            name={i[1]}
                                                        />
                                                    ))}
                                            </Form.Control>
                                        </Form.Group>
                                    }
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Disclaimer ID</Form.Label>
                                        <Form.Control as="select" name="disclaimer" custom onChange={this.handleArticleChange} required>
                                            <option value="12">Temporary</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Copyright ID</Form.Label>
                                        <Form.Control as="select" name="copyId" custom onChange={this.handleArticleChange} required>
                                            <option value="11">Temporary</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Article Status</Form.Label>
                                        <Form.Control as="select" name="articleStatus" custom onChange={this.handleArticleChange} required>
                                            <option value="1">Work in Progress</option>
                                            <option value="2">Review</option>
                                            <option value="3">Publish</option>
                                        </Form.Control>
                                    </Form.Group>
                                    
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Language</Form.Label>
                                        <Form.Control as="select" name="language" custom onChange={this.handleArticleChange} required>
                                            {this.state.language.map((i) => (  
                                                <Options
                                                    value={i[0]}
                                                    name={i[1]}
                                                />
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Disease and Conditions</Form.Label>
                                        <Form.Control as="select" name="diseaseConditionId" custom onChange={this.handleArticleChange} required>
                                            {this.state.speciality.map((i) => (  
                                                <Options
                                                    value={i[0]}
                                                    name={i[1]}
                                                />
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Author By ID</Form.Label>
                                        <Form.Control as="select" name="authById" custom value={this.state.values.authById}
                                        onChange={this.handleArticleChange} required>
                                            {this.state.author.map((i) => (
                                                <Options
                                                value={i[0]}
                                                name={i[1]}
                                                />
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-md-6 float-left">
                                        <Form.Label>Win Title</Form.Label>
                                        <Form.Control required type="text" name="winTitle" value={this.state.values.winTitle}
                                        onChange={this.handleArticleChange} placeholder="Win Title" />
                                    </Form.Group>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        {/* Editor Accordion  */}
                
                            <Card>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="3" className="h5 py-3">
                                    Write Article Here 📝
                                    </Accordion.Toggle>
                                {/* </Card.Header> */}
                                <Accordion.Collapse eventKey="3">
                                    <Card.Body>
                                    <EditorJs data=""                                    
                                        tools={EDITOR_JS_TOOLS}
                                        onChange={this.handleSave}
                                        onClick={this.focusText}
                                        instanceRef={instance => this.instanceRef = instance}
                                    />
                                    </Card.Body>
                                </Accordion.Collapse>
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

                                    <Button type="submit" variant="dark">Submit</Button>
                                </Card.Footer>
                            </Card>
                            </Form>
                        </Accordion>
                        <Card className="pt-4 pb-4"><div id="articlePreview"></div></Card>
                    </Card>
                
                {/* SLIDESHOW */}
                <div className="slideshow"></div>
            </Container>
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

// AUTHOR ACCORDIAN

function CreateAuthorAccordian(props) {
    const showAuthorAccordian = props.showAuthorAccordian;
    if(showAuthorAccordian){
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