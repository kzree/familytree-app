import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Header from '../components/Header';
import PeoplePage from '../pages/PeoplePage';
import PersonPage from '../pages/PersonPage';
import FamilyPage from '../pages/FamilyPage';
import SearchPage from '../pages/SearchPage';
import FamiliesPage from '../pages/FamiliesPage';
import NotFoundPage from '../pages/NotFoundPage';
import FamilyAdditionPage from '../pages/FamilyAdditionPage';

// prettier-ignore
export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path={'/'} component={Header} />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/viewall" exact component={PeoplePage} />
                    <Route path="/viewall/families" exact component={FamiliesPage}/>
                    <Route path="/person/:id" exact component={PersonPage} />
                    <Route path="/family/:id" exact component={FamilyPage} />
                    <Route path="/search" exact component={SearchPage} />
                    <Route path="/add/Family" exact component={FamilyAdditionPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}
