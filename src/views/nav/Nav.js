import React from "react";
import "./nav.scss";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
// import asNavLink from "as-nav-link";

export default class Nav extends React.Component {
  render() {
    return (
      <div className="topnav">
        {/* <NavLink to="/" activeclassName="active" exact={true}>
          Home
        </NavLink>

        <NavLink to="/todo">Todo</NavLink>

        <NavLink to="/about">About</NavLink> */}

        {/* <NavLink to="/user">List user</NavLink> */}
        <NavLink to="/character"> Character</NavLink>
        {/* <NavLink to="/test">test</NavLink> */}
        <NavLink to="/artifact">Artifacts</NavLink>
        <NavLink to="/weapon">Weapons</NavLink>
        {/* <NavLink to="/WatchChar">Watch Character</NavLink> */}

        {/* <BrowserRouter>
          <Link className="active" to="/">
            Home
          </Link>
          <Link to="/todo">Todo</Link>
          <Link to="/about">About</Link>
          <Link to="/user">User</Link>
          <Link to="/detaiuser">Detaiuser</Link>
          <Link to="/character"> Character</Link>
        </BrowserRouter> */}

        {/* <a className="active" href="/">
          Home
        </a>
        <a href="/todo">Todo</a>
        <a href="/about">About</a>
        <a href="/user">List user</a>
        <a href="/detaiuser">Detaiuser</a>
        <a href="/character"> Character</a>
        <a href="/test">test</a> */}
      </div>
    );
  }
}
