import { useId, forwardRef } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="mt-3">
      {label && <label htmlFor={id}>{label}</label>}
      <br></br>
      <input
        type={type}
        {...props}
        id={id}
        className={`w-5/6 outline-none border-none  my-3 px-2 py-1  rounded-md ${className}`}
        ref={ref}
      />
    </div>
  );
}

export default forwardRef(Input);
