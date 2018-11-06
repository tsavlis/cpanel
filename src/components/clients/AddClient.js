import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class AddClient extends React.Component {
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
      </div>
    );
  }
}

AddClient.propTypes = {};

export default AddClient;
