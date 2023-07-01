import axios from "axios";
import React from "react";

import "./character.scss";

import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class Character extends React.Component {
  state = {
    list: [],
    vision: [],
    cryo: [],
    hydro: [],
    anemo: [],
    geo: [],
    dendro: [],
    electro: [],
    pyro: [],
    isSmallScreen: window.innerWidth < 768,
  };

  setVision = () => {
    let cryoCoppy = [];
    let pyroCoppy = [];
    let hydroCoppy = [];
    let geoCoppy = [];
    let dendroCoppy = [];
    let electroCoppy = [];
    let anemoCoppy = [];

    this.state.list &&
      this.state.list.data.length > 0 &&
      this.state.list.data.map(async (item, index) => {
        let req = "https://api.genshin.dev/characters/" + item;
        let check = await axios.get(req);
        let vision = check.data.vision;

        vision === "Cryo"
          ? cryoCoppy.push([item])
          : vision === "Pyro"
          ? pyroCoppy.push([item])
          : vision === "Hydro"
          ? hydroCoppy.push([item])
          : vision === "Geo"
          ? geoCoppy.push([item])
          : vision === "Dendro"
          ? dendroCoppy.push([item])
          : vision === "Electro"
          ? electroCoppy.push([item])
          : vision === "Anemo"
          ? anemoCoppy.push([item])
          : console.log("no vision");

        // console.log(pyroCoppy);
        this.setState({
          cryo: cryoCoppy,
          hydro: hydroCoppy,
          geo: geoCoppy,
          dendro: dendroCoppy,
          electro: electroCoppy,
          anemo: anemoCoppy,
          pyro: pyroCoppy,
        });
        // console.log(this.state.cryo);
        // console.log(pyroCoppy);
        // console.log(hydroCoppy);
        // console.log(anemoCoppy);
        // console.log(dendroCoppy);
        // console.log(electroCoppy);
        // console.log(geoCoppy);

        // let vision = JSON.stringify(res);
      });
    // console.log(this.state.list.data);
  };

  async componentDidMount() {
    let char = await axios.get("https://api.genshin.dev/characters");
    // console.log(char);
    this.setState({
      list: char,
    });
    this.setVision();
    // console.log(this.props.history);
  }
  async checkVision(character) {
    let req = "https://api.genshin.dev/characters/" + character;
    let check = await axios.get(req);
    let vision = check.data.vision;
    return vision;
  }

  handelClickprofile = async (char) => {
    // char = char.toLowerCase();
    axios
      .get(
        `https://genshin-builds.com/_next/data/JMKkzXJIKlrPswuLNJOr2/en/character/kamisato_ayaka.json`
      )
      .then((response) => {
        let dataSkill = response.data;
      });

    this.props.history.push(`/character/${char} `);
  };
  render() {
    let {
      isSmallScreen,
      list,
      cryo,
      pyro,
      electro,
      anemo,
      dendro,
      hydro,
      geo,
    } = this.state;

    return (
      <>
        <div className="container">
          <div className="cryo col-12 my-3">
            <h3>
              <img src="https://api.genshin.dev/elements/cryo/icon.png"></img>{" "}
              Cryo
            </h3>

            {cryo &&
              cryo.length > 0 &&
              cryo.map((item, index) => {
                {
                  var source =
                    "https://api.genshin.dev/characters/" + item + "/icon.png";
                  var link = "/" + item;
                }
                return (
                  <>
                    <img
                      onClick={() => this.handelClickprofile(item)}
                      className="image"
                      key={item}
                      src={source}
                      style={isSmallScreen ? { width: "20%" } : null}
                    ></img>
                  </>
                );
              })}
          </div>{" "}
          <div className="cryo col-12 my-3">
            <h3>
              <img src="https://api.genshin.dev/elements/pyro/icon.png"></img>{" "}
              Pyro
            </h3>
            {pyro &&
              pyro.length > 0 &&
              pyro.map((item, index) => {
                {
                  var source =
                    "https://api.genshin.dev/characters/" + item + "/icon.png";
                  var link = "/" + item;
                }
                return (
                  <>
                    <img
                      onClick={() => this.handelClickprofile(item)}
                      className="image"
                      alt="Err"
                      key={item}
                      src={source}
                      style={isSmallScreen ? { width: "20%" } : null}
                    ></img>
                  </>
                );
              })}
          </div>
          <div className="cryo col-12 my-3">
            <h3>
              <img src="https://api.genshin.dev/elements/hydro/icon.png"></img>{" "}
              Hydro
            </h3>
            {hydro &&
              hydro.length > 0 &&
              hydro.map((item, index) => {
                {
                  var source =
                    "https://api.genshin.dev/characters/" + item + "/icon.png";
                  var link = "/" + item;
                }
                return (
                  <>
                    <img
                      onClick={() => this.handelClickprofile(item)}
                      className="image"
                      alt="Err"
                      key={item}
                      src={source}
                      style={isSmallScreen ? { width: "20%" } : null}
                    ></img>
                  </>
                );
              })}
          </div>
          <div className="cryo col-12 my-3">
            <h3>
              <img src="https://api.genshin.dev/elements/anemo/icon.png"></img>{" "}
              Anemo
            </h3>
            {anemo &&
              anemo.length > 0 &&
              anemo.map((item, index) => {
                {
                  var source =
                    "https://api.genshin.dev/characters/" + item + "/icon.png";
                  var link = "/" + item;
                }
                return (
                  <>
                    <img
                      onClick={() => this.handelClickprofile(item)}
                      className="image"
                      alt="Err"
                      key={item}
                      src={source}
                      style={isSmallScreen ? { width: "20%" } : null}
                    ></img>
                  </>
                );
              })}
          </div>
          <div className="cryo col-12 my-3">
            <h3>
              <img src="https://api.genshin.dev/elements/electro/icon.png"></img>{" "}
              Electro
            </h3>
            {electro &&
              electro.length > 0 &&
              electro.map((item, index) => {
                {
                  var source =
                    "https://api.genshin.dev/characters/" + item + "/icon.png";
                  var link = "/" + item;
                }
                return (
                  <>
                    <img
                      onClick={() => this.handelClickprofile(item)}
                      className="image"
                      alt="Err"
                      key={item}
                      src={source}
                      style={isSmallScreen ? { width: "20%" } : null}
                    ></img>
                  </>
                );
              })}
          </div>
          <div className="cryo col-12 my-3">
            <h3>
              <img src="https://api.genshin.dev/elements/dendro/icon.png"></img>{" "}
              Dendro
            </h3>
            {dendro &&
              dendro.length > 0 &&
              dendro.map((item, index) => {
                {
                  var source =
                    "https://api.genshin.dev/characters/" + item + "/icon.png";
                  var link = "/" + item;
                }
                return (
                  <>
                    <img
                      onClick={() => this.handelClickprofile(item)}
                      className="image"
                      alt="Err"
                      key={item}
                      src={source}
                      style={isSmallScreen ? { width: "20%" } : null}
                    ></img>
                  </>
                );
              })}
          </div>
          <div className="cryo col-12 my-3">
            <h3>
              <img src="https://api.genshin.dev/elements/geo/icon.png"></img>{" "}
              Geo
            </h3>
            {geo &&
              geo.length > 0 &&
              geo.map((item, index) => {
                {
                  var source =
                    "https://api.genshin.dev/characters/" + item + "/icon.png";
                  var link = "/" + item;
                }
                return (
                  <>
                    <img
                      onClick={() => this.handelClickprofile(item)}
                      className="image"
                      alt="Err"
                      key={item}
                      src={source}
                      style={isSmallScreen ? { width: "20%" } : null}
                    ></img>
                  </>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Character);
