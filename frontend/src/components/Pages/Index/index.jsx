import axios from 'axios';
import React, { useEffect, useState } from 'react';
import api from '../../../services/apiService.js';
import Post from '../../Post/index.jsx';

function Index() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    api.get("/post")
    // .then(res => {

    //   const {posts} = res.data;

    //   if(res.data.success === true){
    //     setPosts(posts);
    //   }
    // })
    .then(res => res.data)
    .then(data => data.posts)
    .then(posts => setPosts(posts))
    .catch(err => console.log(err));
  
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