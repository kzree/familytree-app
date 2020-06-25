import React from 'react';
import { Link } from 'react-router-dom';
import ButtonBig, { ButtonBigAlt } from './Button';

interface PropTypes {
    title: string;
    path: string;
    buttonText: string;
    theme: number;
}

const HomePagePanel = (props: PropTypes) => {
    const panelTheme = props.theme;
    return (
        <div className={panelTheme ? 'lower-panel--a' : 'lower-panel--b'}>
            <div className="lower-panel__text-area">
                <div className="lower-panel__header">{props.title}</div>
                <div className="lower-panel__body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.Doloremque neque beatae quos repellat atque
                    iste, quibusdam reiciendis?Debitis, quis cupiditate rem nihil cum itaque, natus dolorem sed
                    obcaecati quam culpa, corporis temporibus laboriosam?
                </div>
            </div>
            <Link to={props.path}>
                {props.theme === 1 && <ButtonBig text={props.buttonText} />}
                {props.theme === 0 && <ButtonBigAlt text={props.buttonText} />}
            </Link>
        </div>
    );
};

export default HomePagePanel;
