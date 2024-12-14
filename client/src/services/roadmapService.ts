import { CreatePersonalRoadmapDTO } from "@/entities/dtos";
import http from "./http";
class RoadmapService {
  baseURI = "roadmap";
  private getURI(uri: string) {
    return `${this.baseURI}/${uri}`;
  }
  async createRoadmapExercise(data: object) {
    return await http.post(this.getURI("createRoadmapExercise"), data);
  }
  async deleteRoadmapExercise(id: string) {
    return await http.delete(this.getURI("deleteRoadmapExercise/" + id));
  }
  async getAllRoadmapExercises() {
    return await http.get(this.getURI("getAllRoadmapExercises"));
  }
  async getRoadmapExerciseById(id: string) {
    return await http.get(this.getURI("getRoadmapExerciseById/" + id));
  }
  async getRoadmapExercisesByPhase(phase: number) {
    return await http.get(this.getURI("getRoadmapExercisesByPhase/" + phase));
  }
  async completeRoadmapExercise(
    userId: string,
    completedRoadmapExercise: object
  ) {
    return await http.put(
      this.getURI("completeRoadmapExercise/" + userId),
      completedRoadmapExercise
    );
  }
  async getRoadmapHistory(userId: string) {
    return await http.get(this.getURI("getRoadmapHistory/" + userId));
  }
  async createPersonalRoadmap(data: CreatePersonalRoadmapDTO) {
    return await http.post(this.getURI("createPersonalRoadmap"), data);
  }
  async updateUserCurrentLevel(userId: string) {
    return await http.put(this.getURI("updateUserCurrentLevel/" + userId), {});
  }
  async resetUserRoadmap(userId: string) {
    return await http.delete(this.getURI("resetUserRoadmap/" + userId));
  }
}
const roadmapService = new RoadmapService();
export default roadmapService;
