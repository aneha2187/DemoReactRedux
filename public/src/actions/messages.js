import axios from 'axios';

//Post list
export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';
export const RESET_MESSAGES = 'RESET_MESSAGES';

//Create new post
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';
export const CREATE_MESSAGE_FAILURE = 'CREATE_MESSAGE_FAILURE';
export const RESET_NEW_MESSAGE = 'RESET_NEW_MESSAGE';

//Validate post fields like Title, Categries on the server
export const VALIDATE_MESSAGE_FIELDS = 'VALIDATE_MESSAGE_FIELDS';
export const VALIDATE_MESSAGE_FIELDS_SUCCESS = 'VALIDATE_MESSAGE_FIELDS_SUCCESS';
export const VALIDATE_MESSAGE_FIELDS_FAILURE = 'VALIDATE_MESSAGE_FIELDS_FAILURE';
export const RESET_MESSAGE_FIELDS = 'RESET_MESSAGE_FIELDS';

//Fetch post
export const FETCH_MESSAGE = 'FETCH_MESSAGE';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';
export const RESET_ACTIVE_MESSAGE = 'RESET_ACTIVE_MESSAGE';

//Delete post
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
export const DELETE_MESSAGE_FAILURE = 'DELETE_MESSAGE_FAILURE';
export const RESET_DELETED_MESSAGE = 'RESET_DELETED_MESSAGE';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
export function fetchMessages() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/messages`,
    headers: []
  });

  return {
    type: FETCH_MESSAGES,
    payload: request
  };
}

export function fetchMessagesSuccess(messages) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: messages
  };
}

export function fetchMessagesFailure(error) {
  return {
    type: FETCH_MESSAGES_FAILURE,
    payload: error
  };
}

export function validateMessageFields(props) {
  //note: we cant have /posts/validateFields because it'll match /posts/:id path!
  const request = axios.post(`${ROOT_URL}/messages/validate/fields`, props);

  return {
    type: VALIDATE_MESSAGE_FIELDS,
    payload: request
  };
}

export function validateMessageFieldsSuccess() {
  return {
    type: VALIDATE_MESSAGE_FIELDS_SUCCESS
  };
}

export function validateMessageFieldsFailure(error) {
  return {
    type: VALIDATE_MESSAGE_FIELDS_FAILURE,
    payload: error
  };
}

export function resetMessageFields() {
  return {
    type: RESET_MESSAGE_FIELDS
  }
};


export function createMessage(props, tokenFromStorage) {
  //const request = axios.post(`${ROOT_URL}/posts`, props);
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/messages`,
   headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: CREATE_MESSAGE,
    payload: request
  };
}

export function createMessageSuccess(newMessage) {
  return {
    type: CREATE_MESSAGE_SUCCESS,
    payload: newMessage
  };
}

export function createMessageFailure(error) {
  return {
    type: CREATE_MESSAGE_FAILURE,
    payload: error
  };
}

export function resetNewMessage() {
  return {
    type: RESET_NEW_MESSAGE
  }
};

export function resetDeletedMessage() {
  return {
    type: RESET_DELETED_MESSAGE
  }
};

export function fetchMessage(id) {
  const request = axios.get(`${ROOT_URL}/messages/${id}`);

  return {
    type: FETCH_MESSAGE,
    payload: request
  };
}


export function fetchMessageSuccess(activeMessage) {
  return {
    type: FETCH_MESSAGE_SUCCESS,
    payload: activeMessage
  };
}

export function fetchMessageFailure(error) {
  return {
    type: FETCH_MESSAGE_FAILURE,
    payload: error
  };
}

export function resetActiveMessage() {
  return {
    type: RESET_ACTIVE_MESSAGE
  }
};

export function deleteMessage(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/messages/${id}`,
   headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });
  return {
    type: DELETE_MESSAGE,
    payload: request
  };
}

export function deleteMessageSuccess(deletedMessage) {
  return {
    type: DELETE_MESSAGE_SUCCESS,
    payload: deletedMessage
  };
}

export function deleteMessageFailure(response) {
  return {
    type: DELETE_MESSAGE_FAILURE,
    payload: response
  };
}