import logo from "./logo.svg";
import "./App.scss";
import Example from "./Example/component";
import Listtodo from "./todo/Listtodo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./nav/Nav";
import Footer from "./nav/Footer";
import Home from "./Example/Home";
import Profile from "./User/Listuser";
import Detaiuser from "./User/Detaiuser";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Listuser from "./User/Listuser";

import Genshin from "./genshin/Genshin";
import Character from "./genshin/Character";
import AyakaInfo from "./genshin/Testapi";
import Artifacts from "./genshin/artifact/Artifacts";
import Weapon from "./genshin/weapons/Weapon";

import BaseWeapon from "./genshin/weapons/BaseWeapon";
import Testcss from "./genshin/artifact/Testcss";

import CharacterInfo from "./genshin/CheckMyAccount/CharacterInfo";
// import component from "./Example/component";

function App() {
  const uid = 853050206;
  return (
    <BrowserRouter forceRefresh={true}>
      <div className="App">
        <header className="App-header">
          <Nav />
          {/* <img src={logo} className="App-logo" alt="logo" /> */}

          <Switch>
            <Route
              path="/"
              exact
              //   loader={({ params }) => {
              //     console.log(params.teamId); // "hotspur"
              //   }}
              //   // and the action
              //   action={({ params }) => {}}
              // element={<Home />}
              // accesstoken cnF7TiZqHAAvYqgCBoSPx5EjwezOh1ZHoqSHf7dT
            >
              <Character />
            </Route>
            <Route path="/todo">
              <Listtodo />
            </Route>
            <Route path="/about">
              <Example />
            </Route>
            <Route path="/user" exact>
              <Listuser />
            </Route>
            <Route path="/user/:id">
              <Detaiuser />
            </Route>
            <Route path="/character" exact>
              <Character />
            </Route>
            <Route path="/artifact" exact>
              <Artifacts />
            </Route>
            {/* <Route path="/character/:char" exact>
              <Genshin />
            </Route> */}
            <Route
              path="/character/:char"
              render={({ match }) => <Genshin key={match.params.char} />}
            />
            <Route path="/test" exact>
              <AyakaInfo />
            </Route>
            <Route path="/weapon" exact>
              <Weapon />
            </Route>
            <Route
              path="/weapon/:weapon"
              render={({ match }) => <BaseWeapon key={match.params.weapon} />}
            />
            <Route>
              <CharacterInfo uid={uid} />
            </Route>
          </Switch>

          <Footer />
        </header>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
