import React, { Component } from "react";

import { connect } from "react-redux";
import { getStatusdata } from "../store/postSlice";

import { changeStatus } from "../store/postSlice";
class LoanStatus extends Component {
    state = {
        status_of_loan: ""
    };
    componentDidUpdate() {
        if (this.props.success) {
            this.props.history.replace("/home");
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        alert(e.target.value)
    };
    onSubmit = async (e) => {
        console.log(this.props.state)
        e.preventDefault();
        const jwt = this.props.token;
        // const playlistid = this.props.state.id;
        alert("ho")
        if (jwt) {
            try {


                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${jwt}`,
                };
                let data = {

                    status_of_loan: this.state.status_of_loan
                }
                this.props.dispatch(changeStatus(data, headers, this.props.state.id));
            } catch (error) {
                console.log(error.response);
            }
        }
    };
    componentDidMount() {
        const jwt = this.props.token;

        try {
            if (jwt) {
                const dispatch = this.props.dispatch;
                const id = parseInt(this.props.match.params.id);
                const data = {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${jwt}`,
                };

                dispatch(getStatusdata(data, id));
            }
        } catch (ex) {
            console.log(ex);
        }
    }

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
                        <label for="exampleInputEmail1">loan status</label>
                        <div className="custom-select">
                            <select id="status_of_loan" onChange={this.onChange} de>
                                <option selected={this.props.state.status_of_loan == "NW" && "selected"} value="NW" >New</option>
                                <option selected={this.props.state.status_of_loan == "AD" && "selected"} value="AD" >APPROVED</option>
                                <option selected={this.props.state.status_of_loan == "RD" && "selected"} value="RD" >REJECTED</option>

                            </select>
                        </div>

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
        token: state.user.token,
        state: state.statusdata,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoanStatus);
