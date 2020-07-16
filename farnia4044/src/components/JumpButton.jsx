import React from "react";

function JumpButton(props) {
  let text = "";
  if (props.scene === 0) text = "For Farnia!";
  if (props.scene === 1) text = "FTL";
  if (props.scene === 2) text = "Forage";
  if (props.scene === 99) text = "Play Again";

  const visible = !props.visible;
  const visClass = visible ? "showJumpButton" : "hideJumpButton";
  return (
    <>
      <div className="card-footer text-center">
        <button
          id="hyper"
          type="button"
          className={`${visClass} btn btn-outline-info`}
          onClick={visible ? props.onClick : null}
        >
          {text}
        </button>
      </div>
    </>
  );
}

export default JumpButton;
