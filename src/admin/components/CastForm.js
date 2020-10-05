import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Spinner, Card, Accordion, ListGroup } from 'react-bootstrap';

function CastForm({ data, loading, handleSubmit, readOnly = false }) {

    const [values, setValues] = useState({
        name: '',
        born: 1900,
        actedIn: [],
        directed: [],
        produced: [],
        wrote: [],
        selectedMovie: ''
    });

    const [validated, setValidated] = useState(false);


    useEffect(() => {
        if (data) {
            setValues({
                ...values,
                name: data.name,
                born: data.born,
                actedIn: data.actedIn,
                directed: data.directed,
                produced: data.produced,
                wrote: data.wrote
            });
        }
    }, [data])

    function onValueChange(prop, e) {
        setValues({ ...values, [prop]: e.target.value });
    }

    function yearItems() {
        let items = [];
        for (let year = 1900; year <= 2100; year++) {
            items.push(year);
        }
        return items;
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
                name: values.name,
                born: values.born ? values.born : null
            });
        }
    }

    return (
        <Form noValidate validated={validated} onSubmit={(e) => submitForm(e)}>
            <Row>
                <Col md={6} className="pt-4">
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column sm={2}>
                            NAME
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Fullname"
                                value={values.name}
                                onChange={(e) => onValueChange('name', e)}
                                required
                                readOnly={readOnly} />

                            <Form.Control.Feedback type="invalid">
                                Please enter casting member name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>


                    {readOnly && <Form.Group as={Row} controlId="formHorizontalBorn">
                        <Form.Label column sm={2}>
                            BORN
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Born Year"
                                value={values.born}
                                readOnly />
                        </Col>
                    </Form.Group>}

                    {!readOnly && <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            BORN
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                as="select"
                                placeholder="Released"
                                value={values.born}
                                onChange={(e) => onValueChange('born', e)}
                                readOnly={readOnly}>

                                <option>Choose...</option>
                                {yearItems().map(item => (<option key={item} value={item}>{item}</option>))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please enter born year.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>}
                </Col>

                {readOnly && <Col md={6} className="pt-4">
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Acted Movies
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {values.actedIn.length === 0 && <div>No Movies</div>}
                                    {values.actedIn.length > 0 && <ListGroup variant="flush">
                                        {values.actedIn.map((movie, index) => {
                                            return (<ListGroup.Item key={index}>{index + 1}. {movie.title}</ListGroup.Item>)
                                        })}
                                    </ListGroup>}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Directed Movies
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {values.directed.length === 0 && <div>No Movies</div>}
                                    {values.directed.length > 0 && <ListGroup variant="flush">
                                        {values.directed.map((movie, index) => {
                                            return (<ListGroup.Item key={index}>{index + 1}. {movie.title}</ListGroup.Item>)
                                        })}
                                    </ListGroup>}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                    Produced Movies
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    {values.produced.length === 0 && <div>No Movies</div>}
                                    {values.produced.length > 0 && <ListGroup variant="flush">
                                        {values.produced.map((movie, index) => {
                                            return (<ListGroup.Item key={index}>{index + 1}. {movie.title}</ListGroup.Item>)
                                        })}
                                    </ListGroup>}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                    Wrote Movies
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="3">
                                <Card.Body>
                                    {values.wrote.length === 0 && <div>No Movies</div>}
                                    {values.wrote.length > 0 && <ListGroup variant="flush">
                                        {values.wrote.map((movie, index) => {
                                            return (<ListGroup.Item key={index}>{index + 1}. {movie.title}</ListGroup.Item>)
                                        })}
                                    </ListGroup>}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>}
            </Row>

            {!readOnly && <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 1 }}>
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

export { CastForm };