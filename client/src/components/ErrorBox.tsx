import React, { useState, useEffect } from 'react';

interface ErrorBoxProps {
    errors: number[];
}

export const ErrorBox = ({ errors }: ErrorBoxProps) => {
    const defaultMessage = 'Error creating new person! Check input fields!';

    const [message, setMessage] = useState('');
    const [errorCodes, setErrorCodes] = useState<number[]>([]);

    useEffect(() => {
        setErrorCodes(errors);

        const buildMessage = () => {
            if (errorCodes.length > 0) {
                const errorCode = errorCodes.join('');
                setMessage(`${defaultMessage} Code: x${errorCode}`);
            } else setMessage('');
        };

        buildMessage();
    }, [errorCodes, errors]);

    return (
        <div className="error-box">
            <p>{message}</p>
        </div>
    );
};

export default ErrorBox;
