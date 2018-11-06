import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class AddClient extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const newCLient = this.state;
    const { firestore } = this.props;

    if (newCLient.balance === "") {
      newCLient.balance = 0;
    }
    firestore
      .add({ collection: "clients" }, newCLient)
      .then(() => this.props.history.push("/"));
  };
  render() {
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
                    value={this.state.firstName}
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
                    value={this.state.lastName}
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
                    value={this.state.email}
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
                    value={this.state.phone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    className="form-control"
                    type="text"
                    name="balance"
                    minLength="1"
                    required
                    onChange={this.onChange}
                    value={this.state.balance}
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
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);
