import axios from "axios";

class AuthService {
  static async register(username, password) {
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  }

  static async login(username, password) {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  }

  static logout() {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  }

  static async getUsers() {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // Send the GET request with the Authorization header
      const response = await axios.get("/api/auth/users", { headers });

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch users" };
    }
  }
}

export default AuthService;
