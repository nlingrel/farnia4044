import React from "react";

function TipBox({ tips }) {
  const index = tips.length < 1 ? 0 : Math.floor(Math.random() * tips.length);
  return (
    <>
      <div className="card bg-transparent text-center text-info border-0">
        {tips[index]}
      </div>
    </>
  );
}

export default TipBox;
