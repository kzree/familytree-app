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
    let panelTheme;
    props.theme ? (panelTheme = 'home--lower-panel__a') : (panelTheme = 'home--lower-panel__b');
    return (
        <div className={panelTheme}>
            <div className="home-lower-panel-t-wrap">
                <div className="home-lower-panel-t-head">{props.title}</div>
                <div className="home-lower-panel-t-body">
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
