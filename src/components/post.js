import React, { Component } from "react";

import { Link } from "react-router-dom";

class Post extends Component {
  render() {
    const { id, amount, duration, emi, interest_rate, loan_taken_on, timezone, remaing_amount_to_pay, any_discounts } = this.props.post.loan;
    const status_of_loan = this.props.post.status_of_loan;
    let playlisturl = "/loanstatus/" + id;
    return (
      <div className="col-6">
        <div className="alert alert-info">
          <div className="container " style={{ minHeight: "300" }}>
            <div className="row">
              <div className="col-6">
                <Link to={playlisturl}>
                  <div>amount : {amount}</div>
                  <div>duration : {duration}</div>
                  <div>emi : {emi}</div>
                  <div>interest_rate : {interest_rate}</div>
                  <div>loan_taken_on : {loan_taken_on}</div>
                  <div>timezone : {timezone}</div>
                  <div>remaing_amount_to_pay : {remaing_amount_to_pay}</div>
                  <div>any_discounts : {any_discounts}</div>


                </Link>
              </div>
              <div className="col-6">
                <Link to={playlisturl}>
                  <div>status_of_loan : {status_of_loan}</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
