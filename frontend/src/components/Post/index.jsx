import React from "react";
import "./Post.modules.css";
import Moment from "moment";

function Post(props) {
  return (

    <div className="post">
      <img
        src={props.image}
        alt=""
      />
      <div className="postInfo">
        <h2>{props.title}</h2>
        <p className="author">
          {props.user.username} - {Moment(props.createdAt).format("Y/M/D H:M ")} 
        </p>
        <p>
          {props.summary}
        </p>
      </div>
    </div>
  );
}

export default Post;
