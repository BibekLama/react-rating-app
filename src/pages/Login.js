import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/css/admin/styles.css';
import {
    Card,
    Image,
    Alert
} from 'react-bootstrap';

import Logo from '../assets/images/logo.svg';

import { useHistory } from 'react-router-dom';

import { authActions } from '../actions';

import {LoginForm} from '../components';

function UserLogin() {

    let history = useHistory();

    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);

    const error = useSelector(state => state.auth.error);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if(isAuthenticated){
            history.push('/');
        }
    }, [isAuthenticated])

    function submitForm(username, password) {
        dispatch(authActions.login(username, password, 'User'));
    }

    return (
        <div className="col login">

            <Card className="text-center shadow px-3 col-md-3">

                <Card.Body>

                    <Image src={Logo} width={50} height={50} className="mb-3" />

                    <Card.Title className="mb-3">Login</Card.Title>

                    {error && <Alert variant="danger">
                        {error}
                    </Alert>}

                    <LoginForm onSubmit={submitForm} loading={loading} />

                </Card.Body>

                <Card.Footer className="text-muted">@Movie Rating 2020</Card.Footer>

            </Card>

        </div>
    )
}

export default UserLogin;