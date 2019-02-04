import React, { Component } from 'react';

export default class ErrorCatch extends Component {
    state = {
        hasError: false,
        errorMessage: 'Generic message'
    }

    componentDidCatch(error, info) {
        console.error(error, info);
        this.setState({ hasError: true, errorMessage: error.message });
    }

    render() {
        const { children } = this.props;
        const { hasError, errorMessage } = this.state;

        if (!hasError) return (children);
        else return (
            <div>
                <span style={{ fontSize: 150 }}>X</span>
                <h1>Ups, something went wrong!</h1>
                <h2>Please, Try Again</h2>
                {errorMessage && errorMessage.length > 0 &&
                    <div>
                        <h3>Message:</h3>
                        <div>{errorMessage}</div>
                    </div>}
            </div>
        )
    }
}