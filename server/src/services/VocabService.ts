import { ObjectId } from 'mongodb';
import { collections } from '~/config/connectDB';
import { Vocab, VocabHistory, VocabsSaved, VocabTopic } from '~/models';
import { CompleteVocabDTO, SaveVocabDTO } from '~/models/DTOs';

class VocabService {
  async createVocabTopic(topic: VocabTopic): Promise<boolean> {
    const result = await collections.vocabTopics?.insertOne(topic);
    return result ? true : false;
  }
  async updateVocabTopic(topicId: string, topic: VocabTopic): Promise<boolean> {
    const result = await collections.vocabTopics?.updateOne({ _id: new ObjectId(topicId) }, { $set: topic });
    return result ? true : false;
  }
  async deleteVocabTopic(topicId: string): Promise<boolean> {
    const result = await collections.vocabTopics?.deleteOne({ _id: new ObjectId(topicId) });
    return result ? true : false;
  }
  async getAllVocabTopics(): Promise<VocabTopic[] | null> {
    const result = await collections.vocabTopics?.find().toArray();
    if (result) {
      return result as VocabTopic[];
    }
    return null;
  }
  async getVocabTopicById(topicId: string): Promise<VocabTopic | null> {
    const result = await collections.vocabTopics?.findOne({ _id: new ObjectId(topicId) });
    if (result) {
      return result as VocabTopic;
    }
    return null;
  }

  async updateVocabHistory(userId: string, completedVocab: CompleteVocabDTO): Promise<boolean> {
    const { topicId, vocabId } = completedVocab;
    const getUserVocabHistoryResult = await collections.vocabHistories?.findOne({ _id: new ObjectId(userId) });
    const userVocabHistory = getUserVocabHistoryResult as VocabHistory;
    if (userVocabHistory) {
      const topicIndex = userVocabHistory.topics.findIndex((topic) => topic.topicId === topicId);
      if (topicIndex !== -1) {
        // check if vocabId already exists in completedVocabs
        const vocabIndex = userVocabHistory.topics[topicIndex].completedVocabs.findIndex((vocab) => vocab === vocabId);
        if (vocabIndex === -1) {
          userVocabHistory.topics[topicIndex].completedVocabs.push(vocabId);
        }
      } else {
        userVocabHistory.topics.push({ topicId, completedVocabs: [vocabId] });
      }
      const result = await collections.vocabHistories?.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { topics: userVocabHistory.topics, updated_at: new Date().toISOString() } }
      );
      return result ? true : false;
    } else {
      const newUserVocabHistory: VocabHistory = {
        _id: new ObjectId(userId),
        topics: [{ topicId, completedVocabs: [vocabId] }],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const result = await collections.vocabHistories?.insertOne(newUserVocabHistory);
      return result ? true : false;
    }
  }
  async getVocabHistory(userId: string): Promise<VocabHistory | null> {
    const result = await collections.vocabHistories?.findOne({ _id: new ObjectId(userId) });
    if (result) {
      return result as VocabHistory;
    }
    return null;
  }
  // type VocabsSaved = {
  //   _id: ObjectId; //userId
  //   vocabs: string[];
  // };
  async updateVocabsSaved(userId: string, savedVocab: SaveVocabDTO): Promise<boolean> {
    const getUserVocabsSavedResult = await collections.vocabsSaved?.findOne({ _id: new ObjectId(userId) });
    const userVocabsSaved = getUserVocabsSavedResult as VocabsSaved;
    if (userVocabsSaved) {
      if (!savedVocab.isSaving) {
        const vocabIndex = userVocabsSaved.vocabs.findIndex((vocabSaved) => vocabSaved._id === savedVocab._id);
        userVocabsSaved.vocabs.splice(vocabIndex, 1);
        const result = await collections.vocabsSaved?.updateOne(
          { _id: new ObjectId(userId) },
          { $set: userVocabsSaved }
        );
        return result ? true : false;
      } else {
        const vocabIndex = userVocabsSaved.vocabs.findIndex((vocabSaved) => vocabSaved._id === savedVocab._id);
        if (vocabIndex === -1) {
          userVocabsSaved.vocabs.push({
            _id: savedVocab._id,
            topicId: savedVocab.topicId,
            topicName: savedVocab.topicName,
            word: savedVocab.word,
            meaning_en: savedVocab.meaning_en,
            meaning_vi: savedVocab.meaning_vi,
            image: savedVocab.image,
            audio: savedVocab.audio,
            example: savedVocab.example,
            spelling: savedVocab.spelling,
          });
          const result = await collections.vocabsSaved?.updateOne(
            { _id: new ObjectId(userId) },
            { $set: userVocabsSaved }
          );
          return result ? true : false;
        }
        return true;
      }
    } else {
      const newUserVocabsSaved: VocabsSaved = {
        _id: new ObjectId(userId),
        vocabs: [
          {
            _id: savedVocab._id,
            topicId: savedVocab.topicId,
            topicName: savedVocab.topicName,
            word: savedVocab.word,
            meaning_en: savedVocab.meaning_en,
            meaning_vi: savedVocab.meaning_vi,
            image: savedVocab.image,
            audio: savedVocab.audio,
            example: savedVocab.example,
            spelling: savedVocab.spelling,
          },
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const result = await collections.vocabsSaved?.insertOne(newUserVocabsSaved);
      return result ? true : false;
    }
  }
  async getVocabsSaved(userId: string): Promise<VocabsSaved | null> {
    const result = await collections.vocabsSaved?.findOne({ _id: new ObjectId(userId) });
    if (result) {
      return result as VocabsSaved;
    }
    return null;
  }
}

const vocabServiceInstance = new VocabService();
export default vocabServiceInstance;
