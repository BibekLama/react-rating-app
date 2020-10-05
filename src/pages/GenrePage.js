import React, {  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieActions } from '../actions';
import { Container, Col, Row } from 'react-bootstrap';
import {MovieItemCard} from '../components';

function GenrePage() {
    let { genre } = useParams();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const loading = useSelector(state => state.movies.loading);
    useEffect(() => {
        dispatch(movieActions.fetchGenreMovies(genre));
    },[genre])
    return(
        <div className="py-5 px-md-5 primary-container">
            <Container fluid>
                <Row>
                    <Col xs={12} className="d-flex justify-content-between mb-4">
                        <h3 className="text-warning">{genre}</h3>
                    </Col>

                    <MovieItemCard
                        movies={movies}
                        loading={loading} />
                </Row>
            </Container>
        </div>

    )
}

export default GenrePage;