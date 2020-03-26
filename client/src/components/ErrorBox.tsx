import React, { PureComponent } from 'react';

interface ErrorBoxProps {
    errors: number[];
}

interface ErrorBoxState {
    defaultMessage: string;
    message: string;
    errorCodes: number[];
}

export default class ErrorBox extends PureComponent<ErrorBoxProps, ErrorBoxState> {
    constructor(props: ErrorBoxProps) {
        super(props);

        this.state = {
            defaultMessage: 'Error creating new person! Check input fields!',
            message: '',
            errorCodes: []
        };
    }

    buildMessage = () => {
        if (this.state.errorCodes.length > 0) {
            let errorCode = this.state.errorCodes.join('');
            this.setState({
                message: this.state.defaultMessage + ' Code: x' + errorCode
            });
        }
    };

    init = () => {
        this.setState(
            {
                errorCodes: this.props.errors
            },
            () => this.buildMessage()
        );
    };

    componentDidMount = () => {
        this.init();
    };

    componentDidUpdate = () => {
        if (this.state.errorCodes !== this.props.errors) {
            this.init();
        }
    };

    render() {
        if (this.state.message.length > 0) {
            return (
                <div className="error-box-wrap">
                    <div className="error-box-error">{this.state.message}</div>
                </div>
            );
        } else {
            return null;
        }
    }
}
