import React, { Component } from "react";
import { connect } from "react-redux";
import Wrapper from "../../components/Wrapper";
import styles from "./index.scss";

class Dashboard extends Component {
  render() {
    return (
      <Wrapper>
        <p className={styles.test}>HOLA TEST</p>
        Hello, {this.props.account.name}
      </Wrapper>
    );
  }
}

export default connect(s => ({ account: s.account }))(Dashboard);
