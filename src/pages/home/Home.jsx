import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  getAllDocumentsAsyncThunk,
  getSingleDocumentAsyncThunk,
} from "../../store/databaseSlice";

import { PostCard, Container } from "../../component/index";

import { useLocation } from "react-router-dom";

import "./home.css";

function Home() {
  //use location to get id coming from post form if document updated then we will get this this id we will fecth only this updated doc from database

  const { state: id } = useLocation();

  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.auth);

  const db = useSelector((state) => state.db.data);

  useEffect(() => {
    async function listDocument() {
      try {
        if (id) {
          console.log("id in home", id);

          dispatch(getSingleDocumentAsyncThunk(id));
        } else {
          console.log("i am else part in useefct");

          dispatch(getAllDocumentsAsyncThunk(userId));
        }
      } catch (err) {
        console.log(err);
      }
    }

    listDocument();
  }, []);

  if (!db) {
    return (
      <Container>
        <div className="text-white text-2xl">
          No post found please add post{" "}
        </div>
      </Container>
    );
  }
  return (
    <>
      <Container>
        <div className="cards">
          {db.length > 0 &&
            db.map((post) => {
              return (
                <React.Fragment key={post.id}>
                  <PostCard {...post} />
                </React.Fragment>
              );
            })}
        </div>
      </Container>
    </>
  );
}

export default Home;
