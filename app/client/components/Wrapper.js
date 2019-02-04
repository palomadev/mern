import React, { Component } from "react";
import { connect } from "react-redux";

class Wrapper extends Component {
  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  render() {
    const { children, title } = this.props;
    return (
      <div>
        {title && <h5>{title}</h5>}
        <button type="button" onClick={this.onLogout}>Logout</button>
        {children}
      </div>
    );
  }
}

export default connect(s => ({ account: s.account }))(Wrapper);
