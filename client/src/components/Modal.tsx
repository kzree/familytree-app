import React from 'react';
import { IoMdCloseCircle } from 'react-icons/all';
import cx from 'classnames';

interface ModalProps {
    children?: any;
    open: boolean;
    onClose: VoidFunction;
}

const Modal = (props: ModalProps) => {
    let open = props.open;
    return (
        <div className={cx('modal', { open })}>
            <div className={'modal__inner'}>
                <IoMdCloseCircle className={'close'} onClick={props.onClose} />
                {props.children}
            </div>
        </div>
    );
};

export default Modal;
