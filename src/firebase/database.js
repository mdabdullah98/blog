import { db } from "./firebaseconfig";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

class DatabaseService {
  createPost({ title, content, status, featuredImage }, userId, imgUrl) {
    const docData = {
      title,
      content,
      imageUrl: imgUrl,
      featuredImage: featuredImage[0].name,
      slug: title.replaceAll(" ", "-"),
      status,
      userId,
    };

    return addDoc(collection(db, "blog"), docData);
  }

  getAllDocumentsByUserID(userId) {
    const blogRef = collection(db, "blog");

    const q = query(blogRef, where("userId", "==", `${userId}`));
    return getDocs(q);
  }

  getSingleDocument(id) {
    const docRef = doc(db, "blog", id);
    return getDoc(docRef);
  }

  updateDocument(dataObj, id) {
    //Set the "capital" field of the city 'DC'
    const washingtonRef = doc(db, "blog", id);
    return updateDoc(washingtonRef, dataObj);
  }

  deleteDocument(id) {
    return deleteDoc(doc(db, "blog", id));
  }
}

const databases = new DatabaseService();

export default databases;
