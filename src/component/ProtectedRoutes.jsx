import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  if (!authStatus) {
    return navigate("/login");
  }
  return children;
}

export default ProtectedRoutes;
