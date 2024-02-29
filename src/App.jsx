import { useEffect } from "react";

//react router outlet
import Layout from "./component/Layout";

//react redux and redux authslice action
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

//firebase/auth
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseconfig";

//react router dom routes
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  Home,
  Signup,
  Login,
  AddPost,
  AllPost,
  ProtectedRoutes,
} from "./component/index";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            token: user?.accessToken,
            email: user?.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
  return <RouterProvider router={route} />;
}

export default App;
