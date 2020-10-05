import React, { useEffect, useState } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { PageHeader, AlertDismissible, MovieForm } from '../../components';
import { alertActions, movieActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function EditMovie() {

    const dispatch = useDispatch();

    let {id} = useParams();

    const alert = useSelector(state => state.alert);

    const loading = useSelector(state => state.movieForm.loading);

    const movieLoading = useSelector(state => state.movie.loading);

    const movie = useSelector(state => state.movie.movie);

    useEffect( () => {
        dispatch(alertActions.clear());
        dispatch(movieActions.fetchMovie(id,'user'));
    },[id])

    function submitForm(data) {
       dispatch(movieActions.updateMovie(id, data));
    }

    return (
        <React.Fragment>
            <PageHeader title="Edit Movie" />

            {movieLoading && <div className="d-flex justify-content-center align-items-center py-3">
                <Spinner animation="border" role="status" className="mr-2">
                    <span className="sr-only">Fetching movie...</span>
                </Spinner>
                <span>Fetching movie...</span>
            </div>}

            {alert.type && alert.message && <AlertDismissible 
                title={alert.type === 'danger' ? 'Error!!' : 'Success!!'}
                variant={alert.type}
                message={alert.message} />}

            <MovieForm data={movie} loading={loading} handleSubmit={submitForm}/>
        </React.Fragment>
    )
}

export { EditMovie }