import React from "react";
import JoditEditor from "jodit-react";
import { Controller } from "react-hook-form";

function Jodit(
  { name, label, control, defaultValue = "", className = "" },
  ref
) {
  return (
    <div className={`mt-3 lg:w-8/12 ${className}`}>
      {label && <label className="text-white my-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        rules={{
          required: {
            value: true,
            message: "Content feild is required *",
          },
        }}
        render={({ field: { onChange, onBlur } }) => (
          <JoditEditor
            value={defaultValue}
            tabIndex={1} // tabIndex of textarea
            onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
            onChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default Jodit;
