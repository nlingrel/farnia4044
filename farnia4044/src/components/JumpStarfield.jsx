import React from "react";
import StarFieldAnimation from "react-starfield-animation";

function JumpStarField(props) {
  return (
    <>
      <StarFieldAnimation
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        numParticles={300}
        depth={10}
      />
    </>
  );
}

export default JumpStarField;
