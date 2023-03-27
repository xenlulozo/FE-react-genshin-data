import React from "react";

import "./detailTotalMaterial.scss";
class DetailMaterial extends React.Component {
  state = {
    count: {},
    loaded: false,
  };
  generateData(data) {
    return data;
  }

  componentDidMount() {
    this.setState({
      loaded: true,
    });
    console.log("propo", this.props.obj && this.props.obj);
    this.setState({
      count: this.props.obj,
    });
    // const generatedData = {
    //   ascensions: this.generateData(this.props.obj),
    // };
    // // console.log(generatedData);
    // this.setState({ count: generatedData["ascensions"] });
  }
  swapName = (name) => {
    let nameCoppy = name.toLowerCase();
    // console.log(nameCoppy);
    name = nameCoppy.replace(/ /g, "-");
    name = name.replace(/'/g, "-");
    return name;
  };
  render() {
    // console.log(this.swapName("Coral Branch of a Distant Sea"));
    let { count } = this.state;
    let { origin } = this.props;
    let rarity;
    let status = "";
    // console.log(origin);
    // {
    //   console.log(Object.values(origin).indexOf("Concealed Talon"));
    // }
    return (
      <>
        <div className="totalMaterial">
          {/* {console.log(count)} */}
          {Object.keys(count).map((name) => (
            <div key={name}>
              {/* {console.log(name)} */}
              {origin &&
                origin.length > 0 &&
                origin.map((item, index) => {
                  if (Object.values(item).includes(name)) {
                    status = item.status;
                  }
                })}
              {/* {console.log(Object.values(item).includes(name), name)} */}
              <div
                className="imageContent"
                style={{
                  backgroundImage: `url(
                    https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_${rarity}star.png?strip=all&quality=100&w=32
                  )`,
                }}
              >
                <img
                  src={`https://api.genshin.dev/materials/${status}/${this.swapName(
                    name
                  )}.png`}
                ></img>
                <span>{count[name]}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
export default DetailMaterial;
