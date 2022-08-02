import React from "react";

const Notification = (props) => {
  return (
    <div className={props.style}>
      {props.text} {props.name}
      <button onClick={props.ok}>ok</button>
    </div>
  );
};

export default Notification;
