import React from "react";

import HudIcon from "./HudIcon";

function StatusBar(props) {
  return (
    <div className={`card border-0 bg-transparent`}>
      <div className="d-flex justify-content-between">
        <HudIcon symbol={props.symbol} color={props.color} />
        <span className={` list-group-item bg-transparent`}>{props.name}</span>

        <span className={`list-group-item bg-transparent`}>
          {props.resource}{" "}
        </span>
      </div>
    </div>
  );
}

export default StatusBar;

// style={{ background: props.color }}
