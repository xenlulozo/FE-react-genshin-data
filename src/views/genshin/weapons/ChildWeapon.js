import axios from "axios";
import React from "react";

import "./childWeapon.scss";

import { withRouter } from "react-router-dom";
class ChildWeapon extends React.Component {
  state = {
    weapon: {},
    name: "",
  };
  async componentDidMount() {
    // console.log(this.props);
    let data = await axios.get(
      `https://api.genshin.dev/weapons/${this.props.weapon}`
    );
    // console.log(this.props.weapon);
    let name = this.props.weapon;
    // name = name.replace(/'/g, "");
    // name = name.render(/-/g, "");
    // console.log(data.data);
    this.setState({
      weapon: data.data,
      name: name,
    });

    // console.log(this.state.weapon);
  }
  handelBaseWeapon = (item) => {
    // console.log(weapon);
    this.props.history.push(`/weapon/${this.props.weapon} `);
  };
  render() {
    let { weapon, name } = this.state;

    return (
      <>
        {/* {console.log(weapon)}{" "} */}
        <div
          className="container1 "
          onClick={() => {
            this.handelBaseWeapon(this.props.weapon);
          }}
        >
          {/* {console.log(weapon)} */}
          <div className="weaponContent  col-12 d-flex my-2">
            {/* <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_4star.png?strip=all&quality=100"></img> */}
            <div
              className="backImage col-2"
              style={{
                backgroundImage: `url(https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_${weapon.rarity}star.png?strip=all&quality=100)`,
              }}
            >
              <img
                src={`https://api.genshin.dev/weapons/${name}/icon.png`}
                // src={`https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/weapons/${name}.png?strip=all&quality=100&w=208`}
              ></img>
              {/* {weapon.rarity == 5 ? (
                <>
                  <div className="contentStar">
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                  </div>
                </>
              ) : weapon.rarity == 4 ? (
                <>
                  <div className="contentStar">
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                  </div>
                </>
              ) : (
                <>
                  <div className="contentStar">
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                  </div>
                </>
              )} */}
            </div>

            <div className="textContent px-4 col-10">
              <h3>{weapon.name}</h3>
              <span>
                Type: {weapon.type} | BaseAttack: {weapon.baseAttack} |SubStat :{" "}
                {weapon.subStat}
              </span>
              <p>{weapon.passiveDesc}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ChildWeapon);
