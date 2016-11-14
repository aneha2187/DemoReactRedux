import MessagesForm from '../components/MessagesForm.js';
import {
  createMessage, createMessageSuccess, createMessageFailure, resetNewMessage, validateMessageFields, validateMessageFieldsSuccess, validateMessageFieldsFailure
}
from '../actions/messages';
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
  if (!values.description || values.description.trim() === '') {
    errors.description = 'Enter some description';
  }

  return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {

  return new Promise((resolve, reject) => {

    dispatch(validateMessageFields(values))
      .then((response) => {
        let data = response.payload.data;
        //if status is not 200 or any one of the fields exist, then there is a field error
        if (response.payload.status != 200 || data.title || data.categories || data.description) {
          //let other components know of error by updating the redux` state
          dispatch(validateMessageFieldsFailure(response.payload));
          reject(data); //this is for redux-form itself
        } else {
          //let other components know that everything is fine by updating the redux` state
          dispatch(validateMessageFieldsSuccess(response.payload)); //ps: this is same as dispatching RESET_Message_FIELDS
          resolve(); //this is for redux-form itself
        }
      });
  });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndCreateMessage = (values, dispatch) => {

  return new Promise((resolve, reject) => {


    let token = sessionStorage.getItem('jwtToken');
    if (!token || token === '') { //if there is no token, dont bother,
      let data = {data: {message: 'Please Sign In'}};//axios like error
      dispatch(createMessageFailure(data)); // but let other comps know
      reject(data); //this is for redux-form itself
      return;
    }
    dispatch(createMessage(values, token))
      .then((response) => {
        let data = response.payload.data;
        //if any one of these exist, then there is a field error 
        if (response.payload.status != 200) {
          //let other components know of error by updating the redux` state
          dispatch(createMessageFailure(response.payload));
          reject(data); //this is for redux-form itself
        } else {
          //let other components know that everything is fine by updating the redux` state
          dispatch(createMessageSuccess(response.payload));
          resolve(); //this is for redux-form itself
        }
      });

  });
};



const mapDispatchToProps = (dispatch) => {
  return {
    createMessage: validateAndCreateMessage,
    resetMe: () => {
      dispatch(resetNewMessage());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newMessage: state.messages.newMessage
  };
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'MessagesNewForm',
  fields: ['title', 'categories', 'description'],
  asyncValidate,
  asyncBlurFields: ['title'],
  validate
}, mapStateToProps, mapDispatchToProps)(MessagesForm);