import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class MessagesForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newMessage.message && !nextProps.newMessage.error) {
      this.context.router.push('/');
    }
  }

  renderError(newMessage) {
    if(newMessage && newMessage.error && newMessage.error.message) {
      return (
        <div className="alert alert-danger">
          {newMessage ? newMessage.error.message : ''}
        </div>
      );
    } else {
      return <span></span>
    }
  }

  render() {
    const {asyncValidating, fields: { title, categories, description }, handleSubmit, submitting, newMessage } = this.props;

    return (
      <div className="container">
      {this.renderError(newMessage)}
      <form onSubmit={handleSubmit(this.props.createMessage.bind(this))}>
        <div className={`form-group ${title.touched && title.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Title*</label>
          <input type="text" className="form-control" {...title} />
          <div className="help-block">
            {title.touched ? title.error : ''}
          </div>
          <div className="help-block">
            {asyncValidating === 'title'? 'validating..': ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Categories*</label>
          <input type="text" className="form-control" {...categories} />
          <div className="help-block">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${description.touched && description.invalid ? 'has-error' : ''}`}>
          <label className="control-label">description*</label>
          <textarea className="form-control" {...description} />
          <div className="help-block">
            {description.touched ? description.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary"  disabled={submitting} >Submit</button>
        <Link to="/" className="btn btn-error">Cancel</Link>
      </form>


      </div>

    );
  }
}

export default MessagesForm;