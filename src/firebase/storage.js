import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebaseconfig";

class FirebseStorage {
  uploadFile(featuredImage) {
    if (featuredImage[0].name == undefined) {
      alert("file is not found");
      return;
    }

    const imageRef = ref(storage, `images/${featuredImage[0].name}`);

    return uploadBytes(imageRef, featuredImage[0]);
  }

  getDownLoadUrl(featuredImage) {
    console.log(featuredImage);
    return getDownloadURL(ref(storage, `images/${featuredImage}`));
  }

  deleteFile(featuredImage) {
    console.log(featuredImage);
    const deletedFileRef = ref(storage, `images/${featuredImage}`);
    return deleteObject(deletedFileRef);
  }
}

const storageServices = new FirebseStorage();

export default storageServices;
