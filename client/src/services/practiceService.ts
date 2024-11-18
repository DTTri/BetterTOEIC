import http from "./http";
class PracticeService {
  baseURI = "practice";
  private getURI(uri: string) {
    return `${this.baseURI}/${uri}`;
  }
  async getPracticeTests() {
    return await http.get(this.getURI("getAllPracticeTests"));
  }
  async getPracticeTestById(id: string) {
    return await http.get(this.getURI("getAllPracticeTests/" + id));
  }
  async getPracticeTestByPart(part: number) {
    return await http.get(this.getURI("getAllPracticeTests/" + part));
  }
  async createPracticeTest(data: object) {
    return await http.post(this.getURI("createPracticeTest"), data);
  }
  async deletePraticeTest(id: string) {
    return await http.delete(this.getURI("deletePracticeTest/" + id));
  }
  async completePracticeTest(userId: string, completedPracticeTest: object) {
    return await http.put(this.getURI("completePracticeTest/" + userId), completedPracticeTest);
  }
  async getPracticeTestHistory(userId: string) {
    return await http.get(this.getURI("getPracticeTestHistory/" + userId));
  }
  async getPracticeLessons() {
    return await http.get(this.getURI("getAllPracticeLessons"));
  }
  async getPracticeLessonById(id: string) {
    return await http.get(this.getURI("getAllPracticeLessonById/" + id));
  }
  async getPracticeLessonByPart(part: number) {
    return await http.get(this.getURI("getAllPracticeLessonByPart/" + part));
  }
  async createPracticeLesson(data: object) {
    return await http.post(this.getURI("createPracticeLesson"), data);
  }
  async deletePraticeLesson(id: string) {
    return await http.delete(this.getURI("deletePraticeLesson/" + id));
  }
  async completePracticeLesson(userId: string, completedPracticeLessonId: object) {
    return await http.put(this.getURI("completePracticeTest/" + userId), completedPracticeLessonId);
  }
  async getPracticeLessonHistory(userId: string) {
    return await http.get(this.getURI("getPracticeTestHistory/" + userId));
  }
}
const practiceService = new PracticeService();
export default practiceService;
