import React from 'react';
import {NavLink} from 'react-router-dom';
import {Jumbotron, Button} from 'react-bootstrap';

function PageNotFound() {
    return (
        <div className="w-100 d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Jumbotron  className="w-50 text-center">
                <h1>Page not found!</h1>
                <p>
                    The page you're trying to reach does'nt exists. :(
                </p>
                <p>
                    <Button to="/" variant="primary" as={NavLink}>Home</Button>
                </p>
            </Jumbotron>
        </div>
    )
}

export default PageNotFound;