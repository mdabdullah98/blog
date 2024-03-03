// import  from "react";
import TinyMceEditor from "./TinyMceEditor";
import { useForm } from "react-hook-form";
import { Button, Input, SelectOptions } from "./index";
import databases from "../firebase/database";
import { useSelector } from "react-redux";

function Postform() {
  const { userId } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    getValues,

    control,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const submitPostForm = (data, userId) => {
    databases
      .createPost(data)
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitPostForm)}>
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
            <p className="my-1">{errors.title?.message}</p>

            {/* <Input
              label="Slug "
              labelStyle="text-white"
              placeholder="Slug"
             
            /> */}
          </div>

          <div className="flex-1 ">
            <Input
              type="file"
              label="Featured Image "
              labelStyle="text-white"
              className="bg-white"
              accept="image/*"
              {...register("featuredImage", {
                required: {
                  value: true,
                  message: "image feild should not be empty",
                },
              })}
            />

            {errors.image && (
              <p className="my-1 text-white">
                {errors.image?.message} <sup className="text-red-600">*</sup>
              </p>
            )}
            <SelectOptions
              label="Status "
              options={["active", "inActive"]}
              {...register("status")}
            />

            <div className="text-center">
              <Button
                type="submit"
                bgColor="bg-indigo-700"
                className=" my-2  w-56 hover:bg-indigo-500 "
              >
                submit
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
      </form>
    </div>
  );
}

export default Postform;
