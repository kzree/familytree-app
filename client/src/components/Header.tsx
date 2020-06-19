import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo = () => (
    <div className="header-logo-wrap">
        <Link to={'/'}>
            <div className="header-logo">FAMI</div>
        </Link>
    </div>
);

const HeaderDeco = () => (
    <div className="header-deco-wrap">
        <div className="header-deco-f"></div>
        <div className="header-deco-s"></div>
    </div>
);

export const Header = () => (
    <div className="header-wrap">
        <div className="header-content">
            <HeaderLogo />
        </div>
        <HeaderDeco />
    </div>
);

export default Header;
