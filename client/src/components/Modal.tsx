import React from 'react';
import { IoMdCloseCircle } from 'react-icons/all';
import cx from 'classnames';

interface ModalProps {
    children?: any;
    open: boolean;
    onClose: VoidFunction;
}

const Modal = ({ children, open, onClose }: ModalProps) => {
    return (
        <section className={cx('modal', { open })}>
            <div className={'modal__inner'}>
                <IoMdCloseCircle className={'close'} onClick={onClose} />
                {children}
            </div>
        </section>
    );
};

export default Modal;
