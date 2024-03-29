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
  Error,
  Post,
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
            uid: user?.uid,
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
      <>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route
            path="/add-post/:title"
            element={
              <ProtectedRoutes>
                <AddPost />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/all-post"
            element={
              <ProtectedRoutes>
                <AllPost />
              </ProtectedRoutes>
            }
          />
          <Route path="/post/:title" element={<Post />} />
          <Route path="*" element={<Error />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={route} />;
}

export default App;
