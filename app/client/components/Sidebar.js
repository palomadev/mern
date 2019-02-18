import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
class Sidebar extends Component {
  render() {
    const { account } = this.props;
    const Link = ({ to, name }) => (
      <NavLink exact to={to} activeClassName="active">
        {name}
      </NavLink>
    );

    return (
      <div>
        <h3>Paloma Dev</h3>
        <hr />
        <Link to="/profile" name="Profile" />
        <hr />
        <Link to="/" name="Dashboard" />
        <hr />
        {account.role === 1 && <Link to="/user" name="Admin Users" />}
      </div>
    )
  }
}
export default connect(s => ({ account: s.account }))(Sidebar);