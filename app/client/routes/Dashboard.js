import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Api from "../util/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import moment from "moment";

class Dashboard extends Component {
  state = {
    people: [],
    loading: true,
    totalStylist: 0,
    totalClient: 0,
    csvData: [],
    pages: 0,
    size: 20,
    type: "all"
  };

  headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Email", key: "email" },
    { label: "Type", key: "type" },
    { label: "Created", key: "created_at" }
  ];

  dataPostUsers = {
    type: undefined,
    page: 0,
    size: 20
  };

  async componentWillMount() {
    await this.getAppUser();
  }

  async getAppUser() {
    const { account } = this.props;
    this.setState({ loading: true });

    if (this.dataPostUsers.type === "all") this.dataPostUsers.type = undefined;

    this.dataPostUsers.size = parseInt(this.dataPostUsers.size);
    await Api.GetAppUsers(account.tokenAuth, this.dataPostUsers)
      .then(r =>
        this.setState({
          people: r.data.items,
          pages: r.data.pages,
          totalClient: r.data.totalClient,
          totalStylist: r.data.totalStylist,
          loading: false
        })
      )
      .catch(err => console.log(err));
  }

  onChangeType(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.dataPostUsers[name] = value;
    this.dataPostUsers.page = 0;
    this.getAppUser();
  }

  selectPage(i) {
    this.dataPostUsers.page = i;
    this.getAppUser();
  }

  csvData() {
    const { type } = this.state;
  }

  render() {
    const { people, loading, pages, type, size, totalClient, totalStylist, csvData } = this.state;
    let tableHeader = (
      <tr className="text-left">
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Phone</th>
        <th scope="col">Email</th>
        <th scope="col">Type</th>
        <th scope="col">Created</th>
      </tr>
    );

    let showTable = people.map((r, i) => {
      return (
        <tr key={i}>
          <td>{r.firstName}</td>
          <td>{r.lastName}</td>
          <td>{r.phoneNumber}</td>
          <td>{r.email || "-"}</td>
          <td>{r.type.toUpperCase()}</td>
          <td>{moment(r.created_at).format('YYYY/MM/DD-HH:mma')}</td>
        </tr>
      );
    });

    const { page } = this.dataPostUsers;
    let pagination = (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className={`page-item${page > 0 ? '' : " disabled"} `}>
            <a className="page-link" onClick={() => this.selectPage(page - 1)}>
              Previous
            </a>
          </li>
          {page > 0 ? (
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => this.selectPage(page - 1)}
              >
                {page}
              </a>
            </li>
          ) : undefined}

          <li className="page-item disabled">
            <a className="page-link">
              {page + 1}
            </a>
          </li>

          {page + 1 === pages ? undefined :
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => this.selectPage(page + 1)}
              >
                {page + 2}
              </a>
            </li>
          }

          <li className={`page-item${page + 1 === pages ? ' disabled' : ''}`}>
            <a
              className='page-link'
              onClick={() => this.selectPage(page + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    );

    return (
      <Fragment>
        <Sidebar />
        <Wrapper>
          {!loading ? (
            people.length > 0 ?
              <Fragment>
                <div className="d-flex flex-inline mb-3">
                  <div className="input-group col-md-2 p-0">
                    <select
                      value={type}
                      className="custom-select"
                      name="type"
                      onChange={this.onChangeType.bind(this)}
                    >
                      <option value="all">All</option>
                      <option value="client">Client</option>
                      <option value="stylist">Stylist</option>
                    </select>
                  </div>
                  <div className="input-group col-md-2 ml-2 p-0">
                    <select
                      value={size}
                      className="custom-select"
                      name="size"
                      onChange={this.onChangeType.bind(this)}
                    >
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value={totalClient + totalStylist}>All</option>
                    </select>
                  </div>
                  <div className="col-md-2 pl-5">
                    <div className="row"><b className="pr-2">Total Stylist:</b>{totalStylist}</div>
                    <div className="row"><b className="pr-2">Total Clients:</b>{totalClient}</div>
                    <div className="row"><b className="pr-2">Results:</b>{people.length}</div>
                  </div>
                  <div className="col-md-2 pl-5">
                  </div>
                </div>
                <div
                  className="d-flex flex-row"
                  style={{ flex: 1, overflowY: "scroll" }}
                >
                  <table
                    className="table table-striped table-hover table-borderless"
                    style={{ overflowX: "scroll" }}
                  >
                    <thead>{tableHeader}</thead>
                    <tbody>{showTable}</tbody>
                  </table>
                </div>
                {pagination}
              </Fragment>
              :
              <div
                className={
                  "h-100 d-flex align-items-center justify-content-center text-center"
                }
              >
                <h1 className="font-weight-light pl-2 m-0">
                  Uh-oh, seems like there aren't hours logged for this period
                  time
                </h1>
              </div>
          )
            : <Loading show text="LOADING" />}
        </Wrapper>
      </Fragment>
    );
  }
}

const styles = {
  sizeRow: {
    minWidth: "200px"
  },
  columnFixed: {
    minWidth: "200px",
    position: "relative"
  },
  tbody: {
    overflowY: "scroll",
    overflowX: "hidden",
    width: "max-content"
  }
};
export default connect(s => ({ account: s.account }))(Dashboard);
