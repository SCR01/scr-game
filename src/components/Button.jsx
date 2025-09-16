import React from "react";

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {

  // Updated the button borders
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-md  px-4 py-2 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className="relative incline-flex overflow-hidden font-nippo-light text-sm uppercase">
        <div>
          <b>{title}</b>
        </div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
