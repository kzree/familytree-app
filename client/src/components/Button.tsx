import React from 'react';

const ButtonBig = (props: { handleClick?: VoidFunction; text: string }) => (
    <div className="button-big-wrap" onClick={props.handleClick}>
        <div className="button-big-text">{props.text}</div>
    </div>
);

export const ButtonBigAlt = (props: { handleClick?: VoidFunction; text: string }) => (
    <div className="button-big-alt-wrap" onClick={props.handleClick}>
        <div className="button-big-text">{props.text}</div>
    </div>
);

export const ButtonSmall = (props: { handleClick?: VoidFunction; text: string }) => (
    <div className="button-small-wrap" onClick={props.handleClick}>
        <div className="button-small-text">{props.text}</div>
    </div>
);

export const ButtonSmallAlt = (props: { handleClick?: VoidFunction; text: string }) => (
    <div className="button-small-alt-wrap" onClick={props.handleClick}>
        <div className="button-small-text">{props.text}</div>
    </div>
);

export const ButtonSmallAltNegative = (props: { handleClick?: VoidFunction; text: string }) => (
    <div className="button-small-alt-wrap negative-btn" onClick={props.handleClick}>
        <div className="button-small-text">{props.text}</div>
    </div>
);

export default ButtonBig;
