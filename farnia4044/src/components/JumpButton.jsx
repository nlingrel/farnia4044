import React from "react";

function JumpButton(props) {
  let text = "";
  if (props.scene === 0) text = "For Farnia!";
  if (props.scene === 1) text = "FTL";
  if (props.scene === 2) text = "Forage";
  if (props.scene === 99) text = "Play Again";

  let visible = !props.visible;
  return (
    <form>
      <button
        id="hyper"
        type="button"
        // className={visible ? `showJumpButton` : `hideJumpButton`}
        className="showJumpButton"
        onClick={visible ? props.onClick : null}
      >
        {text}
      </button>
      <div className="range">
        <label htmlFor="range">{text}</label>
        <input
          id="hyper-range"
          type="range"
          min="0"
          max="2"
          step=".2"
          defaultValue="0"
        />
      </div>
    </form>
  );
}

export default JumpButton;
