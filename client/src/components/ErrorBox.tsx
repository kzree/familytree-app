import React, { useState, useEffect } from 'react';

interface ErrorBoxProps {
    errors: number[];
}

export const ErrorBox = (props: ErrorBoxProps) => {
    const defaultMessage = 'Error creating new person! Check input fields!';

    const [message, setMessage] = useState('');
    const [errorCodes, setErrorCodes] = useState<number[]>([]);


    useEffect(() => {
        setErrorCodes(props.errors);

        const buildMessage = () => {
            if (errorCodes.length > 0) {
                let errorCode = errorCodes.join('');
                setMessage(defaultMessage + ' Code: x' + errorCode);
            } else {
                setMessage('');
            }
        };

        buildMessage();

    }, [errorCodes, props.errors])

    return (
        <div className="error-box-wrap">
            <div className="error-box-error">{message}</div>
        </div>
    );
}

export default ErrorBox;