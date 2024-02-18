import { Client, Account, ID } from "appwrite";
import conf from "../config/conf";
class AuthServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWrite_Api_Endpoint)
      .setProject(conf.appWrite_project_ID);
    this.account = new Account(this.client);
  }

  async createAccount(name, email, password) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        name,
        email,
        password
      );

      if (userAccount) {
        //do somwthing
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (err) {
      console.log("Appwrite :: createAccount service", err);
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (err) {
      console.log("Appwrite :: login service", err);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      console.log("Appwrite :: get current user service", err);
    }
    return null;
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (err) {
      console.log("Appwrite :: logout  user from auth database", err);
    }
  }
}

const authService = new AuthServices();
export default authService;
