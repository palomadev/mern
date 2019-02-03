import React, { Component, Fragment } from "react";
import { FONTS } from "../config/constants";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Collapse extends Component {
  state = {
    value: "today" || ""
  };

  onSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    if (onSubmit) onSubmit(date);
  }

  changePass() {
    const { changePass } = this.props;
    if (changePass) changePass(true);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { account } = this.props;
    const Link = ({ to, name }) => (
      <NavLink
        exact
        to={to}
        className="text-white nounderline"
        activeClassName="active"
      >
        {name}
      </NavLink>
    );

    let showAppUser = (
      <Fragment>
        <p className="text-white" style={styles.titleDate}>
          <Link to="/panel/profile" name="Profile" />
        </p>
        <hr />
        <p className="text-white" style={styles.titleDate}>
          <Link to="/" name="App Users" />
        </p>
        {account.role === 1 &&
          <Fragment>
            <hr />
            <p className="text-white" style={styles.titleDate}>
              <Link to="/panel/user" name="Admin Users" />
            </p>
            <hr />
          </Fragment>
        }
      </Fragment>
    );
    return <Fragment>{showAppUser}</Fragment>;
  }
}

const styles = {
  titleDate: {
    fontFamily: FONTS.RobotoLight,
    fontSize: 14,
  }
};

export default connect(s => ({ account: s.account }))(Collapse);
