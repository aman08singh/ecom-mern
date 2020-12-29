import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              {/* <b>Build</b> a login/auth app with the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
              scratch */}Welcome to the {" "}
              <b>AutoZone</b> login/auth app.{" "}
              {/* <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
              scratch */}
            </h4>
            {/* <p className="flow-text grey-text text-darken-1">
              Create a (minimal) full stack app with user authentication via
              passport and JWTs
            </p> */}
            <p className="flow-text grey-text text-darken-1">
              With user authentication via passport and JWTs
            </p>
            <br />
            <h5>
            AutoZone, Inc. is an American retailer of aftermarket automotive parts and accessories, the largest in the United States. Founded in 1979, AutoZone has over 6,300 stores across the United States, Mexico, and Brazil.
            </h5>
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large hoverable waves-effect white black-text"
                // className="btn btn-large waves-effect waves-light hoverable white black-text accent-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
