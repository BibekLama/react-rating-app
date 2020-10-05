import React from 'react';
import { Col, Card, Spinner, Image } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import {Rating} from './Rating';

import NoImage from '../assets/images/no-img.png';

function MovieItemCard({movies, loading}) {
    return (
        <React.Fragment>
            {loading &&
                <Col xs={12} className="d-flex justify-content-center align-items-center py-5">
                    <span className="d-flex justify-content-center align-items-center">
                        <Spinner animation="border" role="status" variant="light" className="mr-2">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        <small className="text-light">Loading Movies...</small>
                    </span>
                </Col>}
            {movies.length > 0 && !loading && movies.map((movie, index) => {
                return (<Col sm={6} md={3} key={index}>
                    <Card className="mb-4 shadow bg-dark text-light border-0" to={`/public/movie/${movie.id}`} as={NavLink}>
                        <div className="card-img">
                            <Card.Img variant="top" src={movie.poster ? movie.poster.toString() : NoImage} />
                        </div>
                            
                        <Card.Body>
                            <Card.Title>{movie.title ? movie.title : 'Movie Title'}</Card.Title>
                            <Card.Text>{movie.tagline ? movie.tagline : 'Movie Tagline'}</Card.Text>
                            <div className="d-flex justify-content-between align-items-center">
                                <Rating value={movie.rating} />
                                <small className="text-muted">Released: {movie.released}</small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>);
            })}
        </React.Fragment>
    )
}

export { MovieItemCard }