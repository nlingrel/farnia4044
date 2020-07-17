import React from "react";

export default function System(props) {
  const getRotationAngle = () => {
    return Math.floor(Math.random() * 360);
  };
  const getRotationString = (angle) => {
    const angl = angle ? angle : getRotationAngle();
    return `rotate(${angl}, ${ellipseCX}, ${ellipseCY} )`;
  };
  const getRxRy = () => {
    const xfloor = 12;
    const xceil = 18;
    const yfloor = 17;
    const yceil = 26;
    let rx = xfloor + Math.floor(Math.random() * (xceil - xfloor));
    let ry = yfloor + Math.floor(Math.random() * (yceil - yfloor));
    return { rx: `${rx}`, ry: `${ry}` };
  };
  const amnt = Math.floor(Math.random() * 3) + 1;

  const ellipseCX = "40";
  const ellipseCY = "40";

  const makeEllipses = (amnt) => {
    let ellipses = [];
    let rxry = getRxRy();
    let startRotAngle = getRotationAngle();

    for (let i = 0; i < amnt; i++) {
      ellipses.push(
        <ellipse
          cx={ellipseCX}
          cy={ellipseCY}
          rx={rxry.rx}
          ry={rxry.ry}
          transform={getRotationString(startRotAngle + (i + 1) * startRotAngle)}
          value={props.value}
          style={{
            fillOpacity: "0",
            strokeWidth: "0",
            strokeWidth: "1",
            stroke: "white",
            zIndex: "2",
          }}
        />
      );
    }
    return ellipses;
  };
  const ellipses = makeEllipses(amnt);

  return (
    <>
      <div className="d-flex justify-content-center" value={props.value}>
        <svg height="80" width="80">
          {ellipses}
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
        </svg>
      </div>
    </>
  );
}
