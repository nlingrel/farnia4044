import React, { Component } from "react";
import StarFieldAnimation from "react-starfield-animation";

class StarField extends Component {
  render() {
    return (
      <>
        <StarFieldAnimation
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          numParticles={300}
        />
      </>
    );
  }
}

export default StarField;
