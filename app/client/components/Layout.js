import React, { Component } from "react";
import ErrorCatch from "../components/ErrorCatch";

export default class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <ErrorCatch>
        {children}
      </ErrorCatch>
    );
  }
}