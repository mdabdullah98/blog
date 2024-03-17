import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

function PostCard(post) {
  const { title, slug, content, imageUrl, status } = post;

  const navigate = useNavigate();

  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
      onClick={() => navigate(`/post/${slug}`, { state: post })}
    >
      <figure className="flex justify-center items-center w-full">
        <img className="rounded-t-lg h-96 w-full" src={`${imageUrl}`} alt="" />
      </figure>

      <div className="p-5 flex justify-between items-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {status}
        </h5>
      </div>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {parse(`${content}`)}
      </p>
    </div>
  );
}

export default PostCard;
