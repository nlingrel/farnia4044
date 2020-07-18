import React from "react";

import HudIcon from "./HudIcon";
import SystemBody from "./SystemBody";
import System from "./System";

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
          <div className="card-header text-center p-0 m-0" value={props.value}>
            {props.choice.name}
            {/* {props.scene === 1 ? <System 
                value={props.value}
                symbol={props.symbols[props.choice.encounters[0].mainResource]}
                choice={props.choice}
              /> : <SystemBody />} */}
          </div>

          {props.scene === 1 ? (
            <>
              <li
                value={props.value}
                // style={{
                //   background:
                //     props.colors[props.choice.encounters[0].mainResource],
                // }}
              >
                {/* <HudIcon
                symbol={props.symbols[props.choice.encounters[0].mainResource]}
                value={props.value}
              /> */}

                <System
                  value={props.value}
                  symbol={
                    props.symbols[props.choice.encounters[0].mainResource]
                  }
                  choice={props.choice}
                  color={props.colors[props.choice.encounters[0].mainResource]}
                />
              </li>
            </>
          ) : (
            ""
          )}
          {props.scene === 1 ? (
            <div
              className="btn-group"
              value={props.value}
              style={
                props.choice.distance <= 0
                  ? { color: "white" }
                  : { color: "red" }
              }
            >
              <div
                className="btn text-light "
                style={{ background: props.colors.farsecs }}
              >
                {props.choice.distance}
              </div>
              <HudIcon
                symbol={props.symbols.farsecs}
                value={props.value}
                color={props.colors.farsecs}
              />
            </div>
          ) : (
            ""
          )}

          {props.scene === 2 ? (
            <>
              <li value={props.value}>
                {props.choice.type ? (
                  <small className="text-secondary font-weight-bold text-text-center">
                    {props.choice.type}
                  </small>
                ) : (
                  ""
                )}

                <SystemBody value={props.value} choice={props.choice} />
                <div className="btn-group">
                  <div
                    className="btn text-light "
                    style={{
                      background: props.colors[props.choice.rewards[0].name],
                    }}
                  >
                    {props.choice.rewards[0].amount}
                  </div>
                  <HudIcon
                    symbol={props.symbols[props.choice.rewards[0].name]}
                    value={props.value}
                    color={props.colors[props.choice.rewards[0].name]}
                  />
                </div>
              </li>
            </>
          ) : (
            ""
          )}
          {props.scene === 2 && props.choice.rewards.length === 2 ? (
            <li value={props.value} className="text-light">
              <div className="btn-group">
                <div
                  className="btn text-light "
                  style={{
                    background: props.colors[props.choice.rewards[1].name],
                  }}
                >
                  {props.choice.rewards[1].amount}
                </div>
                <HudIcon
                  symbol={props.symbols[props.choice.rewards[1].name]}
                  value={props.value}
                  color={props.colors[props.choice.rewards[1].name]}
                />
              </div>
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
