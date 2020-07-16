import React from "react";
import StarFieldAnimation from "react-starfield-animation";

function IdleStarField() {
  return (
    <>
      <StarFieldAnimation
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        numParticles={100}
        depth={1200}
      />
    </>
  );
}

export default IdleStarField;
