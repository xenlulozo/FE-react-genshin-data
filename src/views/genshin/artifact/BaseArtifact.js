import React, { useState, useEffect } from "react";
import axios from "axios";
import TextTruncate from "react-text-truncate";

import "./baseartifact.scss";

// class BaseArtifact extends React.Component {
//   state = {
//     data: {},
//   };

//   async componentDidMount() {
//     // console.log(this.props.artifact[1]);
//     // this.setState({
//     //   data: data.data,
//     // });
//     useEffect(async () => {
//       await axios
//         .get(`https://api.genshin.dev/artifacts/${this.props.artifact[1]}`)
//         .then((response) => {
//           setData(response.data);
//           // console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }, []);
//   }

//   render() {
//     // let { data } = this.state;
//     return (
//       <>
//         {/* {console.log(data)} */}
//         {/* <div>
//           <div className="price2">
//             <div className="numberOfSet">
//               <span>2</span>
//             </div>
//             {data["2-piece_bonus"]}
//           </div>
//           <div className="price4">
//             <div className="numberOfSet">
//               <span>4</span>
//             </div>
//             <div key={props.artifact[1]}>
//               <TextTruncate
//                 line={1}
//                 // element="span"
//                 truncateText="…"
//                 text={data["4-piece_bonus"]}
//                 // text="dihasahdsffihueofjew hiyewgew yfiewgf ew yf igew fiwygwfuy"
//               />
//             </div>
//           </div>
//         </div> */}
//       </>
//     );
//   }
// }
// export default BaseArtifact;

function BaseArtifact(props) {
  // let data = axios.get(
  //     `https://api.genshin.dev/artifacts/${props.artifact[1]}`
  //   );
  const [data, setData] = useState([]);

  useEffect(async () => {
    await axios
      .get(`https://api.genshin.dev/artifacts/${props.artifact[1]}`)
      .then((response) => {
        setData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [count, setCount] = useState(0);
  const handelClick4Price = () => {
    setCount(count + 1);
    // console.log(count);
  };
  const handelClick4PriceAgain = () => {
    setCount(0);
    // console.log(count);
  };

  return (
    <>
      {props.artifact[1].includes("prayers") ? (
        <>
          <div>
            <div className="price2" onClick={() => handelClick4PriceAgain()}>
              <div className="numberOfSet">
                <span>1</span>
              </div>
              {data["1-piece_bonus"]}
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="price2" onClick={() => handelClick4PriceAgain()}>
              <div className="numberOfSet">
                <span>2</span>
              </div>
              {data["2-piece_bonus"]}
            </div>
            <div className="price4">
              {count == 0 ? (
                <>
                  <div
                    className="conatainer"
                    onClick={() => handelClick4Price()}
                  >
                    <div className="numberOfSet">
                      <span>4</span>
                    </div>
                    <div className="content4" key={props.artifact[1]}>
                      <TextTruncate
                        line={1}
                        // element="span"
                        truncateText="…"
                        text={data["4-piece_bonus"]}
                        // text="dihasahdsffihueofjew hiyewgew yfiewgf ew yf igew fiwygwfuy"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="conatainer"
                    onClick={() => handelClick4PriceAgain()}
                  >
                    <div className="numberOfSet">
                      <span>4</span>
                    </div>
                    <div className="content4" key={props.artifact[1]}>
                      {/* <TextTruncate
                    line={1}
                    // element="span"
                    truncateText="…" */}
                      {data["4-piece_bonus"]}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default BaseArtifact;
