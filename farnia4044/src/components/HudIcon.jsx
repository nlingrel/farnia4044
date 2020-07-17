import React from "react";

function HudIcon(props) {
  return (
    <div
      className="btn border-0 text-light font-weight-bold  "
      style={{ background: props.color }}
    >
      {" "}
      {props.symbol}{" "}
    </div>
  );
}

export default HudIcon;
