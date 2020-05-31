import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.css';
import '../Register/register.css';
import Auth from "../utils/fire-base/firebase";
import axios from 'axios';
import {userContext} from "../utils/fire-base/userContext";



function Register(props) {
  

  const [showKid, setShowKid] = useState(false);
  const [showFirstTime, setShowFirstTime] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [isOwner, setIsOwner] = useState(false);


  useEffect(() =>{
    if (props.location.state !== undefined) {
      const givenState = props.location.state;

      setShowFirstTime(!givenState.isFromLoginPage);
      setShowKid(givenState.isKid);
      setIsOwner(givenState.isOwner);
    }
  }, [props.location.state])

  const HandleKidRegister = (evt) => {
    setIsOwner(false);
    setShowKid(true);
    setShowFirstTime(false);
  }

  const HandleParentRegister = (evt) => {
    setShowKid(false);
    setShowFirstTime(false);
    setIsOwner(false);
  }

  const HandleOwnerRegister = (evt) => {

    setShowKid(false);
    setShowFirstTime(false);
    setIsOwner(true);
  }

  const ValidatePhoneField = (values, errors) => {
    if (!values.phoneNumber) {
      errors.phoneNumber = 'נחוץ';
    }
    else if (values.phoneNumber.length !== 10) {
      errors.phoneNumber = 'מספר פלאפון לא תקין';
    }
  }

  const ValidateParentPhoneField = (values, errors) => {
    if (showKid) {
      if (!values.parentPhone) {
        errors.parentPhone = 'נחוץ';
      }
      else if (values.parentPhone.length !== 10) {
        errors.parentPhone = 'מספר פלאפון לא תקין';
      }
    }
  }

  const ValidateNameField = (values, errors) => {
    if (!values.name) {
      errors.name = 'נחוץ';
    }
  }

  const ValidatePasswordField = (values, errors) => {
    if (!values.password) {
      errors.password = 'נחוץ';
    }
  }

  const ValidateEmailField = (values, errors) => {
    if (!values.email) {
      errors.email = 'נחוץ';
    }
    // TODO : ADD EMAIL VALIDATION
  }

  const TryRegisterToFireBase = async (values, setUser) => {
    const type = showKid ? 'child' : isOwner ? 'owner' : 'parent';

    const response = await axios.post(
      'http://localhost:8080/auth/signup',
      { email: values.email,
      type: type ,
      phoneNumber: values.phoneNumber,
      password: values.password,
    firstName: values.name,
  lastName: '' },
      { headers: { 'Content-Type': 'application/json' } }
    );

    // check for errors
    const res = await response.data;
    setUser(res.uid, await Auth.signInWithCustomToken(res.token).then(tok => {return tok;}));
    props.history.push("/Login");
  };
  
    return (
      <div id="body-register">
         {
          showFirstTime &&
          <span className="first-time-span-register-page">
            ?בתור מי תרצה/י להירשם
            </span>
          &&
          <div>
            <div id="signup-outer-register-page">
              <button className="btn btn-light signup-button" onClick={HandleKidRegister}><span>ילד/ה</span></button>
              <button className="btn btn-light signup-button" onClick={HandleParentRegister}>הורה</button>
              <button className="btn btn-light signup-button" onClick={HandleOwnerRegister}><span>בעל/ת עסק</span></button>
            </div>
          </div>
        }
              <userContext.Consumer>
       { user => {
         return (
          !showFirstTime &&
          <div>
            <Formik
              initialValues={{ email: '', phoneNumber: '', parentPhone: '', password: '', name: '' }}
              validate={values => {
                const errors = {};
                
                ValidateEmailField(values, errors);

                ValidatePhoneField(values, errors);

                ValidateParentPhoneField(values, errors);

                ValidatePasswordField(values, errors);

                ValidateNameField(values, errors);

                setIsValid(errors.length === undefined);

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  TryRegisterToFireBase(values, user.setUserFunc);
                }, 1);
              }}
            >
              {({ isSubmitting }) => (
                <div className="register-outer" id="kid-section">
                  <Form className="register-form">
                    {showKid &&
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

                    <button className="btn btn-light register-submit-button" type="submit" disabled={!isValid}>הירשם</button>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
          )}}
          </userContext.Consumer>
      </div>


    );
}

export default Register;