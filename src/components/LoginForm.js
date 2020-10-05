import React, {useState} from 'react';
import {
    Form,
    Button,
    Spinner
} from 'react-bootstrap';

function LoginForm({onSubmit, loading}) {
    const username = useFormInput('');
    const password = useFormInput('');
    const [validated, setValidated] = useState(false);

    function submitForm(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        if(form.checkValidity() === true) {
            onSubmit(username.value, password.value);
        }
    }

    return (
        <Form noValidate validated={validated} className="text-left" onSubmit={(e) => submitForm(e)}>

            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    {...username}
                    required />
                <Form.Control.Feedback type="invalid">
                    Please enter username.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    {...password}
                    required />
                <Form.Control.Feedback type="invalid">
                    Please enter password.
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="danger" type="submit" className="w-100 d-flex justify-content-center align-items-center">
                {loading && <Spinner animation="border" size="sm" role="status" className="mr-2">
                    <span className="sr-only">Loading...</span>
                </Spinner>}
                LOGIN
            </Button>

        </Form>
    )
}

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e){
        setValue(e.target.value)
    }

    return {
        value,
        onChange: handleChange
    }
}

export { LoginForm }