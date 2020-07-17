import React from "react";
import StatusBar from "./StatusBar";

function HUD(props) {
  return (
    <div
      className={` card bg-transparent border-info m-2`}
      style={{ zIndex: "1000", position: "absolute" }}
    >
      <div className={`card bg-transparent btn-outline-info`}>
        <div className="card-header text-center h5">FitRep</div>
        <div className="card-body p-1">
          <div className="btn-group btn-group-vertical">
            <StatusBar
              resource={props.fuel}
              name={"Fuel"}
              symbol={props.symbols.fuel}
              color={props.colors.fuel}
            />
            <StatusBar
              resource={props.food}
              name="Food"
              symbol={props.symbols.food}
              color={props.colors.food}
            />
            <StatusBar
              resource={props.fitness}
              name="Fitness"
              symbol={props.symbols.fitness}
              color={props.colors.fitness}
            />
            <StatusBar
              resource={props.crewCount}
              name="Farnians"
              symbol={props.symbols.farnians}
              color={props.colors.farnians}
            />
            <StatusBar
              resource={props.distanceLeft}
              name="Farsecs"
              symbol={props.symbols.farsecs}
              color={props.colors.farsecs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HUD;
