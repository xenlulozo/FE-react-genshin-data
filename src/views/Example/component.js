import { React } from "react";
import { Component } from "react";
import MyComponent from "./MyComponent";
import Addcomponen from "./Addcomponen";
class component extends Component {
  state = {
    arrjob: [
      { id: "1", title: "dev", salary: "700" },
      { id: "2", title: "test", salary: "400" },
      { id: "3", title: "pm", salary: "1000" },
    ],
  };

  addnewjob = (job) => {
    console.log(job);
    const crrentjob = this.state.arrjob;
    crrentjob.push(job);
    this.setState({
      // arrjob: [...this.state.arrjob, job],
      arrjob: crrentjob,
    });
  };

  deleteAjob = (job) => {
    let current = this.state.arrjob;
    current = current.filter((item) => item.id != job.id);
    this.setState({
      arrjob: current,
    });
  };

  render() {
    return (
      <>
        <Addcomponen addnewjob={this.addnewjob} />

        <MyComponent arrjob={this.state.arrjob} deleteAjob={this.deleteAjob} />
      </>
    );
  }
}
export default component;
