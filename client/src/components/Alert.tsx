import React from 'react';
import cx from 'classnames';
import Button from './Button';

interface PropTypes {
    text: string;
    open: boolean;
    handleClose: VoidFunction;
}

const Alert = ({ text, open, handleClose }: PropTypes) => {
    return (
        <section className={cx('alert-box', { open })}>
            <div className="alert-box__inner">
                <h3 className="alert-box__title">Alert</h3>
                <p className="alert-box__text">{text}</p>
                <div className="alert-box__btn">
                    <Button buttonText="Close" handleClick={handleClose} size="small" theme="alt" />
                </div>
            </div>
        </section>
    );
};

export default Alert;
