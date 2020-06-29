import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export const NotFoundPage = () => (
    <main className="notfound-page">
        <h2 className="notfound-page__title">Page not found!</h2>
        <p className="notfound-page__text">It seems that the page you tried to access does not exist.</p>
        <p className="notfound-page__text">Return to the home page.</p>
        <nav className="notfound-page__btn">
            <Link to={'/'}>
                <Button buttonText="Home" size="small" theme="alt" />
            </Link>
        </nav>
    </main>
);

export default NotFoundPage;
