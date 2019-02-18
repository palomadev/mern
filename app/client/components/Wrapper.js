import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "../components/Sidebar";

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
        <Sidebar />
        <button type="button" onClick={this.onLogout}>Logout</button>
        <br />
        <br />
        {children}
      </div>
    );
  }
}

export default connect(s => ({ account: s.account }))(Wrapper);
