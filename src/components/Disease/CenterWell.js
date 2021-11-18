import { parseHTML } from 'jquery';
import React from 'react';
import parse from 'html-react-parser';

const CenterWell = ({pageTitle, imageUrl, content, type, text, title, message, source, embed, caption, alignment, url, item}) =>{
    var list;
    var rows;
    var textContent;
    if(typeof(text) == "string"){
        textContent = parse(text)
    }
    // console.log('TEXTTTTTTTT: ', typeof(text) == "string"?parse(text): 'null' + '/n')
    if(content){
        rows = content.map((row) => {
            return `<tr style="border: 1px solid #ebebeb" className="text-center">${row.reduce(
                (acc, cell) => acc + `<td className="tc-table__cell text-center p-2" style="border: 1px solid #ebebeb; text-align: center;
                padding: 0.6rem;">${cell}</td>`,""
            )}</tr>`;
        });
    }
    
    console.log(rows)
    return(
        <div>
            {
                {
                    'header': <div class="ce-block py-2">
                                <div class="ce-block__content">
                                    <div class="ce-paragraph cdx-block">
                                        <h3 style={{fontSize: "2rem"}}>{text}</h3>
                                    </div>
                                </div>
                            </div>,
                    'paragraph': <div class="ce-block">
                                    <div class="ce-block__content">
                                        <div class="ce-paragraph cdx-block">
                                            <p>{textContent}</p>
                                        </div>
                                    </div>
                                </div>,
                    'warning': <div class="ce-block p-1">
                                    <div class="ce-block__content p-3" style={{border: "1px solid black", borderRadius: "0.35rem", background: '#f5f09f'}}>
                                        <strong><span style={{color: 'red', fontSize: '1.2rem'}}>⚠</span> {title}: </strong><span>{message}</span>
                                    </div>
                                </div>,
                    'delimiter': <h1 className="text-center fw-bold pt-3" id="delimiter">* * *</h1>,
                    'embed':  <div class="ce-block ce-block--focused">
                                    <div class="ce-block__content">
                                        <div class="cdx-block embed-tool">
                                            <preloader class="embed-tool__preloader"><div class="embed-tool__url">{source}</div></preloader>
                                            <iframe title="embed-title" allowfullscreen="" src={embed} class="embed-tool__content" height="320" frameborder="0"></iframe>
                                        </div>
                                        <div class="text-center">
                                            <i>{caption}</i>
                                        </div>
                                    </div>
                                </div>,
                    'quote': <div style={{textAlign: {alignment}}} class="ce-block ce-block--focused my-3">
                                <div class="ce-block__content">
                                    <h3 style={{fontStyle: 'italic', fontSize: '1.2rem'}} class="cdx-block">"{text}"</h3></div>
                                <div class="text-center">
                                    <i>- {caption}</i>    
                                </div>
                            </div>,
                    'image': <div className="ce-block">
                                <div className="ce-block__content">
                                    <div className="cdx-block cdx-simple-image">
                                        <div className="cdx-simple-image__picture">
                                            <img src={imageUrl} alt={caption} />
                                        </div>
                                        <div className="text-center">
                                            <i>{caption}</i>
                                        </div>
                                    </div>
                                </div>
                            </div>,
                    // 'image' : 
                    'list': <div class="ce-block">
                                <div class="ce-block__content">
                                    <div class="ce-paragraph cdx-block">
                                        {/* <ul class="cdx-list--unordered"> */}
                                            {   
                                                item ?
                                                    list = item.map((i) =>( 
                                                        <li class="cdx-list__item">{i}</li>
                                                    ))
                                                : null
                                            }
                                        {/* </ul> */}
                                    </div>
                                </div>
                            </div>,
                    'table':    <table className="tc-table text-center">
                                    <tbody>
                                        {
                                            typeof(rows) == "object"?
                                            rows.map(r => (
                                                parse(r)
                                            ))
                                            : null
                                        }
                                    </tbody>
                                </table>,
                    'simpleImage':  <div className="ce-block">
                    <div className="ce-block__content">
                        <div className="cdx-block cdx-simple-image">
                            <div className="cdx-simple-image__picture">
                                <img src={url} alt={caption} />
                            </div>
                            <div className="text-center">
                                <i>{caption}</i>
                            </div>
                        </div>
                    </div>
                </div>,
                }[type]
            }
        </div>
    )
} 

export default CenterWell; 