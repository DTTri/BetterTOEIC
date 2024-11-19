import http from "./http";
class TestService {
  baseURI = "test";
  private getURI(uri: string) {
    return `${this.baseURI}/${uri}`;
  }
  async getTests() {
    return await http.get(this.getURI("getAllTests"));
  }
  async getTest(id: string) {
    return await http.get(this.getURI("getTestById/" + id));
  }
  async createTest(data: object) {
    return await http.post(this.getURI("createTest"), data);
  }
  async deleteTest(id: string) {
    return await http.delete(this.getURI("deleteTest/" + id));
  }
  async completeTest(userId: string, completedTest: object) {
    return await http.put(this.getURI("completeTest/" + userId), completedTest);
  }
  async getTestHistory(userId: string) {
    return await http.get(this.getURI("getTestHistory/" + userId));
  }
  async saveTest(userId: string, testId: string, unsave: boolean) {
    return await http.put(this.getURI("saveTest/" + userId), {
      testId,
      unsave,
    });
  }
  async getTestsSaved(userId: string) {
    return await http.get(this.getURI("getTestsSaved/" + userId));
  }
}
const testService = new TestService();
export default testService;
