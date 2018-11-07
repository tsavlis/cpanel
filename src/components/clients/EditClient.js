import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class EditClient extends React.Component {
  constructor(props) {
    super(props);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailNameInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailNameInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(this.props.history.push("/"));
  };
  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-let" />
                Back to dashboard
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Add Client
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstName"
                      minLength="2"
                      required
                      onChange={this.onChange}
                      defaultValue={client.firstName}
                      ref={this.firstNameInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="lastName"
                      minLength="2"
                      required
                      onChange={this.onChange}
                      defaultValue={client.lastName}
                      ref={this.lastNameInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstname">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      minLength="2"
                      required
                      onChange={this.onChange}
                      defaultValue={client.email}
                      ref={this.emailNameInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      className="form-control"
                      type="text"
                      name="phone"
                      minLength="10"
                      required
                      onChange={this.onChange}
                      defaultValue={client.phone}
                      ref={this.phoneInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="balance">Deadline</label>
                    <input
                      className="form-control"
                      type="text"
                      name="balance"
                      minLength="1"
                      required
                      onChange={this.onChange}
                      defaultValue={client.balance}
                      ref={this.balanceInput}
                      disabled={disableBalanceOnEdit}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};
export default compose(
  firestoreConnect(props => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);
