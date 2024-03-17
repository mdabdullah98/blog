import React from "react";

function Select({ label, ...props }, ref) {
  return (
    <>
      {label && <label className="text-white">{label}</label>}
      <select
        className={`w-full outline-none border-none  my-3 px-2 py-1  rounded-md`}
        {...props}
        ref={ref}
      >
        <option value="">Status</option>
        <option value="active">Active</option>
        <option value="inActive">InActive</option>
      </select>
    </>
  );
}

const SelectOptions = React.forwardRef(Select);
export default SelectOptions;
