import { Container, Button } from "../component/index";
import { Link } from "react-router-dom";
import { Input } from "../component/index";

function Login() {
  return (
    <>
      <Container>
        <div className="flex justify-center items-center ">
          <form
            action=""
            className="lg:w-3/6 bg-slate-200 py-5 px-2 rounded-lg text-center"
          >
            <h2 className="font-bold ">Sign into your account</h2>
            <div className="my-5">
              <p className="inline-block me-3 font-bold">
                do not have an account ?
              </p>

              <Link to={"/sign-up"} className="mx-2 underline font-medium">
                Signup
              </Link>

              <Input label="Email :" placeholder="Enter your email" />
              <Input label="Password :" placeholder="type your password" />
            </div>
            <Button type="submit" className="bg-stone-500-100 px-3">
              Login
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Login;
