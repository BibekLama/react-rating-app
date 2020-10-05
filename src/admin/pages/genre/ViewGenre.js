import React, {useEffect} from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { genreActions, alertActions } from '../../../actions';
import { AlertDismissible, GenreForm, PageHeader } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ViewGenre(){

    const dispatch = useDispatch();

    let {id} = useParams();

    const loading = useSelector(state => state.genre.loading);

    const genre = useSelector(state => state.genre.genre);

    const alert = useSelector(state => state.alert);

    useEffect( () => {
        dispatch(alertActions.clear());
        dispatch(genreActions.fetchGenre(id));
    },[id])


    return(
        <React.Fragment>
            <PageHeader title="Movie Detail" />

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

            <Col md={8} className="pt-3">
                <GenreForm  data={genre} readOnly={true} />
            </Col>
        </React.Fragment>
    );
}

export { ViewGenre }