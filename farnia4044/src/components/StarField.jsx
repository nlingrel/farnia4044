import React from "react";
import JumpStar from "./JumpStar";

function StarField(props) {
  let starCount = 200;
  let stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push(<JumpStar key={i} index={i} value={i} />);
  }
  // for(let i =0; i < starCount; i++){
  //     stars.push(<StaticStar key={i + 200} value={i + 200}/>)
  // }

  return <>{stars}</>;
}

export default StarField;
