import React from 'react';
import { ButtonSmallAlt } from '../components/Button';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
    <div className="not-found-wrap">
        <div className="not-found-title">Page not found!</div>
        <div className="not-found-text">It seems that the page you tried to access does not exist.</div>
        <div className="not-found-text">Return to the home page.</div>
        <div className="not-found-btn">
            <Link to={'/'}>
                <ButtonSmallAlt text="Home" />
            </Link>
        </div>
    </div>
);

export default NotFoundPage;
