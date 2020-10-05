import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import PublicLayout from './pages';
import AdminLayout from './admin';
import {Login} from './admin/pages';
import UserLogin from './pages/Login';
import PageNotFound from './pages/PageNotFound';

function App() {

  return (
    <Switch>
      <Redirect exact from="/" to="/public" />
      <Redirect exact from="/admin" to="/admin/dashboard" />
      <Route path="/public" component={PublicLayout}/>
      <Route path="/login" component={UserLogin}/>
      <Route path="/admin/login" component={Login}/>
      <Route path="/admin" component={AdminLayout}/>
      <Route path="/*" component={PageNotFound}/>
    </Switch>
  );
}

export default App;
