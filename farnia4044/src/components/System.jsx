import React from "react";

export default function System(props) {
  const canvasSize = "100";
  const ellipseCX = `${canvasSize / 2}`;
  const ellipseCY = `${canvasSize / 2}`;
  const textLength = "24";
  const textX = `${canvasSize / 2 - textLength / 2}`;
  const textY = `${canvasSize / 2 + textLength / 3}`;

  const getRotationAngle = () => {
    return Math.floor(Math.random() * 360);
  };
  const getRotationString = (angle) => {
    const angl = angle ? angle : getRotationAngle();
    return `rotate(${angl}, ${ellipseCX}, ${ellipseCY} )`;
  };
  const getRxRy = () => {
    const xfloor = ellipseCX - ellipseCX / 3;
    const xceil = ellipseCX - ellipseCX / 2;
    const yfloor = ellipseCY * 1.3 - ellipseCY / 2;
    const yceil = ellipseCY * 1.3 - ellipseCY / 3;
    console.log("yfloor ", yfloor, "yceil", yceil);

    let rx = xfloor + Math.floor(Math.random() * (xceil - xfloor));
    let ry = yfloor + Math.floor(Math.random() * (yceil - yfloor));
    return { rx: `${rx}`, ry: `${ry}` };
  };
  const amnt = Math.floor(Math.random() * 3) + 1;

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
          transform={getRotationString(startRotAngle + startRotAngle * (i + 1))}
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
        <svg height={canvasSize} width={canvasSize}>
          {ellipses}
          <text
            textLength={textLength}
            lengthAdjust="spacingAndGlyphs"
            x={textX}
            y={textY}
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
