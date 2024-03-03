import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import conf from "../config/conf";
const app = initializeApp({
  apiKey: conf.firebase_apikey,
  authDomain: conf.firebase_auth_domain,
  databaseURL: conf.firebase_databse_url,
  projectId: conf.firebase_project_id,
  storageBucket: conf.firebase_storage_bucket,
  messagingSenderId: conf.firebase_masseging_sender_id,
  appId: conf.firebase_app_id,
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
