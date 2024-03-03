import { useId, forwardRef } from "react";

function Input(
  { label, type = "text", className = "", labelStyle = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="mt-3">
      {label && (
        <label htmlFor={id} className={`${labelStyle}`}>
          {label}
        </label>
      )}
      <br></br>
      <input
        type={type}
        id={id}
        className={`w-full outline-none border-none  my-3 p-2  rounded-md ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
