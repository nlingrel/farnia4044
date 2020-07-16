import React from "react";
import Choice from "./Choice";
import Message from "./Message";

function Choices(props) {
  let scn = props.scene;
  let choices = [];
  choices = props.choices.map((choice, key) => {
    return (
      <Choice
        key={key}
        value={key}
        onSelect={props.onSelect}
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
      <table className={`table bg-transparent`}>
        <thead>
          <tr>
            <th colSpan={`${props.choices.length}`} className={`text-center`}>
              {props.prompt}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>{choices}</tr>
        </tbody>
        <tfoot>
          <tr>
            <th
              colSpan={`${props.choices.length}`}
              className={`card bg-transparent border-info`}
            >
              <Message message={props.message} />
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default Choices;
