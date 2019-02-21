import React, { Component } from "react";
import { connect } from "react-redux";
import Api from "../../api";
import Wrapper from "../../components/Wrapper";

class Edit extends Component {
  state = {
    id: this.props.match.params.id || "",
    name: "",
    email: "",
    role: ""
  };

  componentWillMount() {
    this.getUser();
  }

  getUser = () => {
    const { account, history } = this.props;
    const { id } = this.state;

    Api.GetUser(account.tokenAuth, id).then(res => {
      if (res.status === 201) {
        const { name, email, role } = res.data;
        this.setState({ name, email, role });
      } else history.push('/user');
    }).catch(err => history.push("/user"));
  };


  onSubmit(e) {
    e.preventDefault();
    const { account, history } = this.props;
    const { name, email, role, id } = this.state;
    const data = { name, email, role, id };

    Api.UpdateUser(account.tokenAuth, data).then(res => {
      if (res.status === 201) history.push("/user");
      else console.log(res.message);
    }).catch(err => console.log(err.message));
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, email, role, id } = this.state;
    const { account, history } = this.props;
    const roleDisabled = account._id === id ? "disabled" : "";
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
              type="text"
              value={email}
              disabled
            />
          </div>
          <div>
            <label>Role</label>
            <select
              name="role"
              onChange={this.onChange.bind(this)}
              value={role}
              disabled={roleDisabled}
            >
              <option value="1">Super Admin</option>
              <option value="2">Admin</option>
            </select>
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => history.push('/user')}>Cancel</button>
        </form>
      </Wrapper>
    );
  }
}
export default connect(s => ({ account: s.account }))(Edit);
