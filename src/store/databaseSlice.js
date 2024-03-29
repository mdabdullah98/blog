import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import databases from "../firebase/database";

export const getAllDocumentsByUserIDAsyncThunk = createAsyncThunk(
  "users/getAllDocumentsByUserIDAsyncThunk",
  async (userId) => {
    try {
      const responseData = [];

      const snapshot = await databases.getAllDocumentsByUserID(userId);

      if (snapshot.docs.length === 0) {
        return;
      }

      snapshot.docs.map((doc) => {
        const docID = doc.id;
        const docExist = responseData.find((blog) => blog.id == docID);
        if (!docExist) {
          responseData.push({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            imageUrl: doc.data().imageUrl,
            featuredImage: doc.data().featuredImage,
            slug: doc.data().slug,
            status: doc.data().status,
            userId: doc.data().userId,
          });
        }
      });

      return responseData;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getSingleDocumentAsyncThunk = createAsyncThunk(
  "users/getSingleDocumentAsyncThunk",
  async (id) => {
    const doc = await databases.getSingleDocument(id);
    return {
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      imageUrl: doc.data().imageUrl,
      featuredImage: doc.data().featuredImage,
      slug: doc.data().slug,
      status: doc.data().status,
      userId: doc.data().userId,
    };
  }
);

export const getAllDocumentsfromFirseStoreAsyncThunk = createAsyncThunk(
  "users/getAllDocumentsfromFirseStoreAsyncThunk",
  async (id) => {
    const docData = [];
    const snapshot = await databases.getAllDocuments(id);

    snapshot.docs.map((doc) => {
      // doc.data() is never undefined for query doc snapshots
      docData.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        imageUrl: doc.data().imageUrl,
        featuredImage: doc.data().featuredImage,
        slug: doc.data().slug,
        status: doc.data().status,
        userId: doc.data().userId,
      });
    });

    return docData;
  }
);

const initialState = {
  data: [],
  allDocuments: [],
};
const databaseSlice = createSlice({
  name: "db",
  initialState,
  reducers: {
    removeDocument(state, action) {
      state.data = state.data.filter((blog) => blog.id !== action.payload);
    },

    clearData(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAllDocumentsByUserIDAsyncThunk.fulfilled,
      (state, action) => {
        state.data = action.payload;
      }
    );
    builder.addCase(getSingleDocumentAsyncThunk.fulfilled, (state, action) => {
      const docID = action.payload.id;
      const docExist = state.data.find((blog) => blog.id == docID);
      if (!docExist) state.data.push(action.payload);
    });
    builder.addCase(
      getAllDocumentsfromFirseStoreAsyncThunk.fulfilled,
      (state, action) => {
        state.allDocuments = action.payload;
      }
    );
  },
});

export const { getData, removeDocument, clearData } = databaseSlice.actions;

export default databaseSlice.reducer;
