import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { PageHeader, AlertDismissible, CastForm } from '../../components';
import { alertActions, castActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';

function AddCast() {

    const dispatch = useDispatch();

    const alert = useSelector(state => state.alert);

    const loading = useSelector(state => state.castForm.loading);

    useEffect( () => {
        dispatch(alertActions.clear());
    },[])

    function submitForm(data) {
       dispatch(castActions.addCast(data));
    }

    return (
        <React.Fragment>
            <PageHeader title="Add Casting Member" />
            {alert.type && alert.message && <AlertDismissible 
                title={alert.type === 'danger' ? 'Error!!' : 'Success!!'}
                variant={alert.type}
                message={alert.message} />}

            <CastForm data={null} loading={loading} handleSubmit={submitForm}/>
        </React.Fragment>
    )
}

export { AddCast }