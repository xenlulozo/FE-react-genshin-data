import React from "react";
import axios from "axios";
import "./artifact.scss";

import BaseArtifact from "./BaseArtifact";

class Artifacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artifact: [],
      baseArtifact: {},
      selectedObject: null,
      style: {
        // "& .artifaceContent col-3": {
        // font-weight: bold;
        backgroundColor: "blue",
        // },
      },
    };
    this.handleObjectClick = this.handleObjectClick.bind(this);
    this.getObjectClassName = this.getObjectClassName.bind(this);
  }
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
  async componentDidMount() {
    let data = await axios.get(`https://api.genshin.dev/artifacts`);
    // console.log(data.data);
    this.setState({
      artifact: data.data,
    });
  }
  handelSeeArtifact = (index) => {
    // console.log("ashsh");
    // this.setState({
    //   // ...this.state.style,
    //   // position: "absolute",
    //   style: {
    //     // ...this.state.style,
    //     // " .artifaceContent col-3 :nthChild(1)": {
    //     backgroundColor: "blue",
    //     // },
    //   },
    // });
  };

  render() {
    let { artifact, style } = this.state;
    // console.log(artifact);
    let arr = [];
    arr = Object.entries(this.state.artifact);
    let data = {};
    //   const styletest = `
    //   .artifaceContent col-3:nth-child(${index}) {
    //     background-color: blue;
    //   }
    // `;
    return (
      <>
        <div className="container">
          <div className="artifactContainer col-12">
            {arr &&
              arr.length > 0 &&
              arr.map((item, index) => {
                return (
                  <>
                    {item[1].includes("prayers") ? (
                      <>
                        <div
                          className="artifaceContent col-12 col-lg-3 my-2 mx-2"
                          // style={style}
                          onClick={() => this.handleObjectClick(index)}
                        >
                          <span>{item[1]}</span>
                          <div className="listImage">
                            <img
                              className="imgOfArtifact"
                              src={`https://api.genshin.dev/artifacts/${item[1]}/circlet-of-logos.png`}
                              // alt="Err"
                            ></img>
                            <img
                              className="imgOfArtifact"
                              src={`https://api.genshin.dev/artifacts/${item[1]}/circlet-of-logos.png`}
                              // alt="Err"
                            ></img>
                          </div>
                          <div
                            className="valueOfArtifact"
                            //   onClick={() => this.getDataOfArtifact(item[1])}
                          >
                            <BaseArtifact artifact={item} />
                            {/* {this.getDataOfArtifact(item[1])} */}
                            {/* {console.log(data)} */}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* <div
                        className={`myObject ${this.getObjectClassName(1)}`}
                        onClick={() => this.handleObjectClick(1)}
                      > */}
                        <div
                          className={`artifaceContent col-12 col-lg-3 my-2 mx-2 ${this.getObjectClassName(
                            index
                          )}`}
                          // style={style}
                          onClick={() => this.handleObjectClick(index)}
                        >
                          <span>{item[1]}</span>
                          <div className="listImage">
                            <img
                              className="imgOfArtifact"
                              src={`https://api.genshin.dev/artifacts/${item[1]}/flower-of-life`}
                              // alt="Err"
                            ></img>
                            <img
                              className="imgOfArtifact"
                              src={`https://api.genshin.dev/artifacts/${item[1]}/goblet-of-eonothem`}
                              // alt="Err"
                            ></img>
                            <img
                              className="imgOfArtifact"
                              src={`https://api.genshin.dev/artifacts/${item[1]}/plume-of-death`}
                              // alt="Err"
                            ></img>
                            <img
                              className="imgOfArtifact"
                              src={`https://api.genshin.dev/artifacts/${item[1]}/sands-of-eon`}
                              // alt="Err"
                            ></img>
                            <img
                              className="imgOfArtifact"
                              src={`https://api.genshin.dev/artifacts/${item[1]}/circlet-of-logos`}
                              // alt="Err"
                            ></img>
                          </div>
                          <div
                            className="valueOfArtifact"
                            //   onClick={() => this.getDataOfArtifact(item[1])}
                          >
                            <BaseArtifact artifact={item} />
                            {/* {this.getDataOfArtifact(item[1])} */}
                            {/* {console.log(data)} */}
                          </div>
                        </div>
                        {/* </div> */}
                      </>
                    )}
                  </>
                );
              })}
          </div>
          <br />
        </div>
        {/* <h1>Artifacts</h1> */}
      </>
    );
  }
}

export default Artifacts;
