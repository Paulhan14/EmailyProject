// SurveyForm: for user to enter survey info
import _ from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field key={name} type='text' component={SurveyField} label={label} name={name} />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to='/surveys' className='red btn-flat white-text'>
            Cancel
          </Link>
          <button type='submit' className='teal btn-flat right white-text'>
            Submit
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name, errorOnNull }) => {
    if (!values[name]) {
      errors[name] = errorOnNull;
    }
  });

  return errors;
}

const createReduxForm = reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false,
});
SurveyForm = createReduxForm(SurveyForm);

export default SurveyForm;
