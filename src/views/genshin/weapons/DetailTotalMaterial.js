import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
    let { count } = this.state;
    let { origin } = this.props;
    let rarity;
    let status = "";

    return (
      <>
        <div className="total-material col-12 d-flex">
          <div className="col-1">Total:</div>
          <div className="col-lg-1 col-2">
            {" "}
            <div
              className="imageContent"
              // style={{
              //   backgroundImage: `url(
              //                 https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_1star.png?strip=all&quality=100&w=32
              //               )`,
              // }}
            >
              <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/materials/mora.png?strip=all&quality=100&w=64"></img>
              <span className="sumMaterial"> {this.props.mora}</span>
            </div>{" "}
          </div>
          {Object.keys(count).map((name) => (
            <div className="item-material col-lg-1 col-2" key={name}>
              {/* {console.log(name)} */}
              {origin &&
                origin.length > 0 &&
                origin.map((item, index) => {
                  if (Object.values(item).includes(name)) {
                    status = item.status;
                  }
                })}

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
        {/* <Container>
          <Row>
            <Col>Total: </Col>
            <Col>
              {" "}
              <div
                className="imageContent"
                style={{
                  backgroundImage: `url(
                              https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/bg_1star.png?strip=all&quality=100&w=32
                            )`,
                }}
              >
                <img src="https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/materials/mora.png?strip=all&quality=100&w=64"></img>
                <span className="sumMaterial"> {this.props.mora}</span>
              </div>{" "}
            </Col>
   

    
          </Row>
        </Container> */}
      </>
    );
  }
}
export default DetailMaterial;
