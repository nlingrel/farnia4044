import React from "react";

export default function SystemBody(props) {
  const fills = ["white", "brown", "green", "blue", "grey", "orange", "yellow"];
  const fill = fills[Math.floor(Math.random() * fills.length)];

  const canvasSize = "100";
  const ellipseCX = `${canvasSize / 2}`;
  const ellipseCY = `${canvasSize / 2}`;
  const rxry = { rx: `${canvasSize / 4}`, ry: `${canvasSize / 4}` };

  return (
    <>
      <div>
        <svg height={canvasSize} width={canvasSize}>
          <ellipse
            cx={ellipseCX}
            cy={ellipseCY}
            rx={rxry.rx}
            ry={rxry.ry}
            style={{ fill: fill, strokeWidth: "0" }}
          />
        </svg>
      </div>
    </>
  );
}
