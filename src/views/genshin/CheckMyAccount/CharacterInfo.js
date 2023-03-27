import React, { Component } from "react";
import axios from "axios";
// const { EnkaClient } = require("enka-network-api");

class CharacterInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterData: null,
    };
  }

  componentDidMount() {
    const { uid } = this.props;
    const access_token = "cnF7TiZqHAAvYqgCBoSPx5EjwezOh1ZHoqSHf7dT"; // Thay đổi access token tùy ý

    // const enka = new EnkaClient();

    // enka.fetchUser(853050206).then((user) => {
    //   console.log(user);
    // });

    axios
      .get(
        `https://api-takumi.mihoyo.com/game_record/app/card/wapi/getGameRecordCard?uid=${uid}&game_biz=hk4e_cn&region=hk4e&access_token=${access_token}`
      )
      .then((response) => {
        console.log(response);

        this.setState({ characterData: response.data.data.avatars });
      })
      .catch((error) => {
        console.log(error);
      });
    // axios
    //   .get(
    //     `https://enka.network/u/814398054/__data.json?x-sveltekit-invalidated=_1`
    //   )
    //   .then((response) => {
    //     console.log(response.data.nodes[1].data);
    //     this.setState({ characterData: response.data.data.avatars });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  render() {
    const { characterData } = this.state;

    if (!characterData) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Character Info</h2>
        <ul>
          {characterData.map((character) => (
            <li key={character.id}>
              {character.name} ({character.element})
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CharacterInfo;
