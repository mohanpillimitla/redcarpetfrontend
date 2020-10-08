import React, { Component } from "react";

import { connect } from "react-redux";
import { addLoan } from "../store/postSlice";

class AddSong extends Component {
  state = {
    amount: 0,
    duration: null,
    emi: 0,
    interest_rate: 0,
    loan_taken_on: null,
    timezone: null,
    remaing_amount_to_pay: 0,
    any_discounts: 0
  };
  componentDidUpdate() {
    if (this.props.success) {
      this.props.history.replace("/home");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = this.state;
      this.props.dispatch(addLoan(data));
    } catch (error) {
      console.log(error.response);
    }
  };

  render() {
    return (
      <div className="container ml-auto mr-auto mt-5">
        <div className="alert alert-info text-center ">Login</div>
        {this.props.last && (
          <div className="form-group alert alert-info text-center">
            {this.props.last}
          </div>
        )}
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label for="exampleInputEmail1">amount</label>
            <input
              type="text"
              className="form-control"
              id="amount"
              aria-describedby="emailHelp"
              onChange={this.onChange}
            />
            <label for="exampleInputEmail1">duration</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              aria-describedby="emailHelp"
              onChange={this.onChange}
            />
            <label for="exampleInputEmail1">emi</label>
            <input
              type="text"
              className="form-control"
              id="emi"
              aria-describedby="emailHelp"
              onChange={this.onChange}
            /><label for="exampleInputEmail1">interest_rate</label>
            <input
              type="text"
              className="form-control"
              id="interest_rate"
              aria-describedby="emailHelp"
              onChange={this.onChange}
            />
            <label for="exampleInputEmail1">loan_taken_on</label>
            <input
              type="text"
              className="form-control"
              id="loan_taken_on"
              aria-describedby="emailHelp"
              onChange={this.onChange}
            />
            <label for="exampleInputEmail1">timezone</label>
            <input
              type="text"
              className="form-control"
              id="timezone"
              aria-describedby="emailHelp"
              onChange={this.onChange}
            />
            <label for="exampleInputEmail1">remaing_amount_to_pay</label>
            <input
              type="text"
              className="form-control"
              id="remaing_amount_to_pay"
              aria-describedby="emailHelp"
              onChange={this.onChange}
            /><label for="exampleInputEmail1">any_discounts</label>
            <input
              type="text"
              className="form-control"
              id="any_discounts"
              aria-describedby="emailHelp"
              onChange={this.onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.isAuthenticated,
    success: state.justUpdated,
    last: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSong);
