import React from 'react';
import cx from 'classnames';
import { ButtonSmallAlt } from './Button';

interface PropTypes {
    text: string;
    open: boolean;
    handleClose: VoidFunction;
}

const Alert = (props: PropTypes) => {
    let open = props.open;
    return (
        <div className={cx('alert-box', { open })}>
            <div className="alert-box__inner">
                <div className="alert-box__inner__title">Alert</div>
                <div className="alert-box__inner__text">{props.text}</div>
                <div className="alert-box__inner__btn">
                    <ButtonSmallAlt text="Close" handleClick={props.handleClose} />
                </div>
            </div>
        </div>
    );
};

export default Alert;
