import React, { Component } from "react";

export default class Sidebar extends Component {
  render() {
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