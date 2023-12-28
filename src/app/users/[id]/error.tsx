"use client";
import React from "react";

type T_Props = {
  error: Error;
  reset: () => void;
};

const SingleUserPageError: React.FC<T_Props> = (props) => {
  return (
    <div className="flex gap-3 items-center">
      {props.error.message}
      <button className="p-2 bg-amber-700 rounded-lg" onClick={props.reset}>
        Reset
      </button>
    </div>
  );
};

export default SingleUserPageError;
