import React, { Component } from "react";

import Post from "./post";
import { connect } from "react-redux";
import { Loans } from "../store/postSlice";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    data: [],
  };
  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      this.props.history.replace("/");
    }
  }
  componentDidMount() {
    const jwt = this.props.user.token;

    try {
      if (jwt) {
        const dispatch = this.props.dispatch;

        dispatch(
          Loans({
            "Content-Type": "application/json",
            Authorization: `JWT ${jwt}`,
          })
        );
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className=" col-4 alert alert-primary">
          welcome {localStorage.getItem('username')}
        </div>
        <div className="row">
          {this.props.state.map((post) => (
            <Post post={post} />
          ))}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.loans,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
