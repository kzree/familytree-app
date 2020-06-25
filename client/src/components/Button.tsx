import React from 'react';

const ButtonBig = (props: { handleClick?: VoidFunction; text: string }) => (
    <div className="btn btn--big" onClick={props.handleClick}>
        <div className="btn__text btn__text--big">{props.text}</div>
    </div>
);

export const ButtonBigAlt = (props: { handleClick?: VoidFunction; text: string }) => (
    <div className="btn btn--big btn--alt" onClick={props.handleClick}>
        <div className="btn__text btn__text--big">{props.text}</div>
    </div>
);

export const ButtonSmall = (props: { handleClick?: VoidFunction; text: string }) => (
    <div className="btn btn--small" onClick={props.handleClick}>
        <div className="btn__text btn__text--small">{props.text}</div>
    </div>
);

export const ButtonSmallAlt = (props: { handleClick?: VoidFunction; text: string }) => (
    <div className="btn btn--small btn--alt" onClick={props.handleClick}>
        <div className="btn__text btn__text--small">{props.text}</div>
    </div>
);

export const ButtonSmallAltNegative = (props: { handleClick?: VoidFunction; text: string }) => (
    <div className="btn btn--small btn--alt btn--negative" onClick={props.handleClick}>
        <div className="btn__text btn__text--small">{props.text}</div>
    </div>
);

export default ButtonBig;
