import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import api from '../../../services/apiService.js';
import ErrorContext from '../../Context/ErrorContext.js';
import Error from '../../Error/index.jsx';
import Post from '../../Post/index.jsx';

function Index() {

  const [posts, setPosts] = useState([]);
  const {error, setError} = useContext(ErrorContext);

  useEffect(() => {
    
    const getPosts = async(e) => {
      
      try{
        const {data} = await api.get("/post");
        setPosts(data.success);

      }
      catch(error){
        const {data} = error.response;
        setError(data.message);
      }
    }

    getPosts();
  
  }
  , []) //when a component mounted

  return (
    <>
      {error &&
      (
        <Error
        text={error}
        />
      )}
      
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