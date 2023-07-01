import React from "react";
import axios from "axios";
import "./characterMaterial.scss";
import "bootstrap/dist/css/bootstrap.min.css";
class CharacterMaterial extends React.Component {
  state = {
    characterName: "",
    ascensionMaterial: [],
    totalMaterial: {},
    selectIndexStat: 0,
    talentMaterial: {},
    isSmallScreen: window.innerWidth < 768,
  };

  generateData(ascensionMaterial) {
    let cnt = [];
    ascensionMaterial &&
      ascensionMaterial.length > 0 &&
      ascensionMaterial.map((item, index) => {});

    return cnt;
  }
  countAmounts = (data) => {
    const count = {};
    data &&
      data.forEach((obj) => {
        if (count[obj.id]) {
          count[obj.id] += obj.amount;
        } else {
          count[obj.id] = obj.amount;
        }
      });
    return count;
  };
  async componentDidMount() {
    await axios
      .get(`https://api.genshin.dev/characters/${this.props.nameCharacter}`)
      .then((response) => {
        let nameCoppy = response.data.name;
        // nameCoppy.toLowerCase();
        // console.log(nameCoppy);
        let fullName = "";

        if (nameCoppy.indexOf(" ") == -1) {
          fullName = nameCoppy.toLowerCase();
        } else {
          var arrName = nameCoppy.split(" ");
          fullName = arrName[0].toLowerCase() + "_" + arrName[1].toLowerCase();
        }

        this.setState({ characterName: fullName });
      })
      .catch((error) => {
        console.error(error);
      });
    await axios
      .get(
        `https://genshin-builds.com/_next/data/JMKkzXJIKlrPswuLNJOr2/en/character/${this.state.characterName}.json`
      )
      .then((response) => {
        this.setState({
          ascensionMaterial: response.data.pageProps.character.ascension,
          talentMaterial: response.data.pageProps.character.talent_materials,
        });
        // console.log(response.data.pageProps.character.talent_materials);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  swapNameToImg = (name) => {
    name = name.toLowerCase().replace(/'/g, "_");
    name = name.replace(/ /g, "_");
    // console.log(name);
    return name.replace(/_/g, "-");
  };
  setSelectIndexStat = (index) => {
    // console.log("ass");
    // alert("aa");
    this.setState({
      selectIndexStat: index,
    });
  };
  handleObjectClick(index) {
    this.setState({
      selectedObject: index,
    });
  }

  getObjectClassName(index) {
    if (index === this.state.selectedObject) {
      return "selected";
    }
    return "";
  }
  render() {
    // console.log(this.swapNameToImg("shivada_jade_sliver"));
    let { isSmallScreen, ascensionMaterial, selectIndexStat, talentMaterial } =
      this.state;
    // console.log("state", talentMaterial);
    let totalMora = 0;
    let totalMaterial = [];
    let talentTotalMora = 0;
    let totalTalentMaterial = [];
    let totalTalent = {};
    let total = {};
    // let selectIndexStat = 0;
    let status = "";

    return (
      <>
        <div className="containerBaseStats">
          {" "}
          <h2>Stats</h2>
          <div className="content">
            <div className="statBase">
              <div className=" routeStat col-12">
                <div
                  onClick={() => {
                    this.setSelectIndexStat(0);
                    this.handleObjectClick(1);
                  }}
                  // onClick={() => this.handleObjectClick(1)}
                  className={` items-stat col-xxl-1 col-3 my-1 mx-1 px-3  myObject ${this.getObjectClassName(
                    1
                  )}`}
                >
                  Lv.1-20
                </div>
                <div
                  className={`items-stat col-xxl-1 col-3 my-1 mx-1 px-3 col-1 myObject ${this.getObjectClassName(
                    2
                  )}`}
                  onClick={() => {
                    this.setSelectIndexStat(1);
                    this.handleObjectClick(2);
                  }}
                >
                  Lv.20-40
                </div>
                <div
                  className={`items-stat col-xxl-1 col-3 my-1 mx-1 px-3 col-1 myObject ${this.getObjectClassName(
                    3
                  )}`}
                  onClick={() => {
                    this.setSelectIndexStat(2);
                    this.handleObjectClick(3);
                  }}
                >
                  Lv.40-50
                </div>
                <div
                  className={` items-stat col-xxl-1 col-3 my-1 mx-1 px-3 col-1 myObject ${this.getObjectClassName(
                    4
                  )}`}
                  onClick={() => {
                    this.setSelectIndexStat(3);
                    this.handleObjectClick(4);
                  }}
                >
                  Lv.50-60
                </div>
                <div
                  className={`items-stat col-xxl-1 col-3 my-1 mx-1 px-3 col-1 myObject ${this.getObjectClassName(
                    5
                  )}`}
                  onClick={() => {
                    this.setSelectIndexStat(4);
                    this.handleObjectClick(5);
                  }}
                >
                  Lv.60-70
                </div>
                <div
                  className={`items-stat col-xxl-1 col-3 my-1 mx-1 px-3 col-1 myObject ${this.getObjectClassName(
                    6
                  )}`}
                  onClick={() => {
                    this.setSelectIndexStat(5);
                    this.handleObjectClick(6);
                  }}
                >
                  Lv.70-80
                </div>
                <div
                  className={`items-stat col-xxl-1 col-3 my-1 mx-1 px-3 col-1 myObject ${this.getObjectClassName(
                    7
                  )}`}
                  onClick={() => {
                    this.setSelectIndexStat(6);
                    this.handleObjectClick(7);
                  }}
                >
                  Lv.80-90
                </div>
              </div>
              <div className="statDetail">
                <span></span>
                <span>Before Ascension</span>
                <span>Affter Ascension</span>

                {ascensionMaterial[selectIndexStat] &&
                  ascensionMaterial[selectIndexStat].stats.length > 0 &&
                  ascensionMaterial[selectIndexStat].stats.map(
                    (item, index) => {
                      return (
                        <>
                          <div className="nameStat">{item && item.label}</div>
                          <div className="beforeStat">
                            {item.values && item.values[0]}
                          </div>
                          <div className="affterStat">
                            {item.values && item.values[1]}
                          </div>
                        </>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="containerBaseStats">
          <h2>Ascension</h2>
          <div className="container">
            <div className="content">
              {ascensionMaterial &&
                ascensionMaterial.length > 0 &&
                ascensionMaterial.map((item, index) => {
                  {
                    item["cost"] && item["cost"] && (totalMora += item["cost"]);
                    // console.log("item", item);

                    let temp = {};
                    temp = {
                      ...temp,
                      id: item.mat1?.id,
                      amount: item.mat1?.amount,
                      status: "character-ascension",
                    };
                    totalMaterial.push(temp);

                    temp = {
                      ...temp,
                      id: item.mat2?.id,
                      amount: item.mat2?.amount,
                      status: "boss-material",
                    };
                    totalMaterial.push(temp);

                    temp = {
                      ...temp,
                      id: item.mat3?.id,
                      amount: item.mat3?.amount,
                      status: "local-specialties",
                    };
                    totalMaterial.push(temp);

                    temp = {
                      ...temp,
                      id: item.mat4?.id,
                      amount: item.mat4?.amount,
                      status: "common-ascension",
                    };
                    totalMaterial.push(temp);
                  }
                  return (
                    <>
                      <div className="list">
                        {/* {console.log("item", item)} */}
                        <div className="asencionMaterial">
                          LV.{item["level"][0]}-{item["level"][1]}
                        </div>
                        <div className="asencionMaterial">
                          {index !== 0 ? (
                            <>
                              <div className="imgContainer">
                                <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/materials/mora.png?strip=all&quality=100&w=64"></img>
                                <span> {item["cost"]}</span>
                              </div>
                              {isSmallScreen ? (
                                <></>
                              ) : (
                                <>
                                  <span> Mora</span>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <div className="imgContainer">
                                <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/materials/mora.png?strip=all&quality=100&w=64"></img>
                                <span> 0</span>
                              </div>

                              {isSmallScreen ? (
                                <></>
                              ) : (
                                <>
                                  <span> Mora</span>
                                </>
                              )}
                            </>
                          )}
                        </div>

                        <div className="asencionMaterial">
                          {index != 0 ? (
                            <>
                              {" "}
                              <div className="imgContainer">
                                {/* {console.log(
                              
                              )} */}
                                <img
                                  src={`https://api.genshin.dev/materials/character-ascension/${this.swapNameToImg(
                                    item["mat1"] && item["mat1"]["id"]
                                  )}`}
                                ></img>
                                <span>
                                  {" "}
                                  {item["mat1"] && item["mat1"]["amount"]}
                                </span>
                              </div>
                              {isSmallScreen ? (
                                <></>
                              ) : (
                                <>{item["mat1"] && item["mat1"]["name"]}</>
                              )}
                              {/* {item["mat1"] && item["mat1"]["amount"]}{" "} */}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="asencionMaterial">
                          {" "}
                          {index > 1 ? (
                            <>
                              <div className="imgContainer">
                                {/* {console.log(
                                  item["mat2"] && item["mat2"]["id"]
                                )} */}
                                <img
                                  src={`https://api.genshin.dev/materials/boss-material/${this.swapNameToImg(
                                    item["mat2"] && item["mat2"]["id"]
                                  )}`}
                                ></img>
                                <span>
                                  {" "}
                                  {item["mat2"] && item["mat2"]["amount"]}
                                </span>
                              </div>
                              {isSmallScreen ? (
                                <></>
                              ) : (
                                <> {item["mat2"] && item["mat2"]["name"]}</>
                              )}

                              {/* {item["mat2"] && item["mat2"]["amount"]} */}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="asencionMaterial">
                          {index !== 0 ? (
                            <>
                              <div className="imgContainer">
                                <img
                                  src={`https://api.genshin.dev/materials/local-specialties/${this.swapNameToImg(
                                    item["mat3"] && item["mat3"]["id"]
                                  )}`}
                                ></img>

                                <span>
                                  {" "}
                                  {item["mat3"] && item["mat3"]["amount"]}
                                </span>
                              </div>
                              {isSmallScreen ? (
                                <></>
                              ) : (
                                <> {item["mat3"] && item["mat3"]["name"]}</>
                              )}

                              {/* {item["mat3"] && item["mat3"]["amount"]} */}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="asencionMaterial">
                          {" "}
                          {index != 0 ? (
                            <>
                              {" "}
                              <div className="imgContainer">
                                <img
                                  src={`https://api.genshin.dev/materials/common-ascension/${this.swapNameToImg(
                                    item["mat4"] && item["mat4"]["id"]
                                  )}`}
                                ></img>
                                <span>
                                  {" "}
                                  {item["mat4"] && item["mat4"]["amount"]}
                                </span>
                              </div>
                              {isSmallScreen ? (
                                <></>
                              ) : (
                                <> {item["mat4"] && item["mat4"]["name"]}</>
                              )}
                              {/* {item["mat4"] && item["mat4"]["amount"]} */}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}

              <div className="materialTotal d-flex col-12">
                <span className="col-lg-1 col-2">Total</span>
                <div className="col-lg-1 col-2 viewsTotal">
                  <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/materials/mora.png?strip=all&quality=100&w=64"></img>

                  <span> {totalMora}</span>
                </div>

                {Object.entries(this.countAmounts(totalMaterial)) &&
                  Object.entries(this.countAmounts(totalMaterial)).map(
                    (item, index) => {
                      // console.log(item);

                      return (
                        <>
                          {index !== 0 ? (
                            <>
                              {" "}
                              {totalMaterial &&
                                totalMaterial.length > 0 &&
                                totalMaterial.map((ite, index) => {
                                  if (Object.values(ite).includes(item[0]))
                                    status = ite.status;
                                  // console.log(ite.status);
                                })}
                              <div className="viewsTotal col-lg-1 col-2">
                                <span>{item[1]}</span>
                                <img
                                  src={`https://api.genshin.dev/materials/${status}/${this.swapNameToImg(
                                    item[0]
                                  )}`}
                                ></img>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    }
                  )}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="containerBaseStats">
          <h2> Talent Material</h2>
          <div className="tailentContainer">
            {/* {console.log(talentMaterial[0])} */}

            {talentMaterial &&
              talentMaterial.length > 0 &&
              talentMaterial.map((item, index) => {
                // console.log("item", item);

                talentTotalMora += item.cost;

                // console.log(item);

                {
                  item.items &&
                    item.items.length > 0 &&
                    item.items.map((inte, index) => {
                      {
                        let temp = {};

                        temp = {
                          ...temp,
                          id: inte.name,
                          amount: inte.amount,
                          status:
                            index == 0
                              ? "talent-book"
                              : index == 1
                              ? "common-ascension"
                              : index == 2
                              ? "talent-boss"
                              : "talent-book",
                        };
                        totalTalentMaterial.push(temp);
                      }
                    });
                  // {
                  //   console.log(totalTalentMaterial);
                  // }
                }

                return (
                  <div className="talentContent">
                    <div className="childContent">
                      Lv.{item.level - 1} -{item.level}
                    </div>
                    <div className="childContent">
                      <div className="imgtalent">
                        <div className="imgMora">
                          <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/materials/mora.png?strip=all&quality=100&w=80"></img>
                          <span>{item.cost}</span>
                        </div>
                      </div>
                    </div>
                    <div className="childContent">
                      <div className="imgtalent ">
                        <div className="img ">
                          <img
                            src={`https://api.genshin.dev/materials/talent-book/${this.swapNameToImg(
                              item.items[0].id
                            )}.png`}
                          ></img>
                          <span>{item.items[0].amount}</span>
                        </div>
                        {isSmallScreen ? <></> : <> {item.items[0].name}</>}
                      </div>
                    </div>
                    <div className="childContent">
                      <div className="imgtalent">
                        <div className="img">
                          <img
                            src={`https://api.genshin.dev/materials/common-ascension/${this.swapNameToImg(
                              item.items[1].id
                            )}.png`}
                          ></img>
                          <span>{item.items[1].amount}</span>
                        </div>
                        {isSmallScreen ? <></> : <> {item.items[1].name}</>}
                      </div>
                    </div>
                    <div className="childContent">
                      {" "}
                      <div className="imgtalent">
                        {item.items[2] && item.items[2].id ? (
                          <div className="img">
                            <img
                              src={`https://api.genshin.dev/materials/talent-boss/${
                                item.items[2] &&
                                item.items[2].name &&
                                this.swapNameToImg(item.items[2].name)
                              }.png`}
                            ></img>

                            <span>{item.items[2] && item.items[2].amount}</span>
                          </div>
                        ) : (
                          <></>
                        )}
                        {isSmallScreen ? (
                          <></>
                        ) : (
                          <> {item.items[2] && item.items[2].name} </>
                        )}
                      </div>
                    </div>
                    <div className="childContent">
                      {" "}
                      <div className="imgtalent">
                        {item.items[3] && item.items[3].id ? (
                          <div className="img">
                            <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/talent_lvl_up_materials/crown_of_insight.png?strip=all&quality=100&w=64"></img>
                            <span>{item.items[3] && item.items[3].amount}</span>
                          </div>
                        ) : (
                          <></>
                        )}
                        {isSmallScreen ? (
                          <></>
                        ) : (
                          <> {item.items[3] && item.items[3].name} </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

            <div className="materialTotal d-flex col-12">
              <span className="col-lg-1 col-2">Total</span>
              <div className="col-lg-1 col-2 viewsTotal">
                <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/materials/mora.png?strip=all&quality=100&w=64"></img>

                <span> {totalMora}</span>
              </div>

              {Object.entries(this.countAmounts(totalTalentMaterial)) &&
                Object.entries(this.countAmounts(totalTalentMaterial)).map(
                  (item, index) => {
                    return (
                      <>
                        <>
                          {" "}
                          {totalTalentMaterial &&
                            totalTalentMaterial.length > 0 &&
                            totalTalentMaterial.map((ite, index) => {
                              if (Object.values(ite).includes(item[0]))
                                status = ite.status;
                              // console.log(ite.status);
                            })}
                          {/* {console.log(item && item)} */}
                          <div className="viewsTotal col-lg-1 col-2">
                            <span>{item[1]}</span>
                            <img
                              src={`https://api.genshin.dev/materials/${status}/${this.swapNameToImg(
                                item[0]
                              )}`}
                            ></img>
                          </div>
                        </>
                      </>
                    );
                  }
                )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CharacterMaterial;
