import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/apiService';
import Button from '../../Button';
import ErrorContext from '../../Context/ErrorContext';
import Error from '../../Error';
import Input from '../../Input';

function EditPostPage() {

    const [title, setTitle] = useState();
    const [summary, setSummary] = useState();
    const [content, setContent] = useState();
    const {error, setError} = useContext(ErrorContext);

    const {id} = useParams();

    const navigate = useNavigate();

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
          
            ['clean']                                         // remove formatting button
          ]
      }
      
  
    const formats = [
        'font',
        'size',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'align',
        'color', 'background'
    ];

    useEffect(() => {

        const getPost = async() => {
            
            const {data} = await api.get(`/post/${id}`);

            setTitle(data.post.title);
            setContent(data.post.content);
            setSummary(data.post.summary);
        }
        
        getPost();


    }, [])


    
    const editPost = async(e) => {
        e.preventDefault();

        try{

            await api.put(`post/${id}`, {
                title:title,
                summary:summary,
                content:content,
            });

            navigate(`/post/${id}`);
        }
        catch(error){
            const {data} = error.response;
            setError(data.message);
        }
    }

  return (
    
    <form action="" onSubmit={editPost} className="postForm">
        <h1>Edit post!</h1>


        {error &&
      (
        <Error
        text={error}
        />
      )}

        
        <Input
        type="title" 
        placeholder='Title'
        className="postInput"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />

        <Input 
        type="summary" 
        placeholder='Summary'
        className="postInput"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        />
        
        <ReactQuill
        modules={modules}
        formats={formats}
        value={content}
        onChange={(newValue) => setContent(newValue)}
        style={{
            width:"70%",
            margin:"auto", 
        }}/>

        <Button
        type="submit"
        text="Edit"
        style={{
            backgroundColor:"black", 
            color:"white", 
            width:"70%", 
            height:"4vh", 
            borderRadius:"5px", 
            marginTop:"3vh", 
            cursor:"pointer",
            marginBottom: "5vh"
        }}
        />
    </form>

    )
}

export default EditPostPage