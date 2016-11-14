import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import MessageFormContainer from '../containers/MessageFormContainer.js';

class MessagesNew extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="messages_new"/>
        <MessageFormContainer />
      </div>
    );
  }
}


export default MessagesNew;
