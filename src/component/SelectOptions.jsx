import React from "react";

function Select({ label, options = [], ...props }, ref) {
  return (
    <>
      {label && <label className="text-white">{label}</label>}
      <select
        className={`w-full outline-none border-none  my-3 px-2 py-1  rounded-md`}
        {...props}
        ref={ref}
      >
        {options.map((options) => (
          <option key={options} value={options}>
            {options}
          </option>
        ))}
      </select>
    </>
  );
}

const SelectOptions = React.forwardRef(Select);
export default SelectOptions;
