import React from "react";

function HudIcon(props) {
  return (
    <div
      className="btn-sm border-0 text-light font-weight-bold m-1 pt-2 "
      style={{ background: props.color }}
    >
      {" "}
      {props.symbol}{" "}
    </div>
  );
}

export default HudIcon;
