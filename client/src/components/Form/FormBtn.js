import React from "react";
import Styles from "./FormBtn.css"

export const FormBtn = props => (
  <button
    {...props}
    style={{ float: "right", marginBottom: 10 }}
    className="btn button btn-success"
  >
    {props.children}
  </button>
);
