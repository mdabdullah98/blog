import authService from "../../firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { clearData } from "../../store/databaseSlice";

function Logout() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutUser = () => {
    authService
      .logout()
      .then(() => {
        console.log("loggedout");
        dispatch(logout());
        dispatch(clearData());
      })
      .catch((error) => console.log(error, error.message));
  };
  return (
    <button
      className="inline-block bg-black text-white rounded-full p-1 px-2 hover:bg-green-600 hover:text-black  duration-200"
      onClick={logoutUser}
    >
      Logout
    </button>
  );
}

export default Logout;
