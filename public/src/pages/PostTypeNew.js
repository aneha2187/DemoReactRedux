import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import PostFormContainer from '../containers/PostTypeFormContainer.js';

class PostsNew extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="postType_new"/>
        <PostFormContainer />
      </div>
    );
  }
}


export default PostsNew;
