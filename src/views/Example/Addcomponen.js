import React from "react";

class Addcomponen extends React.Component {
  state = {
    title: "",
    salary: "",
  };
  handlerchangetitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  handlerchangesalary = (event) => {
    this.setState({
      salary: event.target.value,
    });
  };
  handlesubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    if (!this.state.title || !this.state.salary) {
      alert("missing required params");
      return;
    }
    this.props.addnewjob({
      id: Math.floor(Math.random() * 100),
      title: this.state.title,
      salary: this.state.salary,
    });
    this.setState({
      title: "",
      salary: "",
    });
  };
  render() {
    return (
      <>
        <form>
          <label htmlFor="fname">Jobs title:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={(event) => this.handlerchangetitle(event)}
          />
          <br />
          <label htmlFor="lname">salary:</label>
          <br />
          <input
            type="text"
            value={this.state.last}
            onChange={(event) => this.handlerchangesalary(event)}
          />
          <br />
          <br />
          <input
            type="submit"
            value="Submit"
            onClick={(event) => this.handlesubmit(event)}
          />
        </form>
      </>
    );
  }
}

export default Addcomponen;
