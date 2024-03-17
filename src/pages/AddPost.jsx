import { Postform } from "../component/index";
import { useLocation } from "react-router-dom";

function AddPost() {
  const { state: post } = useLocation();

  return (
    <div className="w-10/12 mx-auto">
      <Postform post={post} />
    </div>
  );
}

export default AddPost;
