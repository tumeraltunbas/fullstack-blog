import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../../services/apiService';
import ErrorContext from '../../Context/ErrorContext';
import "./PostDetails.modules.css";
import moment from "moment";


function PostDetailsPage(props) {

    const [post, setPost] = useState({});
    const {error, setError} = useContext(ErrorContext);

    const {id} = useParams();

    useEffect(() => {

        
        const getPost = async() => {
            
            try{
                const {data} = await api.get(`/post/${id}`);
                
                setPost(data.post);


            }
            catch(error){
                const {data} = error.response;
                setError(data.message);
            }
        

        } 

        getPost();

    }, [])


  return (
    <>
    
        <div>
            <h1 className="postTitle">{post.title}</h1>

            <p className="postAuthor">{post.user && `@${post.user.username}`} | {moment(post.createdAt).format("HH:MM")} • {moment(post.createdAt).format("YYYY.MM.D")}</p>            

            <h3 className="postSummary">{post.summary}</h3>

            <img className="postImg" src={`http://localhost:8080/${post.image}`} alt="" />

            <div className="postContent" dangerouslySetInnerHTML={{__html: post.content}}>

            </div>

        </div>
    </>
  )
}

export default PostDetailsPage