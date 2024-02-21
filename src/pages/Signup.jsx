import { Container, Button } from "../component/index";
import { Link } from "react-router-dom";
import { Input } from "../component/index";

function Signup() {
  return (
    <Container>
      <div className="flex justify-center items-center ">
        <form
          action=""
          className="lg:w-3/6 bg-slate-200 py-5 px-2 rounded-lg text-center"
        >
          <h2 className="font-bold ">Sign up to your account</h2>
          <div className="my-5">
            <p className="inline-block me-3 font-bold">Have an account ?</p>

            <Link to={"/login"} className="mx-2 underline font-medium">
              Login
            </Link>

            <Input label="Full Name :" placeholder="Enter your full name" />
            <Input label="Email :" placeholder="Enter your email" />
            <Input label="Password :" placeholder="type your password" />
          </div>
          <Button type="submit" className="bg-stone-500-100 px-3">
            Sign up
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Signup;
