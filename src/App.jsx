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

import { Home, Signup, Login, AddPost, AllPost } from "./component/index";

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   authService
  //     .getCurrentUser()
  //     .then((userData) => {
  //       if (userData) {
  //         dispatch(login(userData));
  //       } else {
  //         dispatch(logout());
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/all-post" element={<AllPost />} />
      </Route>
    )
  );
  return !loading ? <RouterProvider router={route} /> : "loading...";
}

export default App;
