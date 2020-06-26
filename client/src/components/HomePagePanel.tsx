import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

interface PropTypes {
    title: string;
    path: string;
    buttonText: string;
    theme: number;
}

const HomePagePanel = ({ title, path, buttonText, theme }: PropTypes) => {
    const panelTheme = theme ? 'lower-panel--a' : 'lower-panel--b';
    return (
        <div className={panelTheme}>
            <div className="lower-panel__text-area">
                <div className="lower-panel__header">{title}</div>
                <div className="lower-panel__body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.Doloremque neque beatae quos repellat atque
                    iste, quibusdam reiciendis?Debitis, quis cupiditate rem nihil cum itaque, natus dolorem sed
                    obcaecati quam culpa, corporis temporibus laboriosam?
                </div>
            </div>
            <Link to={path}>
                <Button buttonText={buttonText} size="big" theme={theme ? 'main' : 'alt'} />
            </Link>
        </div>
    );
};

export default HomePagePanel;
