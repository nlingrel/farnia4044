import React from "react";

export default function SystemBody(props) {
  return (
    <>
      <div>
        <svg height="80" width="80">
          <ellipse
            cx="40"
            cy="40"
            rx="22"
            ry="22"
            style={{ fill: "white", strokeWidth: "0", opacity: ".1" }}
          />
          <ellipse
            cx="40"
            cy="40"
            rx="20"
            ry="20"
            style={{ fill: "blue", strokeWidth: "0" }}
          />
        </svg>
      </div>
    </>
  );
}
