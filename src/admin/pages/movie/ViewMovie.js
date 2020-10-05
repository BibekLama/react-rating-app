import React, {useEffect} from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { movieActions, alertActions } from '../../../actions';
import { AlertDismissible, MovieForm, PageHeader } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ViewMovie(){

    const dispatch = useDispatch();

    let {id} = useParams();

    const loading = useSelector(state => state.movie.loading);

    const movie = useSelector(state => state.movie.movie);

    const alert = useSelector(state => state.alert);

    useEffect( () => {
        dispatch(alertActions.clear());
        dispatch(movieActions.fetchMovie(id, 'user'));
    },[id])


    return(
        <React.Fragment>
            <PageHeader title="Movie Detail" />

            {loading && <div className="d-flex justify-content-center align-items-center py-3">
                <Spinner animation="border" role="status" className="mr-2">
                    <span className="sr-only">Fetching movie...</span>
                </Spinner>
                <span>Fetching movie...</span>
            </div>}

            {alert.type && alert.message && <AlertDismissible 
                title={alert.type === 'danger' ? 'Error!!' : 'Success!!'}
                variant={alert.type}
                message={alert.message} />}

            <MovieForm  data={movie} readOnly={true} />
        </React.Fragment>
    );
}

export { ViewMovie }