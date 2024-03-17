import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

//import from helper function
import { Logout, Logo } from "../index";

// import UserProfile from "./UserProfile";

import "./header.css";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItmes = [
    {
      listName: "Home",
      to: "/",
      active: authStatus,
    },
    {
      listName: "Login",
      to: "/login",
      active: !authStatus,
    },
    {
      listName: "Signup",
      to: "/sign-up",
      active: !authStatus,
    },

    {
      listName: "Add Post",
      to: "/add-post/create-post",
      active: authStatus,
    },
  ];
  return (
    <>
      <header>
        <div className=" flex flex-col items-start md:flex-row md:justify-between md:items-start ">
          <Link to={"/"}>
            <Logo />
          </Link>

          <nav>
            <ul className="list-item">
              {navItmes.map(
                (item) =>
                  item.active && (
                    <li key={item.listName}>
                      <button className="">
                        <Link to={item.to}>{item.listName}</Link>
                      </button>
                    </li>
                  )
              )}
              <li>{authStatus && <Logout />}</li>
              {/* <li>{UserProfile}</li> */}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
