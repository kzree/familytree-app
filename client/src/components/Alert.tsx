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
            <div className="alert-box-inner">
                <div className="alert-box-title">Alert</div>
                <div className="alert-box-text">{props.text}</div>
                <div className="alert-box-btn">
                    <ButtonSmallAlt text="Close" handleClick={props.handleClose} />
                </div>
            </div>
        </div>
    );
};

export default Alert;
