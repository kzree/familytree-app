import React from 'react';
import cx from 'classnames';
import Button from './Button';

interface ConfirmationProps {
    text: string;
    open: boolean;
    handleClose: VoidFunction;
    handleOk?: VoidFunction;
}

const Confirmation = ({ text, open, handleClose, handleOk }: ConfirmationProps) => {
    return (
        <div className={cx('alert-box', { open })}>
            <div className="alert-box__inner">
                <h3 className="alert-box__title">Confirm</h3>
                <p className="alert-box__text">{text}</p>
                <div className="confirmation-box__btn-container">
                    <div className="confirmation-box__btn-wrap">
                        <Button buttonText="No" handleClick={handleClose} size="small" theme="negative" />
                    </div>
                    <div className="confirmation-box__btn-wrap">
                        <Button buttonText="Yes" handleClick={handleClose} size="small" theme="alt" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
