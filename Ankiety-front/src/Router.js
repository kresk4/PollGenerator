'use strict';

import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from './components/Main';
import api from './api';
import {connect} from 'react-redux';
import Loader from './components/Loader';
import UserProfile from './components/UserProfile';
import CreateSurvey from './components/CreateSurvey';
import Login from './components/Login';
import Registration from './components/Registration';


@connect((state) => state.user)
export default class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            loaded: false,
        }
    }

    componentDidMount() {
        return api.getUserDetails()
            .then(() => {
                this.setState({
                    ...this.state,
                    loaded: true,
                })
                this.props.dispatch({
                    type: 'CHANGE_LOGGED_STATUS',
                    payload: true,
                })
            })
            .catch((err) => {
                this.setState({
                    ...this.state,
                    loaded: true,
                })

            })
    }

    render() {
        if (!this.state.loaded) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={() => <Loader size={300} />}></Route>
                    </Switch>
                </BrowserRouter>
            );
        }
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}></Route>
                    <Route path="/userProfile" component={UserProfile}></Route>
                    <Route path="/createSurvey" component={CreateSurvey}></Route>
                    <Route path="/Login" component={Login}></Route>
                    <Route path="/Registration" component={Registration}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
