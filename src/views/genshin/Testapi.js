import React from "react";
import axios from "axios";

//scss
import "./testapi.scss";

class AyakaInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ayaka: null,
      tempSkill: 0,
      characterName: "",
    };
  }

  async componentDidMount() {
    // console.log(this.props.nameCharacter);
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
        // console.log(this.state.characterName);
      })
      .catch((error) => {
        console.error(error);
      });
    await axios
      .get(
        `https://genshin-builds.com/_next/data/JMKkzXJIKlrPswuLNJOr2/en/character/${this.state.characterName}.json`
      )
      .then((response) => {
        this.setState({ ayaka: response.data });
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handelClickPlus = () => {
    let temp = this.state.tempSkill;
    if (temp < 14) {
      temp++;
    }

    console.log(temp);
    this.setState({
      tempSkill: temp,
    });
  };
  handelClickSub = () => {
    let temp = this.state.tempSkill;
    if (temp != 0) {
      temp--;
    }

    this.setState({
      tempSkill: temp,
    });
  };
  render() {
    const { ayaka, tempSkill } = this.state;
    let numSkill = this.props.numSkill;
    // let numSkill = 0;
    if (!ayaka) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {/* {console.log(ayaka.pageProps.character)} */}
        {/* {ayaka.pageProps.character.skills[0].description} */}

        <div className="listBaseSkillContent ">
          <div className="button">
            <button
              type="button"
              className="leftButton"
              onClick={() => this.handelClickSub()}
            >
              -
            </button>
            <span>{tempSkill + 1}</span>
            <button
              type="button"
              className="rightButton"
              onClick={() => this.handelClickPlus()}
            >
              +
            </button>
          </div>

          {ayaka.pageProps.character.skills[numSkill].attributes &&
            ayaka.pageProps.character.skills[numSkill].attributes.length > 0 &&
            ayaka.pageProps.character.skills[numSkill].attributes.map(
              (item, index) => {
                return (
                  <>
                    {/* <br /> */}
                    <div className="contentSkill">
                      <span className="leftContent">{item.label}</span>{" "}
                      <span className="rightContent">
                        {item.values[tempSkill]}
                      </span>{" "}
                    </div>
                  </>
                );
              }
            )}
        </div>
      </div>
    );
  }
}

export default AyakaInfo;
