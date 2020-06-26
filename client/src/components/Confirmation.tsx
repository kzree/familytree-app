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
                <div className="alert-box__title">Confirm</div>
                <div className="alert-box__text">{text}</div>
                <div className="confirmation-box__btn-container">
                    <div className="confirmation-box__btn">
                        <Button buttonText="No" handleClick={handleClose} size="small" theme="negative" />
                    </div>
                    <div className="confirmation-box__btn">
                        <Button buttonText="Yes" handleClick={handleClose} size="small" theme="alt" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
