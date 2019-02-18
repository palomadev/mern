import React, { Component } from "react";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";

class Dashboard extends Component {
  render() {
    return (
      <Wrapper>
        Hello, {this.props.account.email}
      </Wrapper>
    );
  }
}

export default connect(s => ({ account: s.account }))(Dashboard);
