import axios from "axios";
import { jwtDecode } from "jwt-decode";
class AuthenticationService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5000/users",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async signupUser(user) {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        user
      );
      return response.data;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error.response?.data || new Error("Signup error");
    }
  }

  async loginUser(user) {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        user
      );
      const { token } = response.data;

      if (token) this.saveToken(token);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error.response?.data || new Error("Login error");
    }
  }

  async createActivity(activity) {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/createActivity",
        activity,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("activity failed:", error);
      throw error.response?.data || new Error("actvity error");
    }
  }

  async getActivity(id) {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/getAllActivities?user_id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("activity failed:", error);
      throw error.response?.data || new Error("Activity error");
    }
  }

  getDecryptedToken() {
    const encryptedToken = localStorage.getItem("authToken");
    const decoded = jwtDecode(encryptedToken);

    return decoded;
  }

  saveToken(token) {
    localStorage.setItem("authToken", token);
  }

  getToken() {
    return localStorage.getItem("authToken");
  }
}

export default new AuthenticationService();
