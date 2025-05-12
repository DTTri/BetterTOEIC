import http from "./http";

class SWTestService {
  baseURI = "swtest";

  private getURI(uri: string) {
    return `${this.baseURI}/${uri}`;
  }

  async createSWTest(data: object) {
    return await http.post(this.getURI("createSWTest"), data);
  }

  async getAllSWTests() {
    return await http.get(this.getURI("getAllSWTests"));
  }

  async getSWTestById(id: string) {
    return await http.get(this.getURI("getSWTestById/" + id));
  }

  async deleteSWTest(id: string) {
    return await http.delete(this.getURI("deleteSWTest/" + id));
  }

  async completeSWTest(userId: string, data: object) {
    return await http.put(this.getURI("completeSWTest/" + userId), data);
  }

  async getSWTestHistory(userId: string, page = 1, limit = 10) {
    return await http.get(
      this.getURI(`getSWTestHistory/${userId}?page=${page}&limit=${limit}`)
    );
  }

  async getUserStatistics(userId: string) {
    return await http.get(this.getURI("getUserStatistics/" + userId));
  }

  async getCompletedTest(userId: string, testId: string, attemptId?: string) {
    if (attemptId) {
      return await http.get(
        this.getURI(`getCompletedTest/${userId}/${testId}/${attemptId}`)
      );
    } else {
      return await http.get(
        this.getURI(`getCompletedTest/${userId}/${testId}`)
      );
    }
  }
}

const swTestService = new SWTestService();
export default swTestService;
