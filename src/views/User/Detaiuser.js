import React from "react";
import axios from "axios";
// using HOC props with match
import { withRouter } from "react-router-dom";

class Detaiuser extends React.Component {
  state = {
    user: {},
  };
  async componentDidMount() {
    if (this.props.match && this.props.match.params) {
      let id = this.props.match.params.id;
      let res = await axios.get(`https://reqres.in/api/users/${id}`);
      console.log(res);
      this.setState({
        user: res && res.data && res.data.data ? res.data.data : {},
      });
      console.log(this.state.user);
    }
  }
  handelBack = () => {
    this.props.history.push("/user");
  };
  render() {
    let { user } = this.state;
    // const myobj = {};
    let isEmptyobj = Object.keys(user).length === 0;
    // console.log(isEmptyobj);

    return (
      <>
        <div>id : {this.props.match.params.id}</div>
        {isEmptyobj === false && (
          <>
            <div>
              name: {user.first_name} - {user.last_name}
            </div>
            <div> email: {user.email} </div>
            <div>
              <img src={user.avatar}></img>
            </div>
            <button type="button" onClick={() => this.handelBack()}>
              Back
            </button>
          </>
        )}
      </>
    );
  }
}

//HOC
export default withRouter(Detaiuser);
