import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="footer text-light">
            <Container className="pt-5 pb-3">
                <p className="float-right"><Link to="#">Back to top</Link></p>
                <p>&copy; 2020 Rating App, EPITA.FR &middot; <Link to="#">Privacy</Link> &middot; <Link to="#">Terms</Link></p>
            </Container>
        </div>
    )
}

export {Footer};