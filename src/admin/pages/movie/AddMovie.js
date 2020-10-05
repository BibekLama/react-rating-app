import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { PageHeader, AlertDismissible, MovieForm } from '../../components';
import { alertActions, movieActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';

function AddMovie() {

    const dispatch = useDispatch();

    const alert = useSelector(state => state.alert);

    const loading = useSelector(state => state.movieForm.loading);

    useEffect( () => {
        dispatch(alertActions.clear());
    },[])

    function submitForm(data) {
       dispatch(movieActions.addMovie(data));
    }

    return (
        <React.Fragment>
            <PageHeader title="Add Movie" />

            {alert.type && alert.message && <AlertDismissible 
                title={alert.type === 'danger' ? 'Error!!' : 'Success!!'}
                variant={alert.type}
                message={alert.message} />}
                
            <MovieForm data={null} loading={loading} handleSubmit={submitForm}/>
            
        </React.Fragment>
    )
}

export { AddMovie }