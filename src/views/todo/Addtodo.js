import { render } from "@testing-library/react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default class Addtodo extends React.Component {
  state = {
    title: "",
  };
  handerinput = (event) => {
    this.setState({
      title: event.target.value,
    });
    // this.props.addnewtodo(todo);
  };
  handerclick = () => {
    let todo = {
      id: Math.floor(Math.random() * 101),
      title: this.state.title,
    };
    this.setState({
      title: "",
    });

    if (!this.state.title) {
      toast.error("missing title");
      return;
    }

    this.props.addnewtodo(todo);
    document.getElementById("inpadd").value = "";
  };
  render() {
    let { title } = this.state;
    return (
      <>
        <div className="add-todo">
          <input
            className="inpadd"
            type="text"
            onChange={(event) => this.handerinput(event)}
          />
          <button
            type="button"
            className="add"
            onClick={() => this.handerclick()}
          >
            Add
          </button>
        </div>
      </>
    );
  }
}
