import React from "react";
import axios from "axios";

import "./baseweapon.scss";

import DetailMaterial from "./DetailTotalMaterial";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class BaseWeapon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      baseWeapon: {},
      name: "",
      levels: [],
      temp: 0,
      refinement: 1,
      ascensions: 1,
      materialTotal: [],
      loaded: false,
      myObject: {},
      data: null,
      renderCount: 0,
      isSmallScreen: window.innerWidth < 768,
      // dataLoaded: false,
    };
  }

  generateData(ascensions) {
    let cnt = [];
    ascensions &&
      ascensions.length > 0 &&
      ascensions.forEach((item, index) => {
        if (index !== 0) {
          item.materials &&
            item.materials.length > 0 &&
            item.materials.forEach((material, index) => {
              let temp = {};
              temp["name"] = material.name;
              temp["amount"] = material.amount;
              temp["rarity"] = material.rarity;
              index === 0
                ? (temp["status"] = "weapon-ascension")
                : (temp["status"] = "common-ascension");
              cnt.push(temp);
            });
        }
      });

    return cnt;
  }

  async componentDidMount() {
    let name = this.props.match.params.weapon.replace(/-/g, "_");
    let cnt = [];
    let list = await axios.get(
      `https://genshin-builds.com/_next/data/JMKkzXJIKlrPswuLNJOr2/en/weapon/${name}.json`
    );

    this.setState({
      name: name,

      baseWeapon: list.data.pageProps.weapon,
      levels: list.data.pageProps.weapon.stats.levels,
    });

    const generatedData = {
      ascensions: this.generateData(this.state.baseWeapon.ascensions),
    };

    this.setState({ materialTotal: generatedData["ascensions"], loaded: true });
  }

  handelClickSubTemp = (temp) => {
    if (temp != 0)
      this.setState({
        temp: temp - 1,
      });
  };
  handelClickPlusTemp = (temp) => {
    if (temp <= 12) {
      this.setState({
        temp: temp + 1,
      });
    }
  };
  handelClickSubRefinement = (refinement) => {
    if (refinement != 0)
      this.setState({
        refinement: refinement - 1,
      });
  };
  handelClickPlusRefinement = (refinement) => {
    if (refinement < 4) {
      this.setState({
        refinement: refinement + 1,
      });
    }
  };
  swapName = (name) => {
    // name = name.replace(/(\b\w*?)s\b/g, "$1-s");
    return name.replace(/_/g, "-");
  };
  sumMora = (array) => {
    return array.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
  };
  isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  countAmounts = (data) => {
    const count = {};

    data.forEach((obj) => {
      if (count[obj.name]) {
        count[obj.name] += obj.amount;
      } else {
        count[obj.name] = obj.amount;
      }
    });

    return count;
  };
  render() {
    // console.log(name);
    let {
      isSmallScreen,
      baseWeapon,
      name,
      levels,
      temp,
      refinement,
      materialTotal,
      loaded,
    } = this.state;
    let levelMin = 20;
    let objTemp = {};
    let nameSwap = "";
    let moraTotal = [];
    let materialTotal1 = [],
      materialTotal2 = [],
      materialTotal3 = [];
    let mora = 0;

    const count = {};
    // console.log(levels);
    {
    }
    return (
      <>
        <div className="container">
          {" "}
          <div className="contanerWeapon">
            <div className="titleWeapon col-12 d-flex my-4">
              <div
                className="imageWeapon col-5 col-lg-2"
                style={{
                  backgroundImage: `url(https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_${baseWeapon.rarity}star.png?strip=all&quality=100)`,
                }}
              >
                <img
                  src={`https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/weapons/${name}.png?strip=all&quality=100&w=208`}
                ></img>
              </div>
              <div className="detailWeapon">
                <h1>
                  {baseWeapon.name}{" "}
                  <span>
                    ({baseWeapon.rarity} <span className="star"></span>)
                  </span>
                </h1>
                <ul>
                  <li>Type: {baseWeapon.type}</li>
                  <li>Description: {baseWeapon.description}</li>{" "}
                </ul>
              </div>
            </div>
            <div>
              <div className="detailWeaponBase col-12 d-flex ">
                <div className="leftContent my-2 col-12 col-lg-5 py-3 ">
                  <div className="titleAndControler my-2">
                    <h2>Base</h2>
                    <div>
                      <button onClick={() => this.handelClickSubTemp(temp)}>
                        -
                      </button>
                      <button onClick={() => this.handelClickPlusTemp(temp)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="contentLeftWeapon py-3">
                    <span>
                      primary: {levels[temp] && levels[temp].primary}{" "}
                    </span>
                    <span>level: {levels[temp] && levels[temp].level}</span>
                    <span>
                      secondary: {levels[temp] && levels[temp].secondary}
                    </span>
                    <span>
                      ascension: {levels[temp] && levels[temp].ascension}
                    </span>{" "}
                  </div>
                </div>

                <div className="rightContent my-2 col-12 col-lg-5 py-3">
                  <div className="titleAndControler my-2 ">
                    <h2>Refinement</h2>
                    <div>
                      <button
                        onClick={() =>
                          this.handelClickSubRefinement(refinement)
                        }
                      >
                        -
                      </button>
                      <button
                        onClick={() =>
                          this.handelClickPlusRefinement(refinement)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="contentRightWeapon py-3 px-3">
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          baseWeapon.refinements &&
                          baseWeapon.refinements[refinement].desc,
                      }}
                    >
                      {/* {console.log(
                      baseWeapon.refinements && baseWeapon.refinements[0]
                    )} */}
                      {/* dangerouslySetInnerHTML  */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="talentContent">
              {" "}
              {baseWeapon.ascensions &&
                baseWeapon.ascensions.length > 0 &&
                baseWeapon.ascensions.map((item, index) => {
                  if (index !== 0) {
                    mora += item.cost && item.cost;
                  }
                  // console.log(item);
                  return (
                    <>
                      {index !== 0 ? (
                        <>
                          <span className="d-flex align-items-center ps-lg-4 ps-1">
                            {" "}
                            {isSmallScreen ? <></> : <>Ascension {index} </>}
                            {"     "} [{levelMin}/ {(levelMin = item.level)}]
                          </span>{" "}
                          <div className="imgtalent ">
                            <span className="mora col-12  d-flex">
                              <div
                                className="imageContent-flex col-3"
                                style={{
                                  backgroundImage: `url(
                              https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_1star.png?strip=all&quality=100&w=32
                            )`,
                                }}
                              >
                                <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/materials/mora.png?strip=all&quality=100&w=64"></img>
                                <span> {item.cost}</span>
                              </div>
                              <div className="col-9 d-flex align-items-center">
                                {isSmallScreen ? (
                                  <></>
                                ) : (
                                  <>
                                    <span className="mx-2 ">Mora</span>
                                  </>
                                )}
                              </div>
                            </span>
                          </div>{" "}
                          {item.materials &&
                            item.materials.length > 0 &&
                            item.materials.map((item, index) => {
                              // console.log(item);
                              nameSwap = this.swapName(item.id);
                              return (
                                <>
                                  <span className="">
                                    <span className="imgtalent">
                                      {index === 0 ? (
                                        <div className=" col-12 d-flex">
                                          <div
                                            className="imageContent-flex col-10 col-lg-3 my-2"
                                            style={{
                                              backgroundImage: `url(
                                          https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_${item.rarity}star.png?strip=all&quality=100&w=32
                                        )`,
                                            }}
                                          >
                                            <img
                                              src={`https://api.genshin.dev/materials/weapon-ascension/${nameSwap}.png`}
                                            ></img>
                                            <span> {item.amount}</span>
                                          </div>
                                          <div className="col-9 d-flex align-items-center">
                                            {isSmallScreen ? (
                                              <></>
                                            ) : (
                                              <>
                                                <span className="mx-2">
                                                  {" "}
                                                  {item.name}
                                                </span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className=" col-12 d-flex">
                                          <div
                                            className="imageContent-flex col-10 col-lg-3 my-2"
                                            style={{
                                              backgroundImage: `url(
                                          https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_${item.rarity}star.png?strip=all&quality=100&w=32
                                        )`,
                                            }}
                                          >
                                            <img
                                              src={`https://api.genshin.dev/materials/common-ascension/${nameSwap}.png`}
                                            ></img>
                                            <span> {item.amount}</span>
                                          </div>
                                          <div className="col-9 d-flex align-items-center">
                                            {isSmallScreen ? (
                                              <></>
                                            ) : (
                                              <>
                                                <span className="px-2">
                                                  {" "}
                                                  {item.name}
                                                </span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                        // <div
                                        //   className="imageContent"

                                        // >

                                        //   <span> {item.amount}</span>
                                        // </div>
                                      )}

                                      {/* <span> {item.name}</span> */}
                                    </span>
                                  </span>
                                </>
                              );
                            })}{" "}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
            </div>

            <div className="containerChild">
              {loaded == true ? (
                <>
                  {" "}
                  <DetailMaterial
                    mora={mora}
                    origin={materialTotal}
                    obj={this.countAmounts(materialTotal)}
                  />
                </>
              ) : (
                <></>
              )}
            </div>

            {/* <div className="materialContainer">
              <div className="containerMaterial">
                {baseWeapon.ascensions &&
                  baseWeapon.ascensions.length > 0 &&
                  baseWeapon.ascensions.map((item, index) => {
                    if (index !== 0) {
                      mora += item.cost && item.cost;
                    }
                    return (
                      <>
                        {index !== 0 ? (
                          <div className="listMaterial">
                            <span> Ascension {item.ascension}</span>
                            <span>
                              {" "}
                              [{levelMin}/ {(levelMin = item.level)}]
                            </span>{" "}
                            <span className="mora">
                              <div
                                className="imageContent"
                                style={{
                                  backgroundImage: `url(
                              https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_1star.png?strip=all&quality=100&w=32
                            )`,
                                }}
                              >
                                <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/materials/mora.png?strip=all&quality=100&w=64"></img>
                                <span> {item.cost}</span>
                              </div>
                              <span>Mora</span>
                            </span>
                            {item.materials &&
                              item.materials.length > 0 &&
                              item.materials.map((item, index) => {
                                // console.log(item);
                                nameSwap = this.swapName(item.id);
                                // let temp = {};
                                // temp["name"] = item.name;
                                // temp["amount"] = item.amount;
                                // temp["rarity"] = item.rarity;
                                // index == 0
                                //   ? (temp["status"] = "weapon-ascension")
                                //   : (temp["status"] = "common-ascension");

                                // materialTotal1.push(temp && temp && temp);

                                return (
                                  <>
                                    <span className="containerChild">
                                      <span className="materialList">
                                        {index == 0 ? (
                                          <div
                                            className="imageContent"
                                            style={{
                                              backgroundImage: `url(
                                          https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_${item.rarity}star.png?strip=all&quality=100&w=32
                                        )`,
                                            }}
                                          >
                                            <img
                                              src={`https://api.genshin.dev/materials/weapon-ascension/${nameSwap}.png`}
                                              // {...(temp["status"] =
                                              //   "weapon-ascension")}
                                            ></img>
                                            <span> {item.amount}</span>
                                          </div>
                                        ) : (
                                          <div
                                            className="imageContent"
                                            style={{
                                              backgroundImage: `url(
                                            https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_${item.rarity}star.png?strip=all&quality=100&w=32
                                          )`,
                                            }}
                                          >
                                            <img
                                              src={`https://api.genshin.dev/materials/common-ascension/${nameSwap}.png`}
                                            ></img>
                                            <span> {item.amount}</span>
                                          </div>
                                        )}

                                        <span> {item.name}</span>
                                      </span>
                                    </span>
                                  </>
                                );
                              })}{" "}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </>
                    );
                  })}
                {}

                <div className="containerChild">
                  Total:{" "}
                  <div
                    className="imageContent"
                    style={{
                      backgroundImage: `url(
                              https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_1star.png?strip=all&quality=100&w=32
                            )`,
                    }}
                  >
                    <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/materials/mora.png?strip=all&quality=100&w=64"></img>
                    <span className="sumMaterial"> {mora}</span>
                  </div>{" "}
                  {loaded == true ? (
                    <>
                      {" "}
                      <DetailMaterial
                        origin={materialTotal}
                        obj={this.countAmounts(materialTotal)}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(BaseWeapon);
