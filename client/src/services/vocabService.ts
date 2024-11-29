import http from "./http";

class VocabService {
  baseURI = "vocab";
  private getURI(uri: string) {
    return `${this.baseURI}/${uri}`;
  }
  async createVocabTopic(data: object) {
    return await http.post(this.getURI("createVocabTopic"), data);
  }
  async updateVocabTopic(id: string, data: object) {
    return await http.put(this.getURI("updateVocabTopic/" + id), data);
  }
  async deleteVocabTopic(id: string) {
    return await http.delete(this.getURI("deleteVocabTopic/" + id));
  }
  async getAllVocabTopics() {
    return await http.get(this.getURI("getAllVocabTopics"));
  }
  async getVocabTopicById(id: string) {
    return await http.get(this.getURI("getVocabTopicById/" + id));
  }
  async completeVocabTopic(userId: string, completedVocabTopic: object) {
    return await http.put(
      this.getURI("completeVocabTopic/" + userId),
      completedVocabTopic
    );
  }
  async getVocabHistory(userId: string) {
    return await http.get(this.getURI("getVocabHistory/" + userId));
  }
  async saveVocab(userId: string, vocabId: string, unsave: boolean) {
    return await http.put(this.getURI("saveVocab/" + userId), {
      vocabId,
      unsave,
    });
  }
  async getVocabsSaved(userId: string) {
    return await http.get(this.getURI("getVocabsSaved/" + userId));
  }
}
const vocabService = new VocabService();
export default vocabService;
