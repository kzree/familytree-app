import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Header from '../components/Header';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path={'/'} component={Header} />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                </Switch>
            </BrowserRouter>
        );
    }
}
