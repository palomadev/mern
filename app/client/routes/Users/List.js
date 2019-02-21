import React, { Component } from "react";
import { connect } from "react-redux";
import Api from "../../api";
import Wrapper from "../../components/Wrapper";

class List extends Component {
  state = {
    users: []
  };

  componentWillMount() {
    this.getAllUsers();
  }

  getAllUsers = async () => {
    const { account } = this.props;
    const users = await Api.GetAllUser(account.tokenAuth);
    this.setState({ users });
  };

  deleteUser(id) {
    const { account } = this.props;

    Api.DeleteUser(account.tokenAuth, id).then(res => {
      if (res.status === 201) this.getAllUsers();
    }).catch(console.log);
  }

  render() {
    const { history } = this.props;
    const { users } = this.state;
    return (
      <Wrapper>
        <h1>User's List</h1>
        <button onClick={() => history.push('/user/new')}>Add User</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.data && users.data.map((r, i) => {
              return (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>{r.role == 1 ? "Super Admin" : "Admin"}</td>
                  <td>
                    <a href="javascript:;" onClick={() => history.push(`/user/edit/${r._id}`)}>Edit</a>
                    <a href="javascript:;" onClick={this.deleteUser.bind(this, r._id)}>Delete</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Wrapper>
    );
  }
}
export default connect(s => ({ account: s.account }))(List);
