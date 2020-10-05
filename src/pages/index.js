import React, { useEffect } from 'react';
import { useRouteMatch,Route } from 'react-router-dom';
import Home from './Home';
import Popular from './Popular';
import Released from './NewReleased';
import {Header,Footer} from '../components';
import MovieDetail from './MovieDetail';
import {authActions} from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import MyAccount from './MyAccount';
import Search from './Search';
import SignUp from './SignUp';
import GenrePage from './GenrePage';

function PublicLayout() {

    let { path } = useRouteMatch();

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            dispatch(authActions.autoLogin('User'));
        }
    },[])

    return (
        <React.Fragment>
            <Header />
            <div role="main" className="main">
                <Route exact path={path} component={Home} />
                <Route path={`${path}/popular`} component={Popular} />
                <Route path={`${path}/releases`} component={Released} />
                <Route path={`${path}/movie/:id`} component={MovieDetail} />
                <Route path={`${path}/account`} component={MyAccount} />
                <Route path={`${path}/search/:searchWord`} component={Search}/>
                <Route path={`${path}/genre/:genre`} component={GenrePage}/>
                <Route path={`${path}/signup`} component={SignUp}/>
                <Footer/>
            </div>
        </React.Fragment>
    )
}

export default PublicLayout;