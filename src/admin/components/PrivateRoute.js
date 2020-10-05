import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector } from 'react-redux';

function PrivateRoute({ children, ...rest }) {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if(localStorage.getItem('user') || isAuthenticated) {
                    return children;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/admin/login',
                                state: { from: location }
                            }}
                        />
                    );
                }
            }}
        />
    );
}

export { PrivateRoute };