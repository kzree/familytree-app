import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo = () => (
    <div className="header-logo">
        <Link to={'/'}>
            <div className="header-logo__img">FAMI</div>
        </Link>
    </div>
);

const HeaderDeco = () => (
    <div className="header-deco">
        <div className="header-deco__square--a"></div>
        <div className="header-deco__square--b"></div>
    </div>
);

export const Header = () => (
    <div className="header">
        <div className="header__content">
            <HeaderLogo />
        </div>
        <HeaderDeco />
    </div>
);

export default Header;
