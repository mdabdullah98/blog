import { useState } from "react";

import TinyMceEditor from "./TinyMceEditor";

import { useForm } from "react-hook-form";

import { Button, Input, SelectOptions } from "./index";

import { useSelector, useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { removeDocument } from "../store/databaseSlice";

import {
  updatePostHelperFunction,
  createDocumentHelperFunction,
} from "../helper/database";

function Postform({ post = "" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.auth);

  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "",
      featuredImage: post?.featuredImage || "",
    },
  });

  const submitPostForm = async (data) => {
    setLoader(true);

    try {
      if (post) {
        //if not input toched then return so the below could would not run
        if (!isDirty.valueOf("status")) {
          toast("No input changed");
          return;
        }

        const updateRes = await updatePostHelperFunction(data, post);

        console.log(updateRes, "from postform submit handler ,post update");

        if (updateRes) {
          dispatch(removeDocument(post.id));

          navigate("/", { state: post.id });
        }
      } else {
        const docStatus = await createDocumentHelperFunction(data, userId);

        if (docStatus) {
          toast("Doc Created to database");
        }
      }
    } catch (err) {
      toast(err.message);
    }
    setLoader(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitPostForm)}>
        <ToastContainer />

        <div className="input-group flex  flex-wrap">
          <div className="w-full lg:basis-4/6 lg:me-5">
            <Input
              label="Title "
              labelStyle="text-white"
              placeholder="Enter Blog Title"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title should not be empty",
                },
              })}
            />
            {post && (
              <Input
                label="Slug "
                labelStyle="text-white"
                value={post ? post?.slug : ""}
                disabled={true}
                className="cursor-not-allowed"
              />
            )}

            {errors.title && (
              <p className="mt-2 text-white text-xl">
                Note : {errors.title?.message}
              </p>
            )}
          </div>

          <div className="flex-1 ">
            <Input
              type="file"
              label="Upload Image"
              labelStyle="text-white"
              className="bg-white "
              accept="image/*"
              id="input-file"
              {...register("featuredImage", {
                required: {
                  value: post?.featuredImage ? false : true,
                  message: "image feild should not be empty",
                },
              })}
            />

            <br />

            {errors.featuredImage && (
              <p className="mt-2 text-white text-xl">
                Note : {errors.featuredImage?.message}{" "}
                <sup className="text-red-600">*</sup>
              </p>
            )}

            <SelectOptions
              label="Status "
              options={["select status", "active", "inActive"]}
              {...register("status")}
            />

            <div className="text-center">
              <Button
                type="submit"
                className={` my-2  w-56 bg-indigo-800 hover:bg-indigo-500 ${
                  loader ? "bg-indigo-100" : "bg-indigo-800"
                }`}
              >
                {post ? "update" : "submit"}
              </Button>
            </div>
          </div>
        </div>

        <TinyMceEditor
          name="content"
          label="Content "
          control={control}
          defaultValue={getValues("content")}
        />

        {errors.content && (
          <p className="mt-2 text-white text-xl">
            Note : {errors.content?.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Postform;
