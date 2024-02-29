import { auth } from "./firebaseconfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

class AuthServices {
  createAccount({ email, password }) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  login({ email, password }) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  logout() {
    return signOut(auth);
  }
}

const authService = new AuthServices();
export default authService;
