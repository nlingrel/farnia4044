import React from "react";

function HudIcon(props) {
  return (
    <button className="btn-sm m-1" style={{ background: props.color }}>
      {" "}
      {props.symbol}{" "}
    </button>
  );
}

export default HudIcon;
