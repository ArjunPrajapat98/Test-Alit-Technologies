import React from "react";

export const Loader = (props) => {
  const {color="light" , style=false} = props;
  return (
    <div className="">
      <span className="pl-3">Loading...</span>
    </div>
  );
};

