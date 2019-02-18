import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class NotFound extends Component {

    render() {
        return (
            <div>
                <span>!</span>
                <h1>Ups, seems like your're lost!</h1>
                <Link to='/'><h2>Go Home</h2></Link>
            </div>
        );
    }
}
