import React from "react";

export const FormBtn = props => (
  <button
    {...props}
    style={{
      float: "right",
      marginBottom: 20,
      marginRight: 16,
      color: "black",
      backgroundColor: "white",
      border: "line",
      borderColor: "white",
      fontSize: 24,

    }}
    className="btn button btn-success searchbutton"

  >
    {props.children}
  </button>
);