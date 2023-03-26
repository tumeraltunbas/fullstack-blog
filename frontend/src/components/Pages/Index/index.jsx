import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../../services/apiService.js';
import Post from '../../Post/index.jsx';

function Index() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const getPosts = async(e) => {
      
      const {data} = await api.get("/post");
      
      if(data.success === true){
        
        setPosts(data.success);
      }
      else{
        alert("An error occured when we try to pull posts from database");
      }
    }

    getPosts();
  
  }
  , []) //when a component mounted

  return (
    <>
      {
        posts.map((p, index) => {
          return <Post 
          key={index}
          title={p.title}
          image={p.image}
          summary={p.title}
          user={p.user}
          createdAt={p.createdAt}
          />
        })
      }
    </>
    )
}

export default Index