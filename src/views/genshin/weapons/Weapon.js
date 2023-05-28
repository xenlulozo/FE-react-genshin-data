import axios from "axios";
import React from "react";

import ChildWeapon from "./ChildWeapon";
import "bootstrap/dist/css/bootstrap.min.css";

class Weapon extends React.Component {
  state = {
    weapon: [],
    list: {},
  };

  async componentDidMount() {
    // let data = await axios.get("https://api.genshin.dev/weapons");
    let list = await axios.get("https://api.genshin.dev/weapons");
    // console.log(list.data);
    // let listCoppy = [];
    // list.data.map((item, index) => {
    //   listCoppy.push(item.replace(/-/g, "_"));
    // });
    // console.log(listCoppy);

    this.setState({
      weapon: list.data,
    });
  }

  render() {
    let { weapon, list } = this.state;
    // let temp = Object.entries(list);
    // console.log("parent", weapon);
    return (
      <>
        <div className="container col-12 ">
          {weapon &&
            weapon.length > 0 &&
            weapon.map((item, index) => {
              // console.log(item);
              return <ChildWeapon weapon={item} />;
            })}
          {/* <ChildWeapon weapon={"thrilling-tales-of-dragon-slayers"} /> */}
        </div>
      </>
    );
  }
}

export default Weapon;
