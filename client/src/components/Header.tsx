import React, { Component } from 'react';
import '../style/Header.css';
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

const HeaderItem = (props: { text: string; link: string }) => {
    return (
        <div className="header-item-wrap">
            <Link to={props.link}>{props.text}</Link>
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
                    <HeaderItem text="List" link="/all" />
                </div>
                <HeaderDeco />
            </div>
        );
    }
}
