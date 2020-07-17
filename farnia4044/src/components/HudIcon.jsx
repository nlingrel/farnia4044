import React from "react";

function HudIcon(props) {
  return (
    <div
      className="btn text-light font-weight-bold  "
      style={{ background: props.color }}
    >
      {" "}
      {props.symbol}{" "}
    </div>
  );
}

export default HudIcon;
