import React, {useEffect} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import { movieActions } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { MovieItemCard } from '../components';

function Popular(){

    const dispatch = useDispatch();
    const movies = useSelector(state => state.popular.movies);
    const loading = useSelector(state => state.popular.loading);

    useEffect(() => {
        dispatch(movieActions.fetchPopular(0));
    }, []);

    return(
        <div className="py-5 px-md-5 primary-container">
            <Container fluid>
                <Row>
                    <Col xs={12} className="d-flex justify-content-between mb-4">
                        <h3 className="text-warning">Popular</h3>
                    </Col>

                    <MovieItemCard
                        movies={movies}
                        loading={loading} />
                </Row>
            </Container>
        </div>
    )
}

export default Popular;