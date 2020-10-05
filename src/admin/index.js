import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router-dom';
import { Header, Sidebar } from './components';
import { Container, Row } from 'react-bootstrap';
import { PrivateRoute } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../actions';
import {
    AddMovie,
    Dashboard,
    EditMovie,
    Movies,
    ViewMovie,
    Genres,
    AddGenre,
    EditGenre,
    ViewGenre,
    Casts,
    AddCast,
    EditCast,
    ViewCast,
    Login
} from './pages';

function AdminLayout() {

    let { path } = useRouteMatch();

    let location = useLocation();

    const [showSidebar, setShowSidebar] = useState(false);

    const dispatch = useDispatch();

    function toggleSidebar() {
        setShowSidebar(!showSidebar);
    }

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if(localStorage.getItem('user') && !isAuthenticated) {
            dispatch(authActions.autoLogin('Admin'));
        }
    }, [])

    return (
        <React.Fragment>
            <PrivateRoute path={path}>
                <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
                <Container fluid>
                    <Row>
                        <Sidebar show={showSidebar} />
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                            <Route exact path={`${path}/dashboard`} component={Dashboard} />
                            <Route path={`${path}/movies`} component={Movies} />
                            <Route path={`${path}/genres`} component={Genres} />
                            <Route path={`${path}/casts`} component={Casts} />
                            <Route path={`${path}/add/cast`} component={AddCast} />
                            <Route path={`${path}/add/genre`} component={AddGenre} />
                            <Route path={`${path}/add/movie`} component={AddMovie} />
                            <Route path={`${path}/edit/movie/:id`} component={EditMovie} />
                            <Route path={`${path}/view/movie/:id`} component={ViewMovie} />
                            <Route path={`${path}/edit/genre/:id`} component={EditGenre} />
                            <Route path={`${path}/view/genre/:id`} component={ViewGenre} />
                            <Route path={`${path}/edit/cast/:id`} component={EditCast} />
                            <Route path={`${path}/view/cast/:id`} component={ViewCast} />
                        </main>
                    </Row>
                </Container>
            </PrivateRoute>
        </React.Fragment>
    )
}

export default AdminLayout;