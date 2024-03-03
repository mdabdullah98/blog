import { useState } from "react";
import { Container, Button, Logo } from "../component/index";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../component/index";
import { useForm } from "react-hook-form";
import authService from "../firebase/auth";

function Signup() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const singInUser = (data) => {
    setLoader(true);

    setError(null);

    authService
      .createAccount(data)
      .then((userData) => {
        if (userData) {
          navigate("/login");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoader(false));
  };
  return (
    <Container>
      <div className="flex justify-center items-center ">
        <form
          className="lg:w-3/6 bg-slate-200 py-5 px-2 rounded-lg text-center"
          onSubmit={handleSubmit(singInUser)}
        >
          {error && <p className="text-red-800">{error}</p>}

          <Logo width={35} className="flex justify-center items-center mb-2" />

          <h2 className="font-bold ">Sign up to your account</h2>

          <p className="inline-block me-3 font-bold">Have an account ?</p>

          <Link to={"/login"} className="mx-2 underline font-medium">
            Login
          </Link>

          <Input
            label="Email :"
            placeholder="Enter your email"
            type="email"
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
            placeholder="type your password"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "password is required",
              },
            })}
          />
          <p className="text-red-800">{errors.password?.message}</p>

          <Button
            type="submit"
            className={`${loader ? "bg-stone-300" : "bg-stone-900"} px-3`}
          >
            {loader ? "Signing..." : "sign up"}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Signup;
