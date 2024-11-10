import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

export const collections: {
  tests?: mongoDB.Collection;
  testHistories?: mongoDB.Collection;
  testsSaved?: mongoDB.Collection;
} = {};

export async function connectDB() {
  dotenv.config();
  const MONGODB_URL = process.env.DB_CONN_STRING || '';
  const DB_NAME = process.env.DB_NAME || '';
  const TESTS_COLLECTION_NAME = process.env.TESTS_COLLECTION_NAME || '';
  const TEST_HISTORIES_COLLECTION_NAME = process.env.TEST_HISTORIES_COLLECTION_NAME || '';
  const TESTS_SAVED_COLLECTION_NAME = process.env.TESTS_SAVED_COLLECTION_NAME || '';
  const client = new mongoDB.MongoClient(MONGODB_URL);
  await client.connect();

  const db = client.db(DB_NAME);

  const testsCollection = db.collection(TESTS_COLLECTION_NAME);
  const testHistoriesCollection = db.collection(TEST_HISTORIES_COLLECTION_NAME);
  const testsSavedCollection = db.collection(TESTS_SAVED_COLLECTION_NAME);
  collections.tests = testsCollection;
  collections.testHistories = testHistoriesCollection;
  collections.testsSaved = testsSavedCollection;

  console.log('Successfully connected to database: ', DB_NAME);
}
