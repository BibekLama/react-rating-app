import React, { useEffect, useState } from 'react';
import { PageHeader, AlertDismissible, MPagination } from '../../components';
import { Table, Button, Spinner, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { movieActions, alertActions } from '../../../actions';
import { useHistory } from 'react-router-dom';

import NoImage from '../../../assets/images/no-img.png';

function Movies() {

    const [currentPage, setCurrentpage] = useState(1);

    const [perPage, setPerpage] = useState(5);

    const [offset, setOffset] = useState(0);

    const [pagMovies, setPagmovies] = useState([]);

    let history = useHistory();

    const moviesData = useSelector(state => state.movies.movies);

    const loading = useSelector(state => state.movies.loading);

    const delLoading = useSelector(state => state.deleteMovie.loading);

    const error = useSelector(state => state.movies.error);

    const alert = useSelector(state => state.alert);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(movieActions.fetchMovies());
        dispatch(alertActions.clear());
    }, []);

    function handlePagination(data, page, pPage, offset){
        setOffset(offset);
        setCurrentpage(page);
        setPerpage(pPage);
        setPagmovies(data);
    }

    function handleDelete(id){
        dispatch(movieActions.deleteMovie(id));
        let datas = [];
        pagMovies.forEach(item => {
            if(item.id !== id){
                datas.push(item);
            }
        });
        setPagmovies(datas);
    }

    function handleEdit(id){
        history.push('/admin/edit/movie/'+id);
    }

    function handleView(id){
        history.push('/admin/view/movie/'+id);
    }

    return (
        <React.Fragment>
            <PageHeader 
                title="Movies"
                addButton={true}
                addTitle="Add Movie"
                addLink="/admin/add/movie"/>

            {loading && <div className="d-flex justify-content-center align-items-center py-3">
                <Spinner animation="border" role="status" className="mr-2">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <span>Fetching movies...</span>
            </div>}

            {delLoading && <div className="d-flex justify-content-center py-3">
                <Spinner animation="border" role="status" className="mr-2">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <span>Deleting movie...</span>
            </div>}

            {error && <AlertDismissible 
                title="Error!!"
                variant="danger"
                message={error} />}

            {alert.type && alert.message && <AlertDismissible 
                title={alert.type === 'danger' ? 'Error!!' : 'Success!!'}
                variant={alert.type}
                message={alert.message} />}

            <MPagination 
                currentPage={currentPage}
                data={moviesData} 
                perPage={perPage}
                handlePagination={handlePagination} />

            <Table responsive="sm" hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Released</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pagMovies.length > 0 && pagMovies.map((movie, index) => {
                        return (
                            <tr key={index}>
                                <td>{offset + index + 1}</td>
                                <td>
                                    <Image src={movie.poster ? movie.poster : NoImage}  height={100}/>
                                </td>
                                <td>{movie.title}</td>
                                <td>{movie.released}</td>
                                <td className="d-flex justify-content-start align-items-center">
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(movie.id)}  className="mr-2">
                                        Delete
                                    </Button>
                                    <Button variant="primary" size="sm" onClick={() => handleEdit(movie.id)} className="mr-2">
                                        Edit
                                    </Button>
                                    <Button variant="secondary" size="sm" onClick={() => handleView(movie.id)} >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </React.Fragment>
    )
}

export { Movies };