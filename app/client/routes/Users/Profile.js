import React, { Component } from "react";
import { connect } from "react-redux";
import Api from "../../api";
import Wrapper from "../../components/Wrapper";

class Profile extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    role: "",
    password: "",
    repeat_password: ""
  };

  async componentWillMount() {
    const { account } = this.props;
    await this.getUser(account._id);
  }

  getUser = id => {
    const { account, history } = this.props;

    Api.GetUser(account.tokenAuth, id)
      .then(res => {
        if (res.status === 201) {
          const { name, email, role } = res.data;
          this.setState({ name, email, role });
        } else history.push(`/user`);
      })
      .catch(err => { history.push("/user"); });
  };

  cancelEdit() {
    const { history } = this.props;
    history.push(`/`);
  }

  onSubmit(e) {
    e.preventDefault();
    const { account } = this.props;
    const { name, email, role, password } = this.state;
    const data = { name, email, role, password, id: account._id };
    Api.UpdateUser(account.tokenAuth, data).then(res => { this.props.history.push("/") }).catch(err => { this.props.history.push("/") });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value, errorMessage: "" });
  }

  render() {
    const { name, email, role, password, repeat_password } = this.state;
    return (
      <Wrapper>
        <h2>Edit Profile</h2>
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
              type="email"
              value={email}
              disabled
            />
          </div>
          <div>
            <label>Role</label>
            {role == 1 ? "Super Admin" : "Admin"}
          </div>
          <div>
            <label>Password <span>(Optional)</span></label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <div>
            <label>Repeat Password <span>(Optional)</span></label>
            <input
              name="repeat_password"
              type="password"
              value={repeat_password}
              onChange={this.onChange.bind(this)}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={this.cancelEdit.bind(this)}>Cancel</button>
        </form>
      </Wrapper>
    );
  }
}
export default connect(s => ({ account: s.account }))(Profile);
