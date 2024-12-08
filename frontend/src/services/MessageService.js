import axios from "axios";

class MessageService {
  static async sendMessage(receiverId, content) {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // If a token is found, include it in the Authorization header
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // Send the POST request with the Authorization header
      const response = await axios.post(
        "/api/messages/send",
        { receiverId, content },
        { headers }
      );

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to send message" };
    }
    r;
  }

  static async getMessages(otherUserId) {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // If a token is found, include it in the Authorization header
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // Send the GET request with the Authorization header
      const response = await axios.get(`/api/messages/${otherUserId}`, {
        headers,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch messages" };
    }
  }
}

export default MessageService;
