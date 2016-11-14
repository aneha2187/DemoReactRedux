import PostTypeForm from '../components/PostTypeForm.js';
import {
  createPostType, createPostTypeSuccess, createPostTypeFailure, resetNewPostType, validatePostTypeFields, validatePostTypeFieldsSuccess, validatePostTypeFieldsFailure
}
from '../actions/postType';
import {
  reduxForm
}
from 'redux-form';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.categories || values.categories.trim() === '') {
    errors.categories = 'Enter categories';
  }
  return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {

  return new Promise((resolve, reject) => {

    dispatch(validatePostTypeFields(values))
      .then((response) => {
        let data = response.payload.data;
        //if status is not 200 or any one of the fields exist, then there is a field error
        if (response.payload.status != 200 || data.title || data.categories || data.description) {
          //let other components know of error by updating the redux` state
          dispatch(validatePostTypeFieldsFailure(response.payload));
          reject(data); //this is for redux-form itself
        } else {
          //let other components know that everything is fine by updating the redux` state
          dispatch(validatePostTypeFieldsSuccess(response.payload)); //ps: this is same as dispatching RESET_POST_FIELDS
          resolve(); //this is for redux-form itself
        }
      });
  });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndCreatePostType = (values, dispatch) => {

  return new Promise((resolve, reject) => {


    let token = sessionStorage.getItem('jwtToken');
    if (!token || token === '') { //if there is no token, dont bother,
      let data = {data: {message: 'Please Sign In'}};//axios like error
      dispatch(createPostTypeFailure(data)); // but let other comps know
      reject(data); //this is for redux-form itself
      return;
    }
    dispatch(createPostType(values, token))
      .then((response) => {
        let data = response.payload.data;
        //if any one of these exist, then there is a field error 
        if (response.payload.status != 200) {
          //let other components know of error by updating the redux` state
          dispatch(createPostTypeFailure(response.payload));
          reject(data); //this is for redux-form itself
        } else {
          //let other components know that everything is fine by updating the redux` state
          dispatch(createPostTypeSuccess(response.payload));
          resolve(); //this is for redux-form itself
        }
      });

  });
};



const mapDispatchToProps = (dispatch) => {
  return {
    createPostType: validateAndCreatePostType,
    resetMe: () => {
      dispatch(resetNewPostType());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newPostType: state.posts.newPostType
  };
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostTypeNewForm',
  fields: ['title', 'categories', 'content'],
  asyncValidate,
  asyncBlurFields: ['title'],
  validate
}, mapStateToProps, mapDispatchToProps)(PostTypeForm);