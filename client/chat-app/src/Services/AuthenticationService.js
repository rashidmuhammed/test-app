import axios from "axios";

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

  saveToken(token) {
    localStorage.setItem("authToken", token);
  }

  getToken() {
    return localStorage.getItem("authToken");
  }
}

export default new AuthenticationService();
