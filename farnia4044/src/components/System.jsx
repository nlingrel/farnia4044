import React, { useContext } from "react";
import HudIcon from "./HudIcon";

export default function System(props) {
  const getRotationAngle = () => {
    return Math.floor(Math.random() * 360);
  };
  const angle1 = getRotationAngle();
  const angle2 = getRotationAngle();
  const ellipseCX = "40";
  const ellipseCY = "40";
  const rotate1 = `rotate(${angle1}, ${ellipseCX}, ${ellipseCY} )`;
  const rotate2 = `rotate(${angle2}, ${ellipseCX}, ${ellipseCY} )`;
  return (
    <>
      <div className="d-flex justify-content-center" value={props.value}>
        <svg height="80" width="80">
          <ellipse
            cx="40"
            cy="40"
            rx="24"
            ry="20"
            transform={rotate1}
            value={props.value}
            style={{
              fillOpacity: "0",
              strokeWidth: "0",
              strokeWidth: "1",
              stroke: "white",
              zIndex: "2",
            }}
          />
          <text
            textLength="18"
            lengthAdjust="spacingAndGlyphs"
            x="32"
            y="44"
            style={{ stroke: props.color, fill: props.color }}
            value={props.value}
          >
            {props.symbol}
          </text>

          <ellipse
            cx="40"
            cy="40"
            rx="28"
            ry="14"
            transform={rotate2}
            style={{
              fillOpacity: "0",
              strokeWidth: "0",
              strokeWidth: "1",
              stroke: "white",
              zIndex: "2",
            }}
            value={props.value}
          />
          {/* <ellipse
            cx="40"
            cy="40"
            rx="18"
            ry="18"
            style={{ fillOpacity: "0", strokeWidth: "0", opacity: ".9" }}
          /> */}
        </svg>

        {/* <HudIcon
          symbol={props.symbol}
          value={props.value}
          color={props.color}
        /> */}
      </div>
    </>
  );
}
