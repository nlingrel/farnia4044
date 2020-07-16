import React from "react";

export default function MuteButton(props) {
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-info"
        onClick={props.muteToggle}
      >
        mute
      </button>
    </>
  );
}
