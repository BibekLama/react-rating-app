import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { userActions, alertActions } from '../actions';
import { useDispatch, useSelector } from 'react-redux';


function SignUp() {

    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const user = useSelector(state => state.user.user);
    const loading = useSelector(state => state.user.loading);
    const alert = useSelector(state => state.alert);

    const username = useInputForm('');
    const name = useInputForm('');
    const email = useInputForm('');
    const password = useInputForm('');
    const cPassword = useInputForm('');
    const gender = useInputForm('Male');
    const birth_year = useInputForm(1900);
    const country = useInputForm('');
    const city = useInputForm('');
    const postal_code = useInputForm('');
    const street_number = useInputForm('');
    const street_name = useInputForm('');

    useEffect(() => {
        dispatch(alertActions.clear());
    },[])

    function submitSignupForm(e) {
        dispatch(alertActions.clear());
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true) {
            if(password.value === cPassword.value){
                dispatch(userActions.signUpUser({
                    username: username.value,
                    password: password.value,
                    profile: {
                        email: email.value,
                        name: name.value,
                        birth_year: birth_year.value,
                        gender: gender.value,
                        address: [
                            {
                                country: country.value,
                                city: city.value,
                                street_name: street_name.value,
                                street_number: street_number.value,
                                postal_code: postal_code.value
                            }
                        ]
                    },
                    role: {
                        role: "User"
                    }
                }));
            }else{
                dispatch(alertActions.error("Password do not matched."))
            }
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center h-100 py-5">
            <Container>
                <div className="pricing-header px-3 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Sign Up</h1>
                    <p className="lead">When you sign up for rating app, you can rate movie and manage the watched movies.</p>
                </div>
                <Form noValidate validated={validated} onSubmit={(e) => submitSignupForm(e)}>
                    <Card className="shadow rounded-3">
                        <Card.Header className="text-center">
                            <h5>SignUp Form</h5>
                        </Card.Header>
                        <Card.Body className="p-5">
                            {alert && alert.type && alert.message && <Alert  variant={alert.type}>
                                {alert.message}
                            </Alert>}
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" {...username} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a username.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" {...email} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid email address.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="fullname">
                                        <Form.Label>Fullname</Form.Label>
                                        <Form.Control type="text" placeholder="Enter fullname" {...name} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a fullname.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="birthYear">
                                        <Form.Label>Birth Year</Form.Label>
                                        <Form.Control type="number" min="1900" max="2002" {...birth_year} placeholder="Enter birth year" />
                                        <Form.Control.Feedback type="invalid">
                                            Age must be greater than 18 years.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="gender" {...gender}>
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select" custom>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" {...password} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid password.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="confirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" {...cPassword} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a confirm password.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                </Col>
                                <Col md={6} className="border-left">
                                    <Form.Group controlId="street-number">
                                        <Form.Label>Street Number</Form.Label>
                                        <Form.Control type="number" placeholder="Enter street number" {...street_number} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a  street number.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="street-name">
                                        <Form.Label>Street Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter street name" {...street_name} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid street name.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="postal-code">
                                        <Form.Label>Postal Code</Form.Label>
                                        <Form.Control type="text" placeholder="Enter postal code" {...postal_code} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a postal code.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="city">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" placeholder="Enter city" {...city} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a city.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="country">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control type="text" placeholder="Enter country" {...country} required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a country.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button type="submit">
                                        {loading && <Spinner animation="border" role="status" size="sm">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>}
                                        Submit form
                                    </Button>

                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Form>
            </Container>
        </div>
    )
}

function useInputForm(initialData) {
    const [value, setValue] = useState(initialData);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    }
}

export default SignUp;