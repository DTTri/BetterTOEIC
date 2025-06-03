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
    return await http.post(this.getURI(`message${userId ? `?userId=${userId}` : ""}`), {
      message,
      languageCode,
    });
  }

  async getChatHistory(userId: string, page: number = 1, limit: number = 10) {
    return await http.get(this.getURI(`history/${userId}?page=${page}&limit=${limit}`));
  }
}

export default new chatService();
