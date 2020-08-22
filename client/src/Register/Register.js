import React, {useState, useEffect} from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import 'bootstrap/dist/css/bootstrap.css';
import '../Register/register.css';
import Auth from "../utils/fire-base/firebase";
import axios from 'axios';
import {userContext} from "../utils/fire-base/userContext";
import Alert from "react-bootstrap/Alert"


function Register(props) {
    const [showKid, setShowKid] = useState(false);
    const [showFirstTime, setShowFirstTime] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [error, setError] = useState('');
    const [picture, setPicture] = useState('');
    const [file, setFile] = useState('');
    const [coordinates, setCoordinates] = useState('');


    useEffect(() => {
        if (props.location.state !== undefined) {
            const givenState = props.location.state;

            setShowFirstTime(!givenState.isFromLoginPage);
            setShowKid(givenState.isKid);
            setIsOwner(givenState.isOwner);

            if (givenState.isOwner) {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        function (position) {
                            setCoordinates(position.coords);
                        },
                        function (error) {
                            // default coordinates in center tlv
                            console.error("Error Code = " + error.code + " - " + error.message);
                        }
                    );

                } else {
                    console.log("Not Available");
                }
            }
        }

    }, [props.location.state]);

    const HandleKidRegister = (evt) => {
        setIsOwner(false);
        setShowKid(true);
        setShowFirstTime(false);
    };

    const HandleParentRegister = (evt) => {
        setShowKid(false);
        setShowFirstTime(false);
        setIsOwner(false);
    };

    const HandleOwnerRegister = (evt) => {

        setShowKid(false);
        setShowFirstTime(false);
        setIsOwner(true);
    };

    const ValidatePhoneField = (values, errors) => {
        if (!values.phoneNumber) {
            errors.phoneNumber = 'נחוץ';
        } else if (values.phoneNumber.length !== 10) {
            errors.phoneNumber = 'מספר פלאפון לא תקין';
        }
    };

    const ValidateParentEmailField = (values, errors) => {
        if (showKid) {
            if (!values.parentEmail) {
                errors.parentEmail = 'נחוץ';
            }
        }
    };

    const ValidateNameField = (values, errors) => {
        if (!values.name) {
            errors.name = 'נחוץ';
        }
    };

    const ValidatePasswordField = (values, errors) => {
        if (!values.password) {
            errors.password = 'נחוץ';
        }
    };

    const ValidateEmailField = (values, errors) => {
        if (!values.email) {
            errors.email = 'נחוץ';
        }
        // TODO : ADD EMAIL VALIDATION
    };

    const ValidateStoreFields = (values, errors) => {
        if (isOwner) {
            if (!values.storeName) {
                errors.storeName = 'נחוץ';
            }

            if (!values.address) {
                errors.address = 'נחוץ';
            }

            if (!values.bankAccount) {
                errors.bankAccount = 'נחוץ';
            }
        }
    };

    const onChange = (e) => {
        setPicture(e.target.value);
        setFile(e.target.files[0]);
    };
    const TryRegisterToFireBase = async (values, setUser) => {
        let currError = '';
        const type = showKid ? 'child' : isOwner ? 'owner' : 'parent';

        if (showKid) {
            const formData = new FormData();
            formData.append('myImage', file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.post('http://localhost:8080/product/addImage', formData, config)
                .then((response) => {
                    // alert("image uplaoded seccessfully")
                }).catch((error) => {
                alert(error)
            });
        }

        const response = await axios.post(
            'http://localhost:8080/auth/signup',
            {
                email: values.email,
                type: type,
                phoneNumber: values.phoneNumber,
                password: values.password,
                firstName: values.name,
                lastName: '',
                parentEmail: values.parentEmail,
                picture: picture,
                //file: file,
                store: {
                    storeName: values.storeName,
                    location: {
                        longitude: coordinates.longitude,
                        latitude: coordinates.latitude
                    },
                    address: values.address,
                    bankAccount: values.bankAccount

                }
            },
            {headers: {'Content-Type': 'application/json'}}
        ).catch(error => {
            alert(JSON.stringify(error));
            setError(error.response.data);
            currError = error.response.data;
        });

        if (currError === '') {
            const res = response.data;
            setUser(res.uid, await Auth.signInWithCustomToken(res.token));
            props.history.push("/Login");
        }

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
                        <button className="btn btn-light signup-button" onClick={HandleKidRegister}><span>ילד/ה</span>
                        </button>
                        <button className="btn btn-light signup-button" onClick={HandleParentRegister}>הורה</button>
                        <button className="btn btn-light signup-button" onClick={HandleOwnerRegister}>
                            <span>בעל/ת עסק</span></button>
                    </div>
                </div>
            }
            <userContext.Consumer>
                {user => {
                    return (
                        !showFirstTime &&
                        <div>
                            <Formik
                                initialValues={{
                                    email: '',
                                    phoneNumber: '',
                                    parentEmail: '',
                                    password: '',
                                    name: '',
                                    storeName: '',
                                    address: '',
                                    bankAccount: '',
                                    picture: '',
                                    file: ''
                                }}
                                validate={values => {
                                    const errors = {};

                                    ValidateEmailField(values, errors);

                                    ValidatePhoneField(values, errors);

                                    ValidateParentEmailField(values, errors);

                                    ValidatePasswordField(values, errors);

                                    ValidateNameField(values, errors);

                                    ValidateStoreFields(values, errors);

                                    setIsValid(errors.length === undefined);

                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting}) => {
                                    setTimeout(() => {
                                        setSubmitting(false);
                                        TryRegisterToFireBase(values, user.setUserFunc);
                                    }, 1);
                                }}
                            >
                                {({isSubmitting}) => (
                                    <div className="register-outer" id="kid-section">
                                        <Form className="register-form">
                                            {showKid &&
                                            <React.Fragment>
                                                <Field className="register-input" type="email" name="parentEmail"
                                                       placeholder="אימייל של ההורה"/>
                                                <ErrorMessage name="parentEmail" component="div"/>

                                                <Field id='myImage' className="register-input" type="file"
                                                       name="myImage" onChange={onChange}/>
                                            </React.Fragment>
                                            }

                                            {isOwner &&
                                            <React.Fragment>
                                                <Field className="register-input" type="name" name="storeName"
                                                       placeholder="שם חנות"/>
                                                <ErrorMessage name="storeName" component="div"/>
                                                <Field className="register-input" type="address" name="address"
                                                       placeholder="כתובת"/>
                                                <ErrorMessage name="address" component="div"/>
                                                <Field className="register-input" type="bankAccount" name="bankAccount"
                                                       placeholder="חשבון בנק"/>
                                                <ErrorMessage name="bankAccount" component="div"/>
                                            </React.Fragment>
                                            }

                                            <Field className="register-input" type="text" name="email"
                                                   placeholder="אימייל"/>
                                            <ErrorMessage name="email" component="div"/>

                                            <Field className="register-input" type="text" name="name"
                                                   placeholder="שם מלא"/>
                                            <ErrorMessage name="name" component="div"/>

                                            <Field className="register-input" type="phone" name="phoneNumber"
                                                   placeholder="מספר פלאפון"/>
                                            <ErrorMessage name="phoneNumber" component="div"/>

                                            <Field className="register-input" type="password" name="password"
                                                   placeholder="סיסמא"/>
                                            <ErrorMessage name="password" component="div"/>

                                            <button className="btn btn-light register-submit-button" type="submit"
                                                    disabled={!isValid}>הירשם
                                            </button>
                                        </Form>
                                    </div>
                                )}
                            </Formik>

                        </div>

                    )
                }}

            </userContext.Consumer>
            <Alert variant="danger" show={error !== ''} onClose={() => setError('')} dismissible>
                <Alert.Heading>קרתה שגיאה!</Alert.Heading>
                <p>
                    {error}
                </p>
            </Alert>
        </div>


    );
}

export default Register;