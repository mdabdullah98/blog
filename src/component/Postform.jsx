import { useState } from "react";

import { useForm } from "react-hook-form";

import { Button, Input, SelectOptions } from "./index";

import { useSelector, useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { removeDocument } from "../store/databaseSlice";

import Jodit from "./Jodit";

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

        console.log(data);
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
        console.log(data);
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
              label={`${errors.title ? errors.title?.message : "Title "}`}
              labelStyle="text-white"
              placeholder="Enter Blog Title"
              className={`${errors.title ? "bg-red-300" : ""}`}
              {...register("title", {
                required: {
                  value: true,
                  message: "Title feild is required *",
                },
              })}
            />

            {post && (
              <Input
                label="Slug "
                labelStyle="text-white"
                value={post ? post?.slug : ""}
                disabled={true}
                className={`cursor-not-allowed `}
              />
            )}
          </div>

          <div className="flex-1">
            <Input
              type="file"
              label={`${
                errors.featuredImage
                  ? errors.featuredImage?.message
                  : "Upload Image"
              }`}
              labelStyle="text-white"
              className={`bg-white ${errors.featuredImage ? "bg-red-300" : ""}`}
              accept="image/*"
              id="input-file"
              {...register("featuredImage", {
                required: {
                  value: post?.featuredImage ? false : true,
                  message: "File input feild is required *",
                },
              })}
            />

            <SelectOptions
              label={`${errors.status ? errors.status?.message : "Status"}`}
              options={["select status", "active", "inActive"]}
              className={` ${errors.status ? "bg-red-300" : ""}`}
              {...register("status", {
                required: {
                  value: true,
                  message: "Status feild is required *",
                },
              })}
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

        <Jodit
          name="content"
          label={`${errors.content ? errors.content?.message : "Content "}`}
          control={control}
          className={` ${errors.content?.message ? "bg-red-300" : ""}`}
          defaultValue={getValues("content")}
        />
      </form>
    </div>
  );
}

export default Postform;
