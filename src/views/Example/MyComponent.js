import React from "react";

class MyComponent extends React.Component {
  state = {
    conditision: false,
  };

  handelclick = () => {
    this.setState({
      conditision: !this.state.conditision,
    });
  };
  handeldelete = (job) => {
    console.log(job);
    this.props.deleteAjob(job);
  };

  render() {
    let { arrjob } = this.props;
    return (
      <>
        {this.state.conditision === false ? (
          <div>
            <button onClick={() => this.handelclick()}>Show</button>
          </div>
        ) : (
          <>
            <div>
              {arrjob.map((item, index) => {
                return (
                  <div key={item.id}>
                    {item.title} - {item.salary}
                    <span onClick={() => this.handeldelete(item)}> X</span>
                  </div>
                );
              })}
            </div>
            <button onClick={() => this.handelclick()}>Hide</button>
          </>
        )}
      </>
    );
  }
}

export default MyComponent;
