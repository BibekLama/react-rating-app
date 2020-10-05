import React, {useEffect, useState} from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';

function GenreForm({data, loading, handleSubmit, readOnly=false}) {

    const [values, setValues] = useState({
        name: '',
    });

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if(data){
            setValues({
                ...values, 
                name: data.name, 
            });
        }
    }, [data])

    function onValueChange(prop, e) {
        setValues({ ...values, [prop]: e.target.value });
    }

    function submitForm(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true) {
            handleSubmit({
                name: values.name
            });
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={(e) => submitForm(e)}>

            <Form.Group as={Row} controlId="formHorizontalName">
                <Form.Label column sm={2}>
                    NAME
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="text"
                        placeholder="Genre Name"
                        value={values.name}
                        onChange={(e) => onValueChange('name', e)}
                        required 
                        readOnly={readOnly}/>

                    <Form.Control.Feedback type="invalid">
                        Please enter genre name.
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>

            {!readOnly && <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" className="d-flex justify-content-center align-items-center">
                        {loading && <Spinner animation="border" size="sm" role="status" className="mr-2">
                            <span className="sr-only">Loading...</span>
                        </Spinner>}
                        Submit
                    </Button>
                </Col>
            </Form.Group>}

        </Form>
    );
}

export { GenreForm };