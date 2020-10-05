import React, { useEffect, useState } from 'react';
import { PageHeader, AlertDismissible, MPagination } from '../../components';
import { castActions, alertActions } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Button, Table} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Casts() {

    const [currentPage, setCurrentpage] = useState(1);

    const [perPage, setPerpage] = useState(5);

    const [offset, setOffset] = useState(0);

    const [pagCasts, setPagcasts] = useState([]);

    let history = useHistory();

    const dispatch = useDispatch();

    const casts = useSelector(state => state.casts.casts);

    const loading = useSelector(state => state.casts.loading);

    const delLoading = useSelector(state => state.deleteCast.loading);

    const alert = useSelector(state => state.alert);

    useEffect(() => {
        dispatch(castActions.fetchCasts());
        dispatch(alertActions.clear());
    }, [])

    function handlePagination(data, page, pPage, offset){
        setOffset(offset);
        setCurrentpage(page);
        setPerpage(pPage);
        setPagcasts(data);
    }

    function handleDelete(id) {
        dispatch(castActions.deleteCast(id));
        let datas = [];
        pagCasts.forEach(item => {
            if (item.id !== id) {
                datas.push(item);
            }
        });
        setPagcasts(datas);
    }

    function handleEdit(id) {
        history.push('/admin/edit/cast/' + id);
    }

    function handleView(id) {
        history.push('/admin/view/cast/' + id);
    }

    return (
        <React.Fragment>
            <PageHeader
                title="Casting Members"
                addButton={true}
                addTitle="Add Member"
                addLink="/admin/add/cast"
            />

            {loading && <div className="d-flex justify-content-center align-items-center py-3">
                <Spinner animation="border" role="status" className="mr-2">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <span>Fetching casting members...</span>
            </div>}

            {delLoading && <div className="d-flex justify-content-center py-3">
                <Spinner animation="border" role="status" className="mr-2">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <span>Deleting casting member...</span>
            </div>}

            {alert.type && alert.message && <AlertDismissible
                title={alert.type === 'danger' ? 'Error!!' : 'Success!!'}
                variant={alert.type}
                message={alert.message} />}

            <MPagination
                currentPage={currentPage}
                data={casts}
                perPage={perPage}
                handlePagination={handlePagination} />

            <Table responsive="sm" hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Born</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pagCasts.length > 0 && pagCasts.map((cast, index) => {
                        return (
                            <tr key={index}>
                                <td>{offset + index + 1}</td>
                                <td>{cast.name}</td>
                                <td>{cast.born ? cast.born : 'Undefined'}</td>
                                <td className="d-flex justify-content-start align-items-center">
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(cast.id)}  className="mr-2">
                                        Delete
                                    </Button>
                                    <Button variant="primary" size="sm" onClick={() => handleEdit(cast.id)} className="mr-2">
                                        Edit
                                    </Button>
                                    <Button variant="secondary" size="sm" onClick={() => handleView(cast.id)} >
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

export { Casts }