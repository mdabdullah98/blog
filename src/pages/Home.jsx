import { useSelector } from "react-redux";

function Home() {
  const authStatus = useSelector((state) => state.auth);

  if (!authStatus) {
    return <div>Please login to see all post</div>;
  }
  return <>{authStatus && <div></div>}</>;
}

export default Home;
