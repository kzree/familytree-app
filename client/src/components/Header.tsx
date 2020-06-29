import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo = () => (
    <div className="header-logo">
        <Link to={'/'}>
            <h1 className="header-logo__title">FAMI</h1>
        </Link>
    </div>
);

const HeaderDeco = () => (
    <div className="header-deco">
        <div className="header-deco__square header-deco__square--b"></div>
        <div className="header-deco__square header-deco__square--a"></div>
    </div>
);

export const Header = () => (
    <header className="header">
        <div className="header__content">
            <HeaderLogo />
        </div>
        <HeaderDeco />
    </header>
);

export default Header;
