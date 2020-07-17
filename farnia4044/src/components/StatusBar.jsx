import React from "react";

import HudIcon from "./HudIcon";

function StatusBar(props) {
  return (
    <div className="m-1">
      <div className={`card border-0 bg-transparent`}>
        <div className="btn-group">
          <HudIcon symbol={props.symbol} color={props.color} />
          <span className={` btn btn-outline-info font-weight-bold`}>
            {props.name}
          </span>

          <span className={`btn btn-outline-info font-weight-bold`}>
            {props.resource}{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatusBar;
