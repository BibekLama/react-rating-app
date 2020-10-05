import React, { useEffect } from 'react';
import {MovieItemCard} from '../components';
import {useParams} from 'react-router-dom';
import {movieActions} from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import {Container, Row, Col} from 'react-bootstrap';

function Search(){
    let {searchWord} = useParams();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const loading = useSelector(state => state.movies.loading);

    useEffect(()=>{
        dispatch(movieActions.searchMovies(searchWord));
    },[searchWord])
    return(
        <div className="py-5 px-md-5 primary-container">
            <Container fluid>
                <Row>
                    <Col xs={12} className="d-flex justify-content-between mb-4">
                        <h3 className="text-light">Search for "{searchWord}"</h3>
                    </Col>
                    {movies.length === 0 && !loading && <h5>Movies not found</h5>}
                    <MovieItemCard
                        movies={movies}
                        loading={loading} />
                </Row>
            </Container>
        </div>
    )
}

export default Search;