import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

export const collections: {
  tests?: mongoDB.Collection;
  testHistories?: mongoDB.Collection;
  testsSaved?: mongoDB.Collection;
  practiceTests?: mongoDB.Collection;
  practiceTestHistories?: mongoDB.Collection;
  practiceLessons?: mongoDB.Collection;
  practiceLessonHistories?: mongoDB.Collection;
  roadmapExercises?: mongoDB.Collection;
  roadmapHistories?: mongoDB.Collection;
  vocabTopics?: mongoDB.Collection;
  vocabHistories?: mongoDB.Collection;
  vocabsSaved?: mongoDB.Collection;
  users?: mongoDB.Collection;
  posts?: mongoDB.Collection;
} = {};

export async function connectDB() {
  dotenv.config();
  const MONGODB_URL = process.env.DB_CONN_STRING || '';
  const DB_NAME = process.env.DB_NAME || '';

  const TESTS_COLLECTION_NAME = process.env.TESTS_COLLECTION_NAME || '';
  const TEST_HISTORIES_COLLECTION_NAME = process.env.TEST_HISTORIES_COLLECTION_NAME || '';
  const TESTS_SAVED_COLLECTION_NAME = process.env.TESTS_SAVED_COLLECTION_NAME || '';
  const PRACTICE_TESTS_COLLECTION_NAME = process.env.PRACTICE_TESTS_COLLECTION_NAME || '';
  const PRACTICE_TEST_HISTORIES_COLLECTION_NAME = process.env.PRACTICE_TEST_HISTORIES_COLLECTION_NAME || '';
  const PRACTICE_LESSONS_COLLECTION_NAME = process.env.PRACTICE_LESSONS_COLLECTION_NAME || '';
  const PRACTICE_LESSON_HISTORIES_COLLECTION_NAME = process.env.PRACTICE_LESSON_HISTORIES_COLLECTION_NAME || '';
  const ROADMAP_EXERCISES_COLLECTION_NAME = process.env.ROADMAP_EXERCISES_COLLECTION_NAME || '';
  const ROADMAP_HISTORIES_COLLECTION_NAME = process.env.ROADMAP_HISTORIES_COLLECTION_NAME || '';
  const VOCABTOPICS_COLLECTION_NAME = process.env.VOCABTOPICS_COLLECTION_NAME || '';
  const VOCAB_HISTORIES_COLLECTION_NAME = process.env.VOCAB_HISTORIES_COLLECTION_NAME || '';
  const VOCABS_SAVED_COLLECTION_NAME = process.env.VOCABS_SAVED_COLLECTION_NAME || '';
  const USERS_COLLECTION_NAME = process.env.USERS_COLLECTION_NAME || '';
  const POSTS_COLLECTION_NAME = process.env.POSTS_COLLECTION_NAME || '';

  const client = new mongoDB.MongoClient(MONGODB_URL);
  await client.connect();

  const db = client.db(DB_NAME);

  const testsCollection = db.collection(TESTS_COLLECTION_NAME);
  const testHistoriesCollection = db.collection(TEST_HISTORIES_COLLECTION_NAME);
  const testsSavedCollection = db.collection(TESTS_SAVED_COLLECTION_NAME);
  const practiceTestsCollection = db.collection(PRACTICE_TESTS_COLLECTION_NAME);
  const practiceTestHistoriesCollection = db.collection(PRACTICE_TEST_HISTORIES_COLLECTION_NAME);
  const practiceLessonsCollection = db.collection(PRACTICE_LESSONS_COLLECTION_NAME);
  const practiceLessonHistoriesCollection = db.collection(PRACTICE_LESSON_HISTORIES_COLLECTION_NAME);
  const roadmapExercisesCollection = db.collection(ROADMAP_EXERCISES_COLLECTION_NAME);
  const roadmapHistoriesCollection = db.collection(ROADMAP_HISTORIES_COLLECTION_NAME);
  const vocabTopicsCollection = db.collection(VOCABTOPICS_COLLECTION_NAME);
  const vocabHistoriesCollection = db.collection(VOCAB_HISTORIES_COLLECTION_NAME);
  const vocabsSavedCollection = db.collection(VOCABS_SAVED_COLLECTION_NAME);
  const usersCollection = db.collection(USERS_COLLECTION_NAME);
  const postsCollection = db.collection(POSTS_COLLECTION_NAME);
  collections.tests = testsCollection;
  collections.testHistories = testHistoriesCollection;
  collections.testsSaved = testsSavedCollection;
  collections.practiceTests = practiceTestsCollection;
  collections.practiceTestHistories = practiceTestHistoriesCollection;
  collections.practiceLessons = practiceLessonsCollection;
  collections.practiceLessonHistories = practiceLessonHistoriesCollection;
  collections.roadmapExercises = roadmapExercisesCollection;
  collections.roadmapHistories = roadmapHistoriesCollection;
  collections.vocabTopics = vocabTopicsCollection;
  collections.vocabHistories = vocabHistoriesCollection;
  collections.vocabsSaved = vocabsSavedCollection;
  collections.users = usersCollection;
  collections.posts = postsCollection;
  console.log('Successfully connected to database: ', DB_NAME);
}
