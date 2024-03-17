// import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Container, Button } from "./index";

import parse from "html-react-parser";

import storageServices from "../firebase/storage";

import databases from "../firebase/database";

import { useDispatch } from "react-redux";

import { removeDocument } from "../store/databaseSlice";

import { ToastContainer, toast } from "react-toastify";

function Post() {
  const { state: post } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteBlog = async () => {
    console.log(post, post?.id);
    try {
      //delete image file from firebase storage
      await storageServices.deleteFile(post.featuredImage);

      //delete image file from firebase cloudstore
      await databases.deleteDocument(post?.id);

      //remove deleted document  from redux state data
      dispatch(removeDocument(post?.id));

      toast("post deleted from database");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <figure className="flex justify-center items-center">
            <img
              className="rounded-t-lg h-96"
              src={`${post?.imageUrl}`}
              alt={`${post?.imageUrl}`}
            />
          </figure>

          <div className="p-5 flex justify-between items-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post?.title}
            </h5>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post?.status}
            </h5>
          </div>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
            {parse(`${post?.content}`)}
          </p>

          <div className="flex justify-end items-center px-5">
            <Button
              bgColor="bg-green-600"
              className="px-5 mx-3 cursor-pointer hover:bg-green-400"
              onClick={() =>
                navigate(`/add-post/${post?.slug}`, { state: post })
              }
            >
              Edit
            </Button>
            <Button
              bgColor="bg-red-600"
              className="px-5 cursor-pointer hover:bg-red-400"
              onClick={deleteBlog}
            >
              Delete
            </Button>
          </div>
          <ToastContainer />
        </div>
      </Container>
    </>
  );
}

export default Post;
