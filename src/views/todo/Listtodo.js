import React from "react";
import "./style.scss";
import Addtodo from "./Addtodo";
import { ToastContainer, toast } from "react-toastify";

export default class Listtodo extends React.Component {
  state = {
    listtodo: [
      { id: "1", title: "play genshin" },
      { id: "2", title: "learning songthing" },
    ],
    edittodo: {},
  };

  addnewtodo = (todo) => {
    // let currentodo = this.state.listtodo;
    // currentodo.push(todo);

    this.setState({
      listtodo: [...this.state.listtodo, todo],
      //   listtodo: currentodo,
    });
    toast.success("Add to success");
  };
  handeldeletetodo = (todo) => {
    let currentodo = this.state.listtodo;
    currentodo = currentodo.filter((item) => item.id !== todo.id);
    this.setState({
      listtodo: currentodo,
    });
    toast.success("delete todo success");
  };
  handeledittodo = (todo) => {
    let { edittodo, listtodo } = this.state;
    let isemptytodo = Object.keys(edittodo).length === 0;
    //save
    if (isemptytodo === false && edittodo.id === todo.id) {
      let listtodocoppy = [...listtodo];
      let findindex = listtodocoppy.findIndex((item) => item.id === todo.id);
      listtodocoppy[findindex].title = edittodo.title;
      this.setState({
        listtodo: listtodocoppy,
        edittodo: {},
      });
      toast.success("update todo success");
      return;
    }
    //edit
    this.setState({
      edittodo: todo,
    });
  };
  updatetodo = (event) => {
    //coppy object
    let edittodocoppy = { ...this.state.edittodo };
    edittodocoppy.title = event.target.value;
    // console.log(edittodocoppy.title);
    // console.log(this.state.edittodo.title);
    this.setState({
      edittodo: edittodocoppy,
    });
  };

  render() {
    let { listtodo, edittodo } = this.state;

    //check obj empty
    let isemptytodo = Object.keys(edittodo).length === 0;
    // console.log(isemptytodo);
    return (
      <>
        <div className="list-todo-container">
          <Addtodo addnewtodo={this.addnewtodo} />
          <div className="list-todo-content">
            {listtodo &&
              listtodo.length > 0 &&
              listtodo.map((item, index) => {
                return (
                  <>
                    <div className="todo-child" key={item.id}>
                      {isemptytodo === true ? (
                        <span>
                          {index + 1} -{item.title}
                        </span>
                      ) : (
                        <>
                          {edittodo.id === item.id ? (
                            <span>
                              {index + 1}-{" "}
                              <input
                                type="text"
                                value={edittodo.title}
                                onChange={(event) => this.updatetodo(event)}
                              />
                            </span>
                          ) : (
                            <span>
                              {index + 1} -{item.title}
                            </span>
                          )}
                        </>
                      )}
                      <button
                        className="edit"
                        onClick={() => this.handeledittodo(item)}
                      >
                        {edittodo.id === item.id ? "Save" : "Edit"}
                      </button>
                      <button
                        className="delete"
                        onClick={() => this.handeldeletetodo(item)}
                      >
                        delete
                      </button>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}
