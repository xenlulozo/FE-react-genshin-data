import React from "react";
import axios from "axios";

import "./baseweapon.scss";

import DetailMaterial from "./DetailTotalMaterial";
import { withRouter } from "react-router-dom";
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
    // console.log("cnt", this.countAmounts(cnt));

    // this.setState({
    //   loaded: true,
    // });
    // return this.countAmounts(cnt);
    // console.log("cnt", cnt);
    return cnt;
  }

  async componentDidMount() {
    // console.log(this.state.renderCount);

    let name = this.props.match.params.weapon.replace(/-/g, "_");
    let cnt = [];
    let list = await axios.get(
      `https://genshin-builds.com/_next/data/jZHEk4BPFIAIlj0Ym6krL/en/weapon/${name}.json`
    );

    this.setState({
      name: name,
      // dataLoaded: true,
      baseWeapon: list.data.pageProps.weapon,
      levels: list.data.pageProps.weapon.stats.levels,
    });
    // this.setState((prevState) => ({
    //   renderCount: prevState.renderCount + 1,
    // }));
    // if (this.props.renderCount === 1) {
    const generatedData = {
      ascensions: this.generateData(this.state.baseWeapon.ascensions),
    };

    this.setState({ materialTotal: generatedData["ascensions"], loaded: true });
    // console.log("state", this.state.materialTotal);
    // console.log("base", this.state.baseWeapon.ascensions);
    // this.setState({
    //   materialTotal: this.generateData(this.state.baseWeapon.ascensions),
    // });
    // let a = this.generateData(this.state.baseWeapon.ascensions);
    // console.log(a);
    // this.setState({
    //   // materialTotal: { ...a },
    //   loaded: true,
    // });
    // console.log("?", this.generateData(this.state.baseWeapon.ascensions));
  }
  // componentDidUpdate() {
  //   console.log("? up", this.generateData(this.state.baseWeapon.ascensions));
  // }

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
    <div>alo</div>;
    // console.log(name);
    let { baseWeapon, name, levels, temp, refinement, materialTotal, loaded } =
      this.state;
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
        <div className="contanerWeapon">
          <div className="titleWeapon">
            <div
              className="imageWeapon"
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
            <div className="detailWeaponBase">
              <div className="leftContent">
                <div className="titleAndControler">
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

                <div className="contentLeftWeapon">
                  <span>primary:{levels[temp] && levels[temp].primary} </span>
                  <span>level:{levels[temp] && levels[temp].level}</span>
                  <span>
                    secondary:{levels[temp] && levels[temp].secondary}
                  </span>
                  <span>
                    ascension:{levels[temp] && levels[temp].ascension}
                  </span>{" "}
                </div>
              </div>

              <div className="rightContent">
                <div className="titleAndControler">
                  <h2>Refinement</h2>
                  <div>
                    <button
                      onClick={() => this.handelClickSubRefinement(refinement)}
                    >
                      -
                    </button>
                    <button
                      onClick={() => this.handelClickPlusRefinement(refinement)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="contentRightWeapon">
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
          <div className="materialContainer">
            {console.log(baseWeapon.ascensions && baseWeapon.ascensions)}
            <div className="containerMaterial">
              {baseWeapon.ascensions &&
                baseWeapon.ascensions.length > 0 &&
                baseWeapon.ascensions.map((item, index) => {
                  if (index != 0) {
                    mora += item.cost && item.cost;
                  }
                  return (
                    <>
                      {index != 0 ? (
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
                                  {/* {index > 1 ? (
                                  <> */}
                                  {/* {console.log(nameSwap)} */}
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

                                  {/* </>
                                ) : (
                                  <div></div>
                                )} */}
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
                {/* {console.log(materialTotal)} */}
                {/* {console.log("data ", this.countAmounts(materialTotal))} */}
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
                {/* {console.log("go", materialTotal)}
                <DetailMaterial
                  origin={materialTotal}
                  obj={this.countAmounts(materialTotal)}
                /> */}
                {/* {this.isObjectEmpty(this.countAmounts(materialTotal1))
                  ? console.log(
                      "lan 1",
                      this.isObjectEmpty(this.countAmounts(materialTotal1))
                    )
                  : console.log(
                      "lan 2",
                      this.countAmounts(materialTotal1) &&
                        this.countAmounts(materialTotal1)
                    )} */}
                {/* <div
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
                </div>{" "} */}
              </div>
            </div>
            {/* {console.log(materialTotal1)} */}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(BaseWeapon);
