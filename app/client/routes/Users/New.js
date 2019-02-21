import React, { Component } from "react";
import { connect } from "react-redux";
import Api from "../../api";
import Wrapper from "../../components/Wrapper";

class Edit extends Component {
  state = {
    name: "",
    email: "",
    role: "1",
    password:""
  };

  onSubmit(e) {
    e.preventDefault();
    const { account, history } = this.props;
    const { name, email, role, password } = this.state;
    const data = { name, email, role, password };

    Api.CreateUser(account.tokenAuth, data).then(res => {
      if (res.status === 201) history.push("/user");
      else console.log(res.message);
    }).catch(err => console.log(err.message));
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, email, role, password } = this.state;
    const { history } = this.props;
    return (
      <Wrapper>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div>
            <label>Role</label>
            <select
              name="role"
              onChange={this.onChange.bind(this)}
              value={role}
            >
              <option value="1">Super Admin</option>
              <option value="2">Admin</option>
            </select>
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => history.push('/user')}>Cancel</button>
        </form>
      </Wrapper>
    );
  }
}
export default connect(s => ({ account: s.account }))(Edit);
