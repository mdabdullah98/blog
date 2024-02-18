import { useEffect, useState } from "react";
import Layout from "./component/Layout";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const route = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Layout />}></Route>)
  );
  return !loading ? <RouterProvider router={route} /> : "loading...";
}

export default App;
