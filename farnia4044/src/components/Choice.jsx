import React from "react";

import HudIcon from "./HudIcon";

function Choice(props) {
  //

  return (
    <div tabIndex={props.value} className="btn-group">
      <div className="card bg-transparent border-0">
        <button
          style={{ listStyleType: "none" }}
          className={`btn btn-outline-info font-weight-bold`}
          onClick={props.onSelect}
          type="button"
          value={props.value}
          title="choose"
        >
          {props.choice.name}
          {props.scene === 1 ? (
            <li
              value={props.value}
              style={
                props.choice.distance <= 0
                  ? { background: props.colors.farsecs, color: "white" }
                  : { background: props.colors.farsecs, color: "red" }
              }
            >
              {props.choice.distance}
              <HudIcon symbol={props.symbols.farsecs} value={props.value} />
            </li>
          ) : (
            ""
          )}
          {props.scene === 1 ? (
            <li
              value={props.value}
              style={{
                background:
                  props.colors[props.choice.encounters[0].mainResource],
              }}
            >
              <HudIcon
                symbol={props.symbols[props.choice.encounters[0].mainResource]}
                value={props.value}
              />
            </li>
          ) : (
            ""
          )}
          {props.scene === 2 ? (
            <li
              value={props.value}
              className="text-light"
              style={{ background: props.colors[props.choice.rewards[0].name] }}
            >
              {props.choice.rewards[0].amount}
              <HudIcon
                symbol={props.symbols[props.choice.rewards[0].name]}
                value={props.value}
              />
            </li>
          ) : (
            ""
          )}
          {props.scene === 2 && props.choice.rewards.length === 2 ? (
            <li
              value={props.value}
              style={{ background: props.colors[props.choice.rewards[1].name] }}
              className="text-light"
            >
              {props.choice.rewards[1].amount}
              <HudIcon
                symbol={props.symbols[props.choice.rewards[1].name]}
                value={props.value}
              />
            </li>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
}

export default Choice;
