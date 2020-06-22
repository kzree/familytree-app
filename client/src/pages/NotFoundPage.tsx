import React from 'react';
import { ButtonSmallAlt } from '../components/Button';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
    <div className="notfound-page">
        <div className="notfound-page__title">Page not found!</div>
        <div className="notfound-page__text">It seems that the page you tried to access does not exist.</div>
        <div className="notfound-page__text">Return to the home page.</div>
        <div className="notfound-page__btn">
            <Link to={'/'}>
                <ButtonSmallAlt text="Home" />
            </Link>
        </div>
    </div>
);

export default NotFoundPage;
