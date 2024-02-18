import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dipatch = useDispatch();

  const navigate = useNavigate();

  const logoutUser = () => {
    authService
      .logout()
      .then(() => dipatch(logout()))
      .finally(() => navigate("/"));
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
