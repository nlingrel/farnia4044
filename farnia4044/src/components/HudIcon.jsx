import React from "react";

function HudIcon(props) {
  return (
    <button
      className="btn-sm border-0 text-light font-weight-bold m-1"
      style={{ background: props.color }}
    >
      {" "}
      {props.symbol}{" "}
    </button>
  );
}

export default HudIcon;
