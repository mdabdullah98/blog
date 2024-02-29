import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../config/conf";

class DatabaseService {
  client = new Client();
  database;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appWrite_Api_Endpoint)
      .setProject(conf.appWrite_project_ID);

    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ tittle, content, featuredImage, status, userid }) {
    try {
      return await this.database.createDocument(
        conf.appwrite_database_ID,
        conf.appwrite_collection_ID,
        ID.unique(),
        { tittle, content, featuredImage, status, userid }
      );
    } catch (err) {
      console.log("Appwrite :: createdDocument service", err);
    }
  }

  async getSinglePost(id) {
    try {
      return await this.database.getDocument(
        conf.appwrite_database_ID,
        conf.appwrite_collection_ID,
        id
      );
    } catch (err) {
      console.log("Appwrite ::get Single Document database services ", err);
    }
  }

  async getAllActivePosts() {
    try {
      return await this.database.listDocuments(
        conf.appwrite_database_ID,
        conf.appwrite_collection_ID,
        [Query.equal("status", "active")]
      );
    } catch (err) {
      console.log(
        "Appwrite ::get all documents whoose status is active in database services ",
        err
      );
    }
  }

  async updatePost(id, { tittle, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwrite_database_ID,
        conf.appwrite_collection_ID,
        id,
        { tittle, content, featuredImage, status }
      );
    } catch (err) {
      console.log("Appwrite ::update document in database services ", err);
    }
  }

  async deletePost(id) {
    try {
      return await this.database.deleteDocument(
        conf.appwrite_database_ID,
        conf.appwrite_collection_ID,
        id
      );
    } catch (err) {
      console.log("Appwrite ::delete document in database services ", err);
    }
  }

  //appwrite bucket storage

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwrite_bucket_ID,
        ID.unique(),
        file
      );
    } catch (err) {
      console.log("Appwrite :: upload file in storage services ", err);
    }
  }

  async deleteFIle(fileID) {
    try {
      await this.bucket.deleteFile(conf.appwrite_bucket_ID, fileID);
      return true;
    } catch (err) {
      console.log("Appwrite :: deletefile in storage services ", err);
      return false;
    }
  }

  filePreview(fileID) {
    return this.bucket.getFilePreview(conf.appwrite_bucket_ID, fileID);
  }
}

const databaseService = new DatabaseService();

export default databaseService;
