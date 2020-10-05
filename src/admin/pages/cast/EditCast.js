import React, { useEffect, useState } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { PageHeader, AlertDismissible, CastForm } from '../../components';
import { alertActions, castActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function EditCast() {

    const dispatch = useDispatch();

    let {id} = useParams();

    const alert = useSelector(state => state.alert);

    const loading = useSelector(state => state.castForm.loading);

    const castLoading = useSelector(state => state.cast.loading);

    const cast = useSelector(state => state.cast.cast);

    useEffect( () => {
        dispatch(alertActions.clear());
        dispatch(castActions.fetchCast(id));
    },[id])

    function submitForm(data) {
       dispatch(castActions.updateCast(id, data));
    }

    return (
        <React.Fragment>
            <PageHeader title="Edit Cast" />

            {castLoading && <div className="d-flex justify-content-center align-items-center py-3">
                <Spinner animation="border" role="status" className="mr-2">
                    <span className="sr-only">Fetching casting member...</span>
                </Spinner>
                <span>Fetching casting member...</span>
            </div>}

            {alert.type && alert.message && <AlertDismissible 
                title={alert.type === 'danger' ? 'Error!!' : 'Success!!'}
                variant={alert.type}
                message={alert.message} />}

            <CastForm data={cast} loading={loading} handleSubmit={submitForm}/>
        </React.Fragment>
    )
}

export { EditCast }