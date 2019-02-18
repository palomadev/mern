import React, { Component } from "react";
import Api from '../api';

export default class Login extends Component {
  state = {
    errorMessage: "",
    loading: false,
    email: "",
    password: ""
  };

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ loading: true });

    Api.Login({ email, password }).then(res => {
      const { status, data } = res;
      let errorMessage = "";
      if (status === 201) {
        if (data.user.role > 2) errorMessage = "User not authorized";
        else {
          localStorage.setItem("tokenAuth", data.token);
          this.props.history.push("/");
        }
      } else errorMessage = res.message;
      this.setState({ loading: false, errorMessage });
    })
      .catch(err => this.setState({ loading: false, errorMessage: err.message }));
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value, errorMessage: '' });
  }

  render() {
    const { errorMessage, email, password, loading } = this.state;
    return (
      <div>
        <h1>My Mern APP</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Email</label>
          <br />
          <input placeholder="Email" type="email" name="email" value={email} onChange={this.onChange.bind(this)} />
          <br />
          <label>Password</label>
          <br />
          <input placeholder="Password" type="password" name="password" value={password} onChange={this.onChange.bind(this)} />
          <br />
          {loading && <span>Loading...</span>}
          <span style={{ color: 'red' }}>{errorMessage}</span>
          <button>Login</button>
        </form>
      </div>
    );
  }
}