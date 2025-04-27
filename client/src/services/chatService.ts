import http from "./http";

class chatService {
  baseURI = "chat";
  private getURI(uri: string) {
    return `${this.baseURI}/${uri}`;
  }

  async sendMessage(
    message: string,
    languageCode: string = "en",
    userId?: string
  ) {
    try {
      const response = await http.post(
        this.getURI(`message${userId ? "/?userId=" + userId : ""}`),
        {
          message,
          languageCode,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Chat service error:", error);
      throw error;
    }
  }

  async getChatHistory(userId: string) {
    try {
      const response = await http.get(this.getURI(`history/${userId}`));
      return response.data;
    } catch (error) {
      console.error("Chat service error:", error);
      throw error;
    }
  }
}

export default new chatService();
