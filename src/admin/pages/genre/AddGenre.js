import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { PageHeader, AlertDismissible, GenreForm } from '../../components';
import { alertActions, genreActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';

function AddGenre() {

    const dispatch = useDispatch();

    const alert = useSelector(state => state.alert);

    const loading = useSelector(state => state.genreForm.loading);

    useEffect( () => {
        dispatch(alertActions.clear());
    },[])

    function submitForm(data) {
       dispatch(genreActions.addGenre(data));
    }

    return (
        <React.Fragment>
            <PageHeader title="Add Genre" />
            {alert.type && alert.message && <AlertDismissible 
                title={alert.type === 'danger' ? 'Error!!' : 'Success!!'}
                variant={alert.type}
                message={alert.message} />}

            <Col md={8}>
                <GenreForm data={null} loading={loading} handleSubmit={submitForm}/>
            </Col>
        </React.Fragment>
    )
}

export { AddGenre }