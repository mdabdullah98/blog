import { useState, useEffect } from "react";
import "./error.css";
import { Link, useNavigate } from "react-router-dom";
function Error() {
  const navigate = useNavigate();

  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const setIntervalTimer = setInterval(() => {
      if (counter > 0) {
        setCounter((prev) => prev - 1);
      } else {
        navigate("/");
      }
    }, 1000);

    return () => {
      clearInterval(setIntervalTimer);
    };
  }, [counter, navigate]);

  return (
    <div className="error-page">
      <figure>
        <img src="./404-error.svg" alt="404-error-svg" />
      </figure>
      <Link to={"/"}>
        <button
          type="button"
          className="px-3 py-1 rounded-full bg-red-800 hover:bg-red-500  text-white duration-500"
        >
          back to home in
          <span className="ms-2">{counter}</span>
        </button>
      </Link>

      <p>Sorry the page is not found</p>
      <p>
        Redirecting to home in <span>{counter} sec</span>
      </p>
    </div>
  );
}

export default Error;
