import { useEffect, useState } from "react";
import { Postform } from "../component/index";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllDocumentsfromFirseStoreAsyncThunk } from "../store/databaseSlice";

function AddPost() {
  const { state: post } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDocumentsfromFirseStoreAsyncThunk());
  }, []);
  return (
    <div className="w-10/12 mx-auto">
      <Postform post={post} />
    </div>
  );
}

export default AddPost;
