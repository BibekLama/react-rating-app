import React, { useEffect, useState } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { PageHeader, AlertDismissible, GenreForm } from '../../components';
import { alertActions, genreActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function EditGenre() {

    const dispatch = useDispatch();

    let {id} = useParams();

    const alert = useSelector(state => state.alert);

    const loading = useSelector(state => state.movieForm.loading);

    const genreLoading = useSelector(state => state.genre.loading);

    const genre = useSelector(state => state.genre.genre);

    useEffect( () => {
        dispatch(alertActions.clear());
        dispatch(genreActions.fetchGenre(id));
    },[id])

    function submitForm(data) {
       dispatch(genreActions.updateGenre(id, data));
    }

    return (
        <React.Fragment>
            <PageHeader title="Edit Genre" />

            {genreLoading && <div className="d-flex justify-content-center align-items-center py-3">
                <Spinner animation="border" role="status" className="mr-2">
                    <span className="sr-only">Fetching genre...</span>
                </Spinner>
                <span>Fetching genre...</span>
            </div>}

            {alert.type && alert.message && <AlertDismissible 
                title={alert.type === 'danger' ? 'Error!!' : 'Success!!'}
                variant={alert.type}
                message={alert.message} />}

            <Col md={8} className="pt-3">
                <GenreForm data={genre} loading={loading} handleSubmit={submitForm}/>
            </Col>
        </React.Fragment>
    )
}

export { EditGenre }