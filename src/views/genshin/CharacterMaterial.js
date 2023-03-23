import React from "react";
import axios from "axios";
import "./characterMaterial.scss";

class CharacterMaterial extends React.Component {
  state = {
    characterName: "",
    ascensionMaterial: [],
    totalMaterial: {},
    selectIndexStat: 0,
    talentMaterial: {},
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
        `https://genshin-builds.com/_next/data/ZtyUh7jVf6D4v2efOc9XN/en/character/${this.state.characterName}.json`
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
    return name.replace(/_/g, "-");
  };
  setSelectIndexStat = (index) => {
    // console.log("ass");
    // alert("aa");
    this.setState({
      selectIndexStat: index,
    });
  };

  render() {
    // console.log(this.swapNameToImg("shivada_jade_sliver"));
    let { ascensionMaterial, selectIndexStat, talentMaterial } = this.state;
    // console.log("state", ascensionMaterial);
    let totalMora = 0;
    let totalMaterial = [];
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
              <div className=" routeStat">
                <div onClick={() => this.setSelectIndexStat(0)}>Lv.1-20</div>
                <div onClick={() => this.setSelectIndexStat(1)}>Lv.20-40</div>
                <div onClick={() => this.setSelectIndexStat(2)}>Lv.40-50</div>
                <div onClick={() => this.setSelectIndexStat(3)}>Lv.50-60</div>
                <div onClick={() => this.setSelectIndexStat(4)}>Lv.60-70</div>
                <div onClick={() => this.setSelectIndexStat(5)}>Lv.70-80</div>
                <div onClick={() => this.setSelectIndexStat(6)}>Lv.80-90</div>
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

                              <span> Mora</span>
                            </>
                          ) : (
                            <>
                              <div className="imgContainer">
                                <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/materials/mora.png?strip=all&quality=100&w=64"></img>
                                <span> 0</span>
                              </div>

                              <span> Mora</span>
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
                              {item["mat1"] && item["mat1"]["name"]}
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
                              {item["mat2"] && item["mat2"]["name"]}
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
                                  src={`https://api.genshin.dev/materials/local-specialties/${
                                    item["mat3"] && item["mat3"]["id"]
                                  }`}
                                ></img>
                                <span>
                                  {" "}
                                  {item["mat3"] && item["mat3"]["amount"]}
                                </span>
                              </div>
                              {item["mat3"] && item["mat3"]["name"]}
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
                              {item["mat4"] && item["mat4"]["name"]}
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
              <div className="materialTotal">
                {/* {this.countAmounts(totalMaterial) &&
                this.countAmounts(totalMaterial) &&
                (total = this.countAmounts(totalMaterial))} */}
                {/* {console.log("sum material", this.countAmounts(totalMaterial))} */}
                {/* <div> */}
                {/* {console.log("origin", totalMaterial)} */}
                <span> Total:</span>
                <div className="viewsTotal">
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
                              <div className="viewsTotal">
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
                console.log(item);
                return (
                  <div className="talentContent">
                    <div className="childContent">
                      Lv.{item.level - 1} {"\u2192"} {item.level}
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
                      <div className="imgtalent">
                        <div className="img">
                          <img
                            src={`https://api.genshin.dev/materials/talent-book/${this.swapNameToImg(
                              item.items[0].id
                            )}.png`}
                          ></img>
                          <span>{item.items[0].amount}</span>
                        </div>
                        {item.items[0].name}
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
                        {item.items[1].name}
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
                                item.items[2].id &&
                                this.swapNameToImg(item.items[2].id)
                              }.png`}
                            ></img>
                            <span>{item.items[2] && item.items[2].amount}</span>
                          </div>
                        ) : (
                          <></>
                        )}
                        {item.items[2] && item.items[2].name}{" "}
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
                        {item.items[3] && item.items[3].name}{" "}
                      </div>
                    </div>
                    {/* <div className="childContent">7</div>
                    <div className="childContent">8</div> */}
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

export default CharacterMaterial;
