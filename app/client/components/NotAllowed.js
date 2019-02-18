import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class NotAllowed extends Component {

    render() {
        return (
            <div>
                <span>!!</span>
                <h1>Ups!, You are not allowed to be here...</h1>
                <Link to='/'><h2>Go Home</h2></Link>
            </div>
        );
    }
}
