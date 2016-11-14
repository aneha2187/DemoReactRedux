import axios from 'axios';

//Post list
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';
export const RESET_POST = 'RESET_POST';

//Create new post
export const CREATE_POSTTYPE = 'CREATE_POSTTYPE';
export const CREATE_POSTTYPE_SUCCESS = 'CREATE_POSTTYPE_SUCCESS';
export const CREATE_POSTTYPE_FAILURE = 'CREATE_POSTTYPE_FAILURE';
export const RESET_NEW_POSTTYPE = 'RESET_NEW_POSTTYPE';

//Validate post fields like Title, Categries on the server
export const VALIDATE_POSTTYPE_FIELDS = 'VALIDATE_POSTTYPE_FIELDS';
export const VALIDATE_POSTTYPE_FIELDS_SUCCESS = 'VALIDATE_POSTTYPE_FIELDS_SUCCESS';
export const VALIDATE_POSTTYPE_FIELDS_FAILURE = 'VALIDATE_POSTTYPE_FIELDS_FAILURE';
export const RESET_POSTTYPE_FIELDS = 'RESET_POSTTYPE_FIELDS';

//Fetch post
export const FETCH_POSTTYPE = 'FETCH_POSTTYPE';
export const FETCH_POSTTYPE_SUCCESS = 'FETCH_POSTTYPE_SUCCESS';
export const FETCH_POSTTYPE_FAILURE = 'FETCH_POSTTYPE_FAILURE';
export const RESET_ACTIVE_POSTTYPE = 'RESET_ACTIVE_POSTTYPE';

//Delete post
export const DELETE_POSTTYPE = 'DELETE_POSTTYPE';
export const DELETE_POSTTYPE_SUCCESS = 'DELETE_POSTTYPE_SUCCESS';
export const DELETE_POSTTYPE_FAILURE = 'DELETE_POSTTYPE_FAILURE';
export const RESET_DELETED_POSTTYPE = 'RESET_DELETED_POSTTYPE';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
export function fetchPost() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/post`,
    headers: []
  });

  return {
    type: FETCH_POSTTYPE,
    payload: request
  };
}

export function fetchPostSuccess(post) {
  return {
    type: FETCH_POST_SUCCESS,
    payload: post
  };
}

export function fetchPostFailure(error) {
  return {
    type: FETCH_POST_FAILURE,
    payload: error
  };
}

export function validatePostTypeFields(props) {
  //note: we cant have /postType/validateFields because it'll match /postType/:id path!
  const request = axios.post(`${ROOT_URL}/postType/validate/fields`, props);

  return {
    type: VALIDATE_POSTTYPE_FIELDS,
    payload: request
  };
}

export function validatePostTypeFieldsSuccess() {
  return {
    type: VALIDATE_POSTTYPE_FIELDS_SUCCESS
  };
}

export function validatePostTypeFieldsFailure(error) {
  return {
    type: VALIDATE_POSTTYPE_FIELDS_FAILURE,
    payload: error
  };
}

export function resetPostTypeFields() {
  return {
    type: RESET_POSTTYPE_FIELDS
  }
};


export function createPostType(props, tokenFromStorage) {
  //const request = axios.post(`${ROOT_URL}/postType`, props);
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/postType`,
   headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: CREATE_POSTTYPE,
    payload: request
  };
}

export function createPostTypeSuccess(newPostType) {
  return {
    type: CREATE_POSTTYPE_SUCCESS,
    payload: newPostType
  };
}

export function createPostTypeFailure(error) {
  return {
    type: CREATE_POSTTYPE_FAILURE,
    payload: error
  };
}

export function resetNewPostType() {
  return {
    type: RESET_NEW_POSTTYPE
  }
};

export function resetDeletedPostType() {
  return {
    type: RESET_DELETED_POSTTYPE
  }
};

export function fetchPostType(id) {
  const request = axios.get(`${ROOT_URL}/postType/${id}`);

  return {
    type: FETCH_POSTTYPE,
    payload: request
  };
}


export function fetchPostTypeSuccess(activePostType) {
  return {
    type: FETCH_POSTTYPE_SUCCESS,
    payload: activePostType
  };
}

export function fetchPostTypeFailure(error) {
  return {
    type: FETCH_POSTTYPE_FAILURE,
    payload: error
  };
}

export function resetActivePostType() {
  return {
    type: RESET_ACTIVE_POSTTYPE
  }
};

export function deletePostType(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/postType/${id}`,
   headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });
  return {
    type: DELETE_POSTTYPE,
    payload: request
  };
}

export function deletePostTypeSuccess(deletedPostType) {
  return {
    type: DELETE_POSTTYPE_SUCCESS,
    payload: deletedPostType
  };
}

export function deletePostTypeFailure(response) {
  return {
    type: DELETE_POSTTYPE_FAILURE,
    payload: response
  };
}