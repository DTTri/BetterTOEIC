import { VocabByTopic, Vocab } from "@/entities";

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateVocab = (topicName: string): Vocab => {
  return {
    _id: generateRandomString(10),
    word: generateRandomString(5),
    meaning_en: generateRandomString(10),
    meaing_vn: generateRandomString(10),
    image_world: `https://picsum.photos/200/300?random=${getRandomInt(
      1,
      1000
    )}`,
    audio_world: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${getRandomInt(
      1,
      16
    )}.mp3`,
    topic_name: topicName,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ex_sentence: generateRandomString(20),
  };
};

const generateVocabByTopic = (): VocabByTopic => {
  const topicName = generateRandomString(8);
  const vocabsCount = getRandomInt(5, 15);
  const vocabs: Vocab[] = [];
  for (let i = 0; i < vocabsCount; i++) {
    vocabs.push(generateVocab(topicName));
  }

  return {
    _id: generateRandomString(10),
    topic_name: topicName,
    vocabs: vocabs,
    image_background: `https://picsum.photos/800/600?random=${getRandomInt(
      1,
      1000
    )}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

const vocabsByTopics: VocabByTopic[] = new Array(20)
  .fill(null)
  .map(() => generateVocabByTopic());

export default vocabsByTopics;
