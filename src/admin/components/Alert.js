import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { alertActions } from '../../actions';
import { useDispatch } from 'react-redux';

function AlertDismissible({ variant, title, message }) {
    const [show, setShow] = useState(true);

    const dispatch  = useDispatch();

    function handleAlertClose(e) {
        e.preventDefault();
        setShow(false);
        dispatch(alertActions.clear());
    }

    return (
        <React.Fragment>
            <Alert show={show} variant={variant}>
                <Alert.Heading>{title}</Alert.Heading>
                <p>
                    {message}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={(e) => handleAlertClose(e)} variant={`outline-${variant}`}>
                        Close
                    </Button>
                </div>
            </Alert>
        </React.Fragment>
    );
}

export { AlertDismissible }