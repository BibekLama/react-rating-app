import React, { useEffect } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { castActions, alertActions } from '../../../actions';
import { AlertDismissible, CastForm, PageHeader } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ViewCast() {

    const dispatch = useDispatch();

    let { id } = useParams();

    const loading = useSelector(state => state.cast.loading);

    const cast = useSelector(state => state.cast.cast);

    const alert = useSelector(state => state.alert);

    useEffect(() => {
        dispatch(alertActions.clear());
        dispatch(castActions.fetchCast(id));
    }, [id])


    return (
        <React.Fragment>
            <PageHeader title="Casting Member's Detail" />

            {loading && <div className="d-flex justify-content-center align-items-center py-3">
                <Spinner animation="border" role="status" className="mr-2">
                    <span className="sr-only">Fetching genre...</span>
                </Spinner>
                <span>Fetching genre...</span>
            </div>}

            {alert.type && alert.message && <AlertDismissible
                title={alert.type === 'danger' ? 'Error!!' : 'Success!!'}
                variant={alert.type}
                message={alert.message} />}

            <Col md={12} className="pt-3">
                <CastForm data={cast} readOnly={true} />
            </Col>
        </React.Fragment>
    );
}

export { ViewCast }