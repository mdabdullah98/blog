import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} rounded-full  py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
