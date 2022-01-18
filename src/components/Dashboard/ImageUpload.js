import React, { Component, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { backendHost } from '../../api-config';

export const ImageUpload = () => {
    const [imageType, setImageType] = useState('')
    const [id, setId] = useState('')
    const [image, setImage] = useState(null)   

    function uploadImage(){
        console.log(imageType, id)
        if(imageType === 'article'){
            // axios.post(`${backendHost}/`)
        } else if(imageType === 'doctor'){

        }
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            console.log(URL.createObjectURL(event.target.files[0]))
          setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    return(
        <>  
            
            <div className="upload-image">
                <div className="container mt-2">
                    <button className='btn btn-success w-25 h5 mr-3' onClick={(e)=> setImageType('doctor')}>Upload Doctor's Image</button>
                    <button className='btn btn-danger w-25 h5' onClick={(e)=> setImageType('article')}>Upload Article Image</button>
                    {
                        imageType?
                        <>
                        <div className="card my-3">
                            <div className="card-title h5 text-center py-2 border-bottom text-capitalize">Upload {imageType} Image</div>
                                <form onSubmit={uploadImage}>
                                    <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                                    <Form.Label className="text-capitalize">{imageType} ID</Form.Label>
                                    <Form.Control value={id} onChange={(e) => setId(e.target.value)} type="text"
                                    placeholder="ID here..." required/>
                                    </Form.Group>
                                    <div className="col-md-6 float-left" style={{zIndex: 2}}>
                                        <input type="file" onChange={onImageChange} className="filetype" />
                                        <img height="350px" src={image} alt="preview image" />
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                                    </div>
                                </form>

                            </div>
                            
                            </>
                        : null
                    }
                </div>
            </div>
        </>
    )
}