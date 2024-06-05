import React from "react";
import { Spinner } from "bootstrap";

export const Loader = (props) => {
  const {color="light" , style=false} = props;
  return (
    <div className="spinner_AnjCls">
      <Spinner color={color} style={style ? style : {height: '27px',width: '27px'}}> Loading... </Spinner>
      <span className={style ? "loading_anjCls1" : "loading_anjCls2"}> Loading... </span>
    </div>
  );
};
