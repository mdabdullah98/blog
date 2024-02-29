import { Container, Button, Logo } from "../component/index";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../component/index";
import { useForm } from "react-hook-form";
import authService from "../firebase/auth";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function Login() {
  const disptach = useDispatch();
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState({
    loader: null,
    error: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUSer = (data) => {
    setLoginStatus({
      loader: true,
      error: null,
    });

    authService
      .login(data)
      .then((user) => {
        if (user) {
          disptach(
            login({ token: user.user?.accessToken, email: user.user?.email })
          );
          navigate("/");
        }
      })
      .catch((err) =>
        setLoginStatus((prev) => {
          return { ...prev, error: err.message };
        })
      )
      .finally(() =>
        setLoginStatus((prev) => {
          return { ...prev, loader: false };
        })
      );
  };
  return (
    <>
      <Container>
        <div className="flex justify-center items-center ">
          <form
            onSubmit={handleSubmit(loginUSer)}
            className="lg:w-3/6 bg-slate-200 py-5 px-2 rounded-lg text-center"
            noValidate
          >
            <Logo
              width={35}
              className="flex justify-center items-center mb-2"
            />
            <p>{loginStatus.error}</p>
            <h2 className="font-bold">Login into your account</h2>
            <div className="my-5">
              <p className="inline-block me-3 font-bold">
                do not have an account ?
              </p>

              <Link to={"/sign-up"} className="mx-2 underline font-medium">
                Sign up
              </Link>

              <Input
                label="Email :"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is required",
                  },
                })}
              />
              <p className="text-red-800">{errors.email?.message}</p>

              <Input
                label="Password :"
                type="password"
                placeholder="type your password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required",
                  },
                })}
              />
              <p className="text-red-800">{errors.password?.message}</p>
            </div>
            <Button type="submit" className="bg-stone-500-100 px-3 ">
              Login
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Login;
