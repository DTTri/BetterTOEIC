import { API_URL } from "@/utils/config";
class Http {
  baseUrl: string;
  constructor() {
    this.baseUrl = API_URL;
  }
  private getURL(url: string) {
    return `${this.baseUrl}/${url}`;
  }
  async get(endpoint: string) {
    const response = await fetch(this.getURL(endpoint));
    console.log(response);
    return response.json();
  }
  async post(endpoint: string, data: object) {
    const response = await fetch(this.getURL(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async put(endpoint: string, data: object) {
    const response = await fetch(this.getURL(endpoint), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async delete(endpoint: string) {
    const response = await fetch(this.getURL(endpoint), {
      method: "DELETE",
    });
    return response.json();
  }
}

const http = new Http();
export default http;
