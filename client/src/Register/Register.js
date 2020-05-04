import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.css';
import '../Register/register.css';
import { auth } from "../utils/fire-base/firebase";



class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showParent: false,
      showKid: false,
      showFirstTime: true,
      isValid: false
    };

    this.handleKidRegister = this.handleKidRegister.bind(this);
    this.handleParentRegister = this.handleParentRegister.bind(this);
    //this.tryRegisterToFireBase = this.tryRegisterToFireBase.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      const givenState = this.props.location.state;
      this.setState({
        showFirstTime: !givenState.isFromLoginPage,
        showParent: !givenState.isKid,
        showKid: givenState.isKid
      })
    }
  }

  handleKidRegister(evt) {
    this.setState({ showParent: false });
    this.setState({ showKid: true });
    this.setState({ showFirstTime: false });
  }

  handleParentRegister(evt) {
    this.setState({ showParent: true });
    this.setState({ showKid: false });
    this.setState({ showFirstTime: false });
  }

  handlePhoneValidation(evt) {
  }

  validatePhoneField(values, errors) {
    if (!values.phoneNumber) {
      errors.phoneNumber = 'נחוץ';
    }
    else if (values.phoneNumber.length !== 10) {
      errors.phoneNumber = 'מספר פלאפון לא תקין';
    }
  }

  validateParentPhoneField(values, errors) {
    if (this.state.showKid) {
      if (!values.parentPhone) {
        errors.parentPhone = 'נחוץ';
      }
      else if (values.parentPhone.length !== 10) {
        errors.parentPhone = 'מספר פלאפון לא תקין';
      }
    }
  }

  validateNameField(values, errors) {
    if (!values.name) {
      errors.name = 'נחוץ';
    }
  }

  validatePasswordField(values, errors) {
    if (!values.password) {
      errors.password = 'נחוץ';
    }
  }

  validateEmailField(values, errors) {
    if (!values.email) {
      errors.email = 'נחוץ';
    }
    // TODO : ADD EMAIL VALIDATION
  }

  tryRegisterToFireBase(values) {
    auth.createUserWithEmailAndPassword(values.email, values.password).catch(error => {
      console.log(error);
    }).then(user => {
      if(user){
        this.state.isKid ? this.props.history.push("/KidPage") : this.props.history.push("/KidPage"); 
      }
    })
  }

  render() {
    return (
      <div id="body-register">
        {
          this.state.showFirstTime &&
          <span className="first-time-span-register-page">
            ?בתור מי תרצה/י להירשם
            </span>
          &&
          <div>
            <div id="signup-outer-register-page">
              <button className="btn btn-light signup-button" onClick={this.handleKidRegister}><span>ילד/ה</span></button>
              <button className="btn btn-light signup-button" onClick={this.handleParentRegister}>הורה</button>
              <button className="btn btn-light signup-button" onClick={this.handleParentRegister}><span>בעל/ת עסק</span></button>
            </div>
          </div>
        }
        {
          !this.state.showFirstTime &&
          <div>
            <Formik
              initialValues={{ email: '', phoneNumber: '', parentPhone: '', password: '', name: '' }}
              validate={values => {
                const errors = {};
                
                this.validateEmailField(values, errors);

                this.validatePhoneField(values, errors);

                this.validateParentPhoneField(values, errors);

                this.validatePasswordField(values, errors);

                this.validateNameField(values, errors);

                this.setState({ isValid: errors.length === undefined })

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  this.tryRegisterToFireBase(values);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <div className="register-outer" id="kid-section">
                  <Form className="register-form">
                    {this.state.showKid &&
                      <React.Fragment>
                        <Field className="register-input" type="phone" name="parentPhone" placeholder="מספר פלאפון של ההורה" />
                        <ErrorMessage name="parentPhone" component="div" />
                      </React.Fragment>
                    }

                    <Field className="register-input" type="text" name="email" placeholder="אימייל" />
                    <ErrorMessage name="email" component="div" />

                    <Field className="register-input" type="text" name="name" placeholder="שם מלא" />
                    <ErrorMessage name="name" component="div" />

                    <Field className="register-input" type="phone" name="phoneNumber" placeholder="מספר פלאפון" />
                    <ErrorMessage name="phoneNumber" component="div" />

                    <Field className="register-input" type="password" name="password" placeholder="סיסמא" />
                    <ErrorMessage name="password" component="div" />

                    <button className="btn btn-light register-submit-button" type="submit" disabled={!this.state.isValid}>הירשם</button>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        }
      </div>

    );
  }
}

export default Register;