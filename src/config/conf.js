const conf = {
  firebase_apikey: String(import.meta.env.VITE_APIKEY),
  firebase_auth_domain: String(import.meta.env.VITE_AUTH_DOMAIN),
  firebase_databse_url: String(import.meta.env.VITE_DATABASE_URL),
  firebase_project_id: String(import.meta.env.VITE_PROJECT_ID),
  firebase_storage_bucket: String(import.meta.env.VITE_STORAGE_BUCKET),
  firebase_masseging_sender_id: String(
    import.meta.env.VITE_MASSEGING_SENDER_ID
  ),
  firebase_app_id: String(import.meta.env.VITE_APP_ID),
};

export default conf;
