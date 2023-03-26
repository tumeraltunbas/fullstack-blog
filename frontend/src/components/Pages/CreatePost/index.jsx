import React, { useContext, useState } from 'react'
import Button from '../../Button';
import Input from '../../Input';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import api from '../../../services/apiService';
import ErrorContext from '../../Context/ErrorContext.js';
import { useNavigate } from 'react-router-dom';
import Error from '../../Error';
import "./CreatePost.modules.css";

function CreatePostPage() {

    const [title, setTitle] = useState();
    const [summary, setSummary] = useState();
    const [files, setFiles] = useState();
    const [content, setContent] = useState();

    const {error, setError} = useContext(ErrorContext);

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


    const createPost = async(e) => {
      e.preventDefault();

      if(!title || !summary || !content || !files){
        setError("You have to provide all inputs");
        return;
      }

      try{
        const formData = new FormData();
        
        formData.append("title", title);
        formData.append("summary", summary);
        formData.append("content", content);
        formData.append("file", files);
        
        await api.post("/post/create", formData);

        navigate("/");
      }
      catch(error){
        
        const {data} = error.response;
        setError(data.message);
      
      }
    }

  return (
    
    <form action="" onSubmit={createPost} className="postForm">
        <h1>Create new post!</h1>


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
        
        <Input 
        type="file"
        name="file"
        className="postInput"
        onChange={(e) => setFiles(e.target.files[0])}
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
        text="Create new post"
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

export default CreatePostPage