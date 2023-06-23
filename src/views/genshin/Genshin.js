import axios from "axios";
import React from "react";
import "./genshin.scss";

import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import Testapi from "./Testapi";

import CharacterMaterial from "./CharacterMaterial";
import "bootstrap/dist/css/bootstrap.min.css";

class Genshin extends React.Component {
  state = {
    skill: {},
    character: {},
    statusSkill1: 0,
    statusSkill2: 0,
    statusSkill3: 0,
    statusSkill4: 0,
    isSmallScreen: window.innerWidth < 768,
  };

  // history = useHistory();
  // refeshPage = () => {
  //   // then add this to the function that is called for re-rendering
  //   history.go(0);
  // };
  async componentDidMount() {
    if (this.props.match && this.props.match.params) {
      let name = this.props.match.params.char;
      // console.log(name);
      // let skill = await axios.get(
      //   `https://genshin-builds.com/_next/data/AxXQmod3sdYBP0OjxQ5rz/en/character/${name}.json`
      // );
      let pack = await axios.get(`https://api.genshin.dev/characters/${name}`);
      let dataSkill = this.props.match.params.char;
      // console.log(skill);
      this.setState({
        character: pack.data,
      });
    }
    // console.log("state", this.state.character);
  }

  handelClickSkill1 = () => {
    this.setState({
      statusSkill1: 1,
    });
  };
  handelClickSkill1Again = () => {
    this.setState({
      statusSkill1: 0,
    });
  };
  handelClickSkill2 = () => {
    this.setState({
      statusSkill2: 1,
    });
  };
  handelClickSkill2Again = () => {
    this.setState({
      statusSkill2: 0,
    });
  };
  handelClickSkill3 = () => {
    this.setState({
      statusSkill3: 1,
    });
  };
  handelClickSkill3Again = () => {
    this.setState({
      statusSkill3: 0,
    });
  };
  handelClickSkill4 = () => {
    this.setState({
      statusSkill4: 1,
    });
  };
  handelClickSkill4Again = () => {
    this.setState({
      statusSkill4: 0,
    });
  };

  render() {
    let {
      isSmallScreen,
      character,
      statusSkill1,
      statusSkill2,
      statusSkill3,
      statusSkill4,
    } = this.state;

    let skillTalents = [];
    let numSkill;
    skillTalents = character.skillTalents;

    let nameCharacter = this.props.match.params.char;

    let passName;

    let starName;
    return (
      <>
        {/* {console.log(character)} */}
        {/* <img className="char_back" src={imgBack}></img> */}
        <img
          className="char_back"
          src={`https://api.genshin.dev/characters/${nameCharacter}/gacha-splash.png`}
        ></img>
        {isSmallScreen ? (
          <>
            <div className="container my-3">
              <div className="pf-sm col-12" style={{ zindex: "10000" }}>
                <div className="col-3">
                  <img
                    className="avarta"
                    src={`https://api.genshin.dev/characters/${nameCharacter}/icon-big.png`}
                  ></img>
                </div>

                <div className="desc col-7">
                  <h1> {character.name} </h1>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="pf">
              <img
                className="avarta"
                src={`https://api.genshin.dev/characters/${nameCharacter}/icon-big.png`}
              ></img>

              <div className="description mx-3">
                <h1> {character.name}</h1> <p> {character.description} </p>
              </div>
            </div>
          </>
        )}

        <div className="charRacterContent">
          <h2> Skill</h2>

          <div
            className="con col-12 d-xxl-flex "
            // style={isSmallScreen ? { fontSize: "25px" } : null}
          >
            {/* <div className="skill"> */}
            {skillTalents &&
              skillTalents.length > 0 &&
              skillTalents.map((item, index) => {
                return (
                  <>
                    {/* <div className=" col-12 col-xxl-4"></div> */}
                    <div
                      className="skill col-12 col-xxl-4 "
                      style={
                        isSmallScreen ? { width: "100%" } : { width: "32%" }
                      }
                    >
                      {index === 0 ? (
                        <>
                          {statusSkill1 === 0 ? (
                            <>
                              <div
                                className="baseContent"
                                onClick={() => this.handelClickSkill1()}
                              >
                                <span className="nameSkill">{item.name} </span>
                                <div className="iconSkill">
                                  {" "}
                                  <img
                                    src={`https://api.genshin.dev/characters/${nameCharacter}/talent-na.png`}
                                  ></img>
                                </div>
                                <br />
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className="baseContent"
                                onClick={() => this.handelClickSkill1Again()}
                              >
                                <span className="nameSkill">{item.name} </span>
                                <div className="iconSkill">
                                  {" "}
                                  <img
                                    src={`https://api.genshin.dev/characters/${nameCharacter}/talent-na.png`}
                                  ></img>
                                </div>
                              </div>
                              <div>
                                <p> {item.description}</p>

                                <Testapi
                                  className="baseContent"
                                  numSkill={0}
                                  nameCharacter={nameCharacter}
                                />
                              </div>
                            </>
                          )}
                        </>
                      ) : index == 1 ? (
                        <>
                          {statusSkill2 == 0 ? (
                            <>
                              <div
                                className="baseContent"
                                onClick={() => this.handelClickSkill2()}
                              >
                                <span>{item.name} </span>
                                <div className="iconSkill">
                                  {" "}
                                  <img
                                    src={`https://api.genshin.dev/characters/${nameCharacter}/talent-skill.png`}
                                  ></img>
                                </div>
                                <br />
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className="baseContent"
                                onClick={() => this.handelClickSkill2Again()}
                              >
                                <span>{item.name} </span>
                                <div className="iconSkill">
                                  {" "}
                                  <img
                                    src={`https://api.genshin.dev/characters/${nameCharacter}/talent-skill.png`}
                                  ></img>
                                </div>
                              </div>
                              <p> {item.description}</p>
                              <Testapi
                                numSkill={1}
                                nameCharacter={nameCharacter}
                              />
                            </>
                          )}
                        </>
                      ) : index == 3 ? (
                        <>
                          {statusSkill4 == 0 ? (
                            <>
                              {" "}
                              <div
                                onClick={() => this.handelClickSkill4()}
                                className="baseContent"
                              >
                                <span>{item.name} </span>
                                <div className="iconSkill">
                                  <img
                                    src={`https://api.genshin.dev/characters/${nameCharacter}/talent-passive-misc.png`}
                                  ></img>{" "}
                                </div>
                                <br />
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                onClick={() => this.handelClickSkill4Again()}
                                className="baseContent"
                              >
                                <span>{item.name} </span>
                                <div className="iconSkill">
                                  <img
                                    src={`https://api.genshin.dev/characters/${nameCharacter}/talent-passive-misc.png`}
                                  ></img>{" "}
                                </div>
                                <p> {item.description}</p>
                                {/* <Testapi numSkill={3} /> */}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {statusSkill3 == 0 ? (
                            <>
                              <div
                                className="baseContent"
                                onClick={() => this.handelClickSkill3()}
                              >
                                {" "}
                                <span>{item.name} </span>
                                <div className="iconSkill">
                                  {" "}
                                  <img
                                    src={`https://api.genshin.dev/characters/${nameCharacter}/talent-burst.png`}
                                  ></img>
                                </div>
                                <br />
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                // talent-passive-misc
                                className="baseContent"
                                onClick={() => this.handelClickSkill3Again()}
                              >
                                <span>{item.name} </span>
                                <div className="iconSkill">
                                  {" "}
                                  <img
                                    src={`https://api.genshin.dev/characters/${nameCharacter}/talent-burst.png`}
                                  ></img>
                                </div>
                              </div>
                              <p> {item.description}</p>
                              <Testapi
                                numSkill={2}
                                nameCharacter={nameCharacter}
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </>
                );
              })}
          </div>

          <h2> passiveTalents</h2>

          <div className="con col-12 d-xxl-flex">
            {character.passiveTalents &&
              character.passiveTalents.length > 0 &&
              character.passiveTalents.map((item, index) => {
                let source =
                  "https://api.genshin.dev/characters/" +
                  nameCharacter +
                  "/talent-passive-" +
                  index +
                  ".png";
                return (
                  <>
                    <div
                      className="passive col-12 col-xxl-4  my-3"
                      style={
                        isSmallScreen ? { width: "100%" } : { width: "32%" }
                      }
                    >
                      {/* <div
                        className="img"
                        style={{
                          backgroundImage: `url(
                              ${source}
                            )`,
                        }}
                      >
                        {" "}
                      </div> */}
                      <span>{item.name} </span>
                      <p> {item.description}</p>
                      <img src={source}></img>
                    </div>
                  </>
                );
              })}
          </div>
          <h2> constellations</h2>
          <div className="con col-12 d-xxl-flex">
            {character.constellations &&
              character.constellations.length > 0 &&
              character.constellations.map((item, index) => {
                let source =
                  "https://api.genshin.dev/characters/" +
                  nameCharacter +
                  "/constellation-" +
                  (index + 1) +
                  ".png";
                return (
                  <>
                    <div
                      className="star col-12 col-xxl-4"
                      style={
                        isSmallScreen ? { width: "100%" } : { width: "32%" }
                      }
                    >
                      <span>{item.name} </span>
                      <p> {item.description}</p>
                      <img src={source}></img>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <div className="materialAll">
          <CharacterMaterial nameCharacter={nameCharacter} />
        </div>
      </>
    );
  }
}

export default withRouter(Genshin);
