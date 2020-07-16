import React from "react";
import Choice from "./Choice";
import Message from "./Message";

function Choices(props) {
  let scn = props.scene;
  let choices = [];
  choices = props.choices.map((choice, i) => {
    return (
      <Choice
        key={i}
        index={i}
        value={i}
        onSelect={scn === 0 ? props.chooseDifficulty : props.onSelect}
        symbols={props.symbols}
        colors={props.colors}
        choice={choice}
        scene={scn}
      />
    );
  });

  return props.jumping ? (
    <></>
  ) : (
    <>
      <div
        className="bg-transparent"
        style={{ width: "vw", height: "300px" }}
      ></div>
      <div className="container-sm">
        <div className={`card bg-transparent`}>
          <div className={`card-header text-center text-secondary h4`}>
            {props.prompt}
          </div>

          <div className="card-body text-center">
            <div className="btn-group">{choices}</div>
          </div>
          <div className="card-footer bg-transparent text-secondary text-center h6">
            <Message message={props.message} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Choices;
