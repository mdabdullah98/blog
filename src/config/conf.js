const conf = {
  appWrite_project_ID: String(import.meta.env.VITE_PROJECT_ID),
  appWrite_Api_Endpoint: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
  appwrite_database_ID: String(import.meta.env.VITE_APPERITE_DATABASE_ID),
  appwrite_collection_ID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwrite_bucket_ID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};
export default conf;
