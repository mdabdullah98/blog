import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-yellow-900",
  textColor = "text-white",
  ...props
}) {
  return (
    <button className={`${bgColor} ${textColor} rounded-full px-2 py-1`}>
      {children}
    </button>
  );
}

export default Button;
