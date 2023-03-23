import axios from "axios";
import React from "react";
import "./listuser.scss";
import { withRouter } from "react-router-dom";

class Listuser extends React.Component {
  state = {
    listuer: [],
  };
  async componentDidMount() {
    let res = await axios.get("https://reqres.in/api/users?page=2");
    this.setState({
      listuer: res && res.data && res.data.data ? res.data.data : [],
    });
  }
  handelClickprofile = (user) => {
    this.props.history.push(`/user/${user.id} `);
  };
  render() {
    let { listuer } = this.state;
    return (
      <>
        <div className="list-user-container">
          <div className=" title">fetch all list</div>
          <div className="list-user-content">
            {listuer &&
              listuer.length > 0 &&
              listuer.map((item, index) => {
                return (
                  <>
                    <div
                      key={item.id}
                      className="child"
                      onClick={() => this.handelClickprofile(item)}
                    >
                      <img src={item.avatar}></img>- {item.first_name} -{" "}
                      {item.last_name}
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Listuser);
