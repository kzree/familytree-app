import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
    return (
        <div className="header-logo-wrap">
            <Link to={'/'}>
                <div className="header-logo">FAMI</div>
            </Link>
        </div>
    );
};

const HeaderDeco = () => {
    return (
        <div className="header-deco-wrap">
            <div className="header-deco-f"></div>
            <div className="header-deco-s"></div>
        </div>
    );
};

export default class Header extends Component {
    render() {
        return (
            <div className="header-wrap">
                <div className="header-content">
                    <HeaderLogo />
                </div>
                <HeaderDeco />
            </div>
        );
    }
}
