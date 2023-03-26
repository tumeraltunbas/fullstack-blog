import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../../services/apiService';
import ErrorContext from '../../Context/ErrorContext';
import "./PostDetails.modules.css";

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

            <p className="postAuthor">{post.user && `@${post.user.username}`} | 09:25 • 22.03.2023</p>
            
            <h3 className="postSummary">{post.summary}</h3>

            <img className="postImg" src="https://techcrunch.com/wp-content/uploads/2023/03/GettyImages-1135378306.jpg?w=1390&crop=1" alt="" />
            {/* <img className="postImg" src={`http://localhost:8080/public/${post.image}`} alt="" /> */}

            <div className="postContent" dangerouslySetInnerHTML={{__html: post.content}}>

            </div>


        </div>
    </>
  )
}

export default PostDetailsPage