import React from 'react';

const ButtonBig = (props: { handleClick?: VoidFunction; text: string }) => {
    return (
        <div className="button-big-wrap" onClick={props.handleClick}>
            <div className="button-big-text">{props.text}</div>
        </div>
    );
};

export const ButtonBigAlt = (props: {
    handleClick?: VoidFunction;
    text: string;
}) => {
    return (
        <div className="button-big-alt-wrap" onClick={props.handleClick}>
            <div className="button-big-text">{props.text}</div>
        </div>
    );
};

export default ButtonBig;
