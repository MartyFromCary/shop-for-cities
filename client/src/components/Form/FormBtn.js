import React from "react";

export const FormBtn = props => (
  <button
    {...props}
    style={{ float: "right", marginBottom: 10, color: "white", backgroundColor: "transparent", border: "none", fontSize: "24px" }}
    className="btn button btn-success"
  >
    {props.children}
  </button>
);
