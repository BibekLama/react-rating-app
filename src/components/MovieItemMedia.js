import React from 'react';
import { Spinner, Media } from 'react-bootstrap';
import NoImage from '../assets/images/no-img.png';
import { Rating } from './Rating';
import {NavLink} from 'react-router-dom';

export function MovieItemMedia({ movies, loading }) {
    return (
        <React.Fragment>
            {loading && <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" role="status" className="mr-2" variant="light">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>}
            {movies.length > 0 && movies.map((movie, index) => (<Media key={index} to={`/public/movie/${movie.id}`} as={NavLink} className="mb-3 bg-dark text-light movie-media">
                <img
                    width={130}
                    height={150}
                    className="mr-3"
                    src={movie.poster ? movie.poster : NoImage}
                    alt="Generic placeholder"
                />
                <Media.Body>
                    <h5>{movie.title ? movie.title : 'Movie Title'}</h5>
                    <p>{movie.tagline ? movie.tagline : 'Movie Tagline'}</p>
                    <Rating value={movie.rating ? movie.rating : 0} />
                </Media.Body>
            </Media>))}
        </React.Fragment>
    );
}