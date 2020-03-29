import React from 'react';
import cx from 'classnames';
import { ButtonSmallAlt, ButtonSmallAltNegative } from './Button';

interface ConfirmationProps {
    text: string;
    open: boolean;
    handleClose: VoidFunction;
    handleOk?: VoidFunction;
}

const Confirmation = (props: ConfirmationProps) => {
    let open = props.open;
    return (
        <div className={cx('alert-box', { open })}>
            <div className="alert-box-inner">
                <div className="alert-box-title">Confirm</div>
                <div className="alert-box-text">{props.text}</div>
                <div className="confirmation-box-btn">
                    <div className="confirmation-box-btn-cont">
                        <ButtonSmallAltNegative text="No" handleClick={props.handleClose} />
                    </div>
                    <div className="confirmation-box-btn-cont">
                        <ButtonSmallAlt text="Yes" handleClick={props.handleOk} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
