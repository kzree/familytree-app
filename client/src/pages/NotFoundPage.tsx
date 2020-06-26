import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export const NotFoundPage = () => (
    <div className="notfound-page">
        <div className="notfound-page__title">Page not found!</div>
        <div className="notfound-page__text">It seems that the page you tried to access does not exist.</div>
        <div className="notfound-page__text">Return to the home page.</div>
        <div className="notfound-page__btn">
            <Link to={'/'}>
                <Button buttonText="Home" size="small" theme="alt" />
            </Link>
        </div>
    </div>
);

export default NotFoundPage;
