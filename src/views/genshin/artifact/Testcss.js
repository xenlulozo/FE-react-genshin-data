import React, { useState } from "react";
import "./testcss.scss";

const Testcss = () => {
  const [selectedObject, setSelectedObject] = useState(null);

  const handleObjectClick = (index) => {
    setSelectedObject(index);
  };

  const getObjectClassName = (index) => {
    if (index === selectedObject) {
      return "selected";
    }
    return "";
  };

  return (
    <div>
      <div
        className={`myObject ${getObjectClassName(1)}`}
        onClick={() => handleObjectClick(1)}
      >
        Object 1
      </div>
      <div
        className={`myObject ${getObjectClassName(2)}`}
        onClick={() => handleObjectClick(2)}
      >
        Object 2
      </div>
      <div
        className={`myObject ${getObjectClassName(3)}`}
        onClick={() => handleObjectClick(3)}
      >
        Object 3
      </div>
    </div>
  );
};

export default Testcss;

// import React, { Component } from "react";
// import "./testcss.scss";

// class Testcss extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       selectedObject: null,
//     };

//     this.handleObjectClick = this.handleObjectClick.bind(this);
//     this.getObjectClassName = this.getObjectClassName.bind(this);
//   }

//   handleObjectClick(index) {
//     this.setState({
//       selectedObject: index,
//     });
//   }

//   getObjectClassName(index) {
//     if (index === this.state.selectedObject) {
//       return "selected";
//     }
//     return "";
//   }

//   render() {
//     return (
//       <div>
//         <div
//           className={`myObject ${this.getObjectClassName(1)}`}
//           onClick={() => this.handleObjectClick(1)}
//         >
//           Object 1
//         </div>
//         <div
//           className={`myObject ${this.getObjectClassName(2)}`}
//           onClick={() => this.handleObjectClick(2)}
//         >
//           Object 2
//         </div>
//         <div
//           className={`myObject ${this.getObjectClassName(3)}`}
//           onClick={() => this.handleObjectClick(3)}
//         >
//           Object 3
//         </div>
//       </div>
//     );
//   }
// }

// export default Testcss;
