// import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function TinyMceEditor({ name, label, control, defaultValue = "" }) {
  return (
    <div className="lg:w-8/12">
      {label && <label className=" text-white ">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        rules={{
          required: {
            value: true,
            message: "This feild should not be empty",
          },
        }}
        render={({ field: { onChange, onBlur } }) => (
          <Editor
            apiKey="htrv058sp1drqipegf8sx4q45u9xt9ulr1c822rdo576hxz6"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount  linkchecker ",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog  typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
            }}
            initialValue={defaultValue}
            onEditorChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
    </div>
  );
}

export default TinyMceEditor;
