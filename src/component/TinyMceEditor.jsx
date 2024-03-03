import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function TinyMceEditor({ name, label, control, defaultValue = "" }) {
  return (
    <div>
      {label && <label className=" text-white text-2xl">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <Editor
            apiKey="htrv058sp1drqipegf8sx4q45u9xt9ulr1c822rdo576hxz6"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
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
