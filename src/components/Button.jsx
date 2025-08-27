import React from "react";

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full  px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className="relative incline-flex overflow-hidden font-nippo-light text-xs uppercase">
        <div>
          <b>{title}</b>
        </div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
