import React, { useEffect, useState } from 'react';
import { PageHeader, AlertDismissible, MPagination } from '../../components';
import { genreActions, alertActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Button, Table} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Genres() {

    const [currentPage, setCurrentpage] = useState(1);

    const [perPage, setPerpage] = useState(5);

    const [offset, setOffset] = useState(0);

    const [pagGenres, setPaggenres] = useState([]);

    let history = useHistory();

    const dispatch = useDispatch();

    const genres = useSelector(state => state.genres.genres);

    const loading = useSelector(state => state.genres.loading);

    const delLoading = useSelector(state => state.deleteGenre.loading);

    const alert = useSelector(state => state.alert);

    useEffect(() => {
        dispatch(genreActions.fetchGenres('user'));
        dispatch(alertActions.clear());
    }, [])

    function handlePagination(data, page, pPage, offset){
        setOffset(offset);
        setCurrentpage(page);
        setPerpage(pPage);
        setPaggenres(data);
    }

    function handleDelete(id) {
        dispatch(genreActions.deleteGenre(id));
        let datas = [];
        pagGenres.forEach(item => {
            if (item.id !== id) {
                datas.push(item);
            }
        });
        setPaggenres(datas);
    }

    function handleEdit(id) {
        history.push('/admin/edit/genre/' + id);
    }

    function handleView(id) {
        history.push('/admin/view/genre/' + id);
    }

    return (
        <React.Fragment>
            <PageHeader
                title="Genres"
                addButton={true}
                addTitle="Add Genre"
                addLink="/admin/add/genre"
            />

            {loading && <div className="d-flex justify-content-center align-items-center py-3">
                <Spinner animation="border" role="status" className="mr-2">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <span>Fetching genres...</span>
            </div>}

            {delLoading && <div className="d-flex justify-content-center py-3">
                <Spinner animation="border" role="status" className="mr-2">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <span>Deleting genre...</span>
            </div>}

            {alert.type && alert.message && <AlertDismissible
                title={alert.type === 'danger' ? 'Error!!' : 'Success!!'}
                variant={alert.type}
                message={alert.message} />}

            <MPagination
                currentPage={currentPage}
                data={genres}
                perPage={perPage}
                handlePagination={handlePagination} />

            <Table responsive="sm" hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pagGenres.length > 0 && pagGenres.map((genre, index) => {
                        return (
                            <tr key={index}>
                                <td>{offset + index + 1}</td>
                                <td>{genre.name}</td>
                                <td className="d-flex justify-content-start align-items-center">
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(genre._id)}  className="mr-2">
                                        Delete
                                    </Button>
                                    <Button variant="primary" size="sm" onClick={() => handleEdit(genre._id)} className="mr-2">
                                        Edit
                                    </Button>
                                    <Button variant="secondary" size="sm" onClick={() => handleView(genre._id)} >
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

export { Genres }