import React from "react";

export const FormBtn = props => (
  <button
    {...props}
    style={{
      paddingTop: "30px",
      paddingRight: "30px",
      paddingLeft: "30px",
      paddingBottom: "30px",
      fontWeight: "bold",
      borderRadius: "12px",
      color: "black",
      backgroundColor: "gray",
      border: "line",
      borderColor: "white",
      fontSize: "20px",
      
    }}
    className="btn button btn-success"
  >
    {props.children}
  </button>
);
