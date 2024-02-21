import { useSelector } from "react-redux";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);

  return <>{authStatus && <div>Home</div>}</>;
}

export default Home;
