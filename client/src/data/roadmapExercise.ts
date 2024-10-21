import { RoadmapExercise } from "@/entities";
// type Question = {
//   _id: string;
//   text: string;
//   image?: string[];
//   passage?: string[];
//   choices: string[];
//   correct_choice: number;
//   explanation: string;
//   part: number;
//   question_number: number;
//   question_group_id?: string;
// };
// type Chapter = {
//   questions: Question[];
// };

// type RoadmapExercise = {
//   id: string;
//   phase: number;
//   part: number;
//   audio: string;
//   chapters: Chapter[];
//   created_at: string;
//   updated_at: string;
// };

const roadmapExPhase1Part1: RoadmapExercise = {
  id: "phase1-part1",
  phase: 1,
  part: 1,
  audio: "audio.mp3",
  chapters: [
    {
      questions: [
        {
          _id: "q1",
          text: "What is the main idea of the passage? (This is chapter 1)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main idea is...",
          part: 1,
          question_number: 1,
          question_group_id: "0",
        },
        {
          _id: "q2",
          text: "What does the author imply?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The author implies...",
          part: 1,
          question_number: 2,
          question_group_id: "0",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q1",
          text: "What is the main idea of the passage? (This is chapter 2)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main idea is...",
          part: 1,
          question_number: 1,
          question_group_id: "0",
        },
        {
          _id: "q2",
          text: "What does the author imply?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The author implies...",
          part: 1,
          question_number: 2,
          question_group_id: "0",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q1",
          text: "What is the main idea of the passage? (This is chapter 3)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main idea is...",
          part: 1,
          question_number: 1,
          question_group_id: "0",
        },
        {
          _id: "q2",
          text: "What does the author imply?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The author implies...",
          part: 1,
          question_number: 2,
          question_group_id: "0",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q1",
          text: "What is the main idea of the passage? (This is chapter 4)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main idea is...",
          part: 1,
          question_number: 1,
          question_group_id: "0",
        },
        {
          _id: "q2",
          text: "What does the author imply?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The author implies...",
          part: 1,
          question_number: 2,
          question_group_id: "0",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q1",
          text: "What is the main idea of the passage? (This is chapter 5)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main idea is...",
          part: 1,
          question_number: 1,
          question_group_id: "0",
        },
        {
          _id: "q2",
          text: "What does the author imply?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The author implies...",
          part: 1,
          question_number: 2,
          question_group_id: "0",
        },
      ],
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const roadmapExPhase1Part2: RoadmapExercise = {
  id: "phase1-part2",
  phase: 1,
  part: 2,
  audio: "audio.mp3",
  chapters: [
    {
      questions: [
        {
          _id: "q3",
          text: "What is the purpose of the email? (This is chapter 1)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The purpose is...",
          part: 2,
          question_number: 1,
          question_group_id: "1",
        },
        {
          _id: "q4",
          text: "Who is the intended audience?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The intended audience is...",
          part: 2,
          question_number: 2,
          question_group_id: "1",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q3",
          text: "What is the purpose of the email? (This is chapter 2)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The purpose is...",
          part: 2,
          question_number: 1,
          question_group_id: "1",
        },
        {
          _id: "q4",
          text: "Who is the intended audience?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The intended audience is...",
          part: 2,
          question_number: 2,
          question_group_id: "1",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q3",
          text: "What is the purpose of the email? (This is chapter 3)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The purpose is...",
          part: 2,
          question_number: 1,
          question_group_id: "1",
        },
        {
          _id: "q4",
          text: "Who is the intended audience?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The intended audience is...",
          part: 2,
          question_number: 2,
          question_group_id: "1",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q3",
          text: "What is the purpose of the email? (This is chapter 4)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The purpose is...",
          part: 2,
          question_number: 1,
          question_group_id: "1",
        },
        {
          _id: "q4",
          text: "Who is the intended audience?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The intended audience is...",
          part: 2,
          question_number: 2,
          question_group_id: "1",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q3",
          text: "What is the purpose of the email? (This is chapter 5)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The purpose is...",
          part: 2,
          question_number: 1,
          question_group_id: "1",
        },
        {
          _id: "q4",
          text: "Who is the intended audience?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The intended audience is...",
          part: 2,
          question_number: 2,
          question_group_id: "1",
        },
      ],
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const roadmapExPhase1Part3: RoadmapExercise = {
  id: "phase1-part3",
  phase: 1,
  part: 3,
  audio: "audio.mp3",
  chapters: [
    {
      questions: [
        {
          _id: "q5",
          text: "What is the main topic of the conversation? (This is chapter 1)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main topic is...",
          part: 3,
          question_number: 1,
          question_group_id: "2",
        },
        {
          _id: "q6",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 3,
          question_number: 2,
          question_group_id: "2",
        },
        {
          _id: "q7",
          text: "What are the speaking going to do?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "He is going to...",
          part: 3,
          question_number: 3,
          question_group_id: "2",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q5",
          text: "What is the main topic of the conversation? (This is chapter 2)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main topic is...",
          part: 3,
          question_number: 1,
          question_group_id: "2",
        },
        {
          _id: "q6",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 3,
          question_number: 2,
          question_group_id: "2",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q5",
          text: "What is the main topic of the conversation? (This is chapter 3)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main topic is...",
          part: 3,
          question_number: 1,
          question_group_id: "2",
        },
        {
          _id: "q6",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 3,
          question_number: 2,
          question_group_id: "2",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q5",
          text: "What is the main topic of the conversation? (This is chapter 4)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main topic is...",
          part: 3,
          question_number: 1,
          question_group_id: "2",
        },
        {
          _id: "q6",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 3,
          question_number: 2,
          question_group_id: "2",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q5",
          text: "What is the main topic of the conversation? (This is chapter 5)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main topic is...",
          part: 3,
          question_number: 1,
          question_group_id: "2",
        },
        {
          _id: "q6",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 3,
          question_number: 2,
          question_group_id: "2",
        },
      ],
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const roadmapExPhase1Part4: RoadmapExercise = {
  id: "phase1-part4",
  phase: 1,
  part: 4,
  audio: "audio.mp3",
  chapters: [
    {
      questions: [
        {
          _id: "q7",
          text: "What is the main point of the announcement? (This is Chapter 1)",
          image: ["https://via.placeholder.com/150"],
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The main point is...",
          part: 4,
          question_number: 1,
          question_group_id: "3",
        },
        {
          _id: "q8",
          text: "What action is required?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The required action is...",
          part: 4,
          question_number: 2,
          question_group_id: "3",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q7",
          text: "What is the main point of the announcement? (This is Chapter 2)",
          image: ["https://via.placeholder.com/150"],
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The main point is...",
          part: 4,
          question_number: 1,
          question_group_id: "3",
        },
        {
          _id: "q8",
          text: "What action is required?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The required action is...",
          part: 4,
          question_number: 2,
          question_group_id: "3",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q7",
          text: "What is the main point of the announcement? (This is Chapter 3)",
          image: ["https://via.placeholder.com/150"],
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The main point is...",
          part: 4,
          question_number: 1,
          question_group_id: "3",
        },
        {
          _id: "q8",
          text: "What action is required?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The required action is...",
          part: 4,
          question_number: 2,
          question_group_id: "3",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q7",
          text: "What is the main point of the announcement? (This is Chapter 4)",
          image: ["https://via.placeholder.com/150"],
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The main point is...",
          part: 4,
          question_number: 1,
          question_group_id: "3",
        },
        {
          _id: "q8",
          text: "What action is required?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The required action is...",
          part: 4,
          question_number: 2,
          question_group_id: "3",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q7",
          text: "What is the main point of the announcement? (This is Chapter 5)",
          image: ["https://via.placeholder.com/150"],
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The main point is...",
          part: 4,
          question_number: 1,
          question_group_id: "3",
        },
        {
          _id: "q8",
          text: "What action is required?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The required action is...",
          part: 4,
          question_number: 2,
          question_group_id: "3",
        },
      ],
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const roadmapExPhase1Part5: RoadmapExercise = {
  id: "phase1-part5",
  phase: 1,
  part: 5,
  chapters: [
    {
      questions: [
        {
          _id: "q9",
          text: "What is the main idea of the passage? (This is chapter 1)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main idea is...",
          part: 5,
          question_number: 1,
        },
        {
          _id: "q10",
          text: "What does the author imply?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The author implies...",
          part: 5,
          question_number: 2,
        },
      ],
    },
    {
      questions: [
        {
          _id: "q9",
          text: "What is the main idea of the passage? (This is chapter 2)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main idea is...",
          part: 5,
          question_number: 1,
        },
        {
          _id: "q10",
          text: "What does the author imply?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The author implies...",
          part: 5,
          question_number: 2,
        },
      ],
    },
    {
      questions: [
        {
          _id: "q9",
          text: "What is the main idea of the passage? (This is chapter 3)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main idea is...",
          part: 5,
          question_number: 1,
        },
        {
          _id: "q10",
          text: "What does the author imply?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The author implies...",
          part: 5,
          question_number: 2,
        },
      ],
    },
    {
      questions: [
        {
          _id: "q9",
          text: "What is the main idea of the passage? (This is chapter 4)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main idea is...",
          part: 5,
          question_number: 1,
        },
        {
          _id: "q10",
          text: "What does the author imply?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The author implies...",
          part: 5,
          question_number: 2,
        },
      ],
    },
    {
      questions: [
        {
          _id: "q9",
          text: "What is the main idea of the passage? (This is chapter 5)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main idea is...",
          part: 5,
          question_number: 1,
        },
        {
          _id: "q10",
          text: "What does the author imply?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The author implies...",
          part: 5,
          question_number: 2,
        },
      ],
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const roadmapExPhase1Part6: RoadmapExercise = {
  id: "phase1-part6",
  phase: 1,
  part: 6,
  chapters: [
    {
      questions: [
        {
          _id: "q11",
          text: "What is the purpose of the email? (This is chapter 1)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The purpose is...",
          part: 6,
          question_number: 1,
          passage: ["This is a passage..."],
          question_group_id: "4",
        },
        {
          _id: "q12",
          text: "Who is the intended audience?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The intended audience is...",
          part: 6,
          question_number: 2,
          passage: ["This is a passage..."],
          question_group_id: "4",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q11",
          text: "What is the purpose of the email? (This is chapter 2)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The purpose is...",
          part: 6,
          question_number: 1,
          passage: ["This is a passage..."],
          question_group_id: "4",
        },
        {
          _id: "q12",
          text: "Who is the intended audience?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The intended audience is...",
          part: 6,
          question_number: 2,
          passage: ["This is a passage..."],
          question_group_id: "4",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q11",
          text: "What is the purpose of the email? (This is chapter 3)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The purpose is...",
          part: 6,
          question_number: 1,
          passage: ["This is a passage..."],
          question_group_id: "4",
        },
        {
          _id: "q12",
          text: "Who is the intended audience?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The intended audience is...",
          part: 6,
          question_number: 2,
          passage: ["This is a passage..."],
          question_group_id: "4",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q11",
          text: "What is the purpose of the email? (This is chapter 4)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The purpose is...",
          part: 6,
          question_number: 1,
          passage: ["This is a passage..."],
          question_group_id: "4",
        },
        {
          _id: "q12",
          text: "Who is the intended audience?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The intended audience is...",
          part: 6,
          question_number: 2,
          passage: ["This is a passage..."],
          question_group_id: "4",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q11",
          text: "What is the purpose of the email? (This is chapter 5)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 2,
          explanation: "The purpose is...",
          part: 6,
          question_number: 1,
          passage: ["This is a passage..."],
          question_group_id: "4",
        },
        {
          _id: "q12",
          text: "Who is the intended audience?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 3,
          explanation: "The intended audience is...",
          part: 6,
          question_number: 2,
          passage: ["This is a passage..."],
          question_group_id: "4",
        },
      ],
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const roadmapExPhase1Part7: RoadmapExercise = {
  id: "phase1-part7",
  phase: 1,
  part: 7,
  chapters: [
    {
      questions: [
        {
          _id: "q13",
          text: "What is the main topic of the conversation? (This is chapter 1)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main topic is...",
          part: 7,
          question_number: 1,
          image: ["https://via.placeholder.com/150"],
          passage: ["This is a passage..."],
          question_group_id: "5",
        },
        {
          _id: "q14",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 7,
          question_number: 2,
          question_group_id: "5",
        },
        {
          _id: "q15",
          text: "What is the main topic of the conversation?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main topic is...",
          part: 7,
          question_number: 3,
          image: ["https://via.placeholder.com/150"],
          passage: ["This is a passage..."],
          question_group_id: "001",
        },
        {
          _id: "q16",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 7,
          question_number: 4,
          question_group_id: "001",
        },
        {
          _id: "q17",
          text: "What is the man going to do?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The is going to...",
          part: 7,
          question_number: 5,
          question_group_id: "001",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q13",
          text: "What is the main topic of the conversation? (This is chapter 2)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main topic is...",
          part: 7,
          question_number: 1,
          image: ["https://via.placeholder.com/150"],
          passage: ["This is a passage..."],
          question_group_id: "5",
        },
        {
          _id: "q14",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 7,
          question_number: 2,
          question_group_id: "5",
        },
        {
          _id: "q15",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 7,
          question_number: 3,
          question_group_id: "5",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q13",
          text: "What is the main topic of the conversation? (This is chapter 3)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main topic is...",
          part: 7,
          question_number: 1,
          image: ["https://via.placeholder.com/150"],
          passage: ["This is a passage..."],
          question_group_id: "5",
        },
        {
          _id: "q14",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 7,
          question_number: 2,
          question_group_id: "5",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q13",
          text: "What is the main topic of the conversation? (This is chapter 4)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main topic is...",
          part: 7,
          question_number: 1,
          image: ["https://via.placeholder.com/150"],
          passage: ["This is a passage..."],
          question_group_id: "5",
        },
        {
          _id: "q14",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 7,
          question_number: 2,
          question_group_id: "5",
        },
      ],
    },
    {
      questions: [
        {
          _id: "q13",
          text: "What is the main topic of the conversation? (This is chapter 5)",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 0,
          explanation: "The main topic is...",
          part: 7,
          question_number: 1,
          image: ["https://via.placeholder.com/150"],
          passage: ["This is a passage..."],
          question_group_id: "5",
        },
        {
          _id: "q14",
          text: "What does the speaker suggest?",
          choices: ["Choice A", "Choice B", "Choice C", "Choice D"],
          correct_choice: 1,
          explanation: "The speaker suggests...",
          part: 7,
          question_number: 2,
          question_group_id: "5",
        },
      ],
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export {
  roadmapExPhase1Part1,
  roadmapExPhase1Part2,
  roadmapExPhase1Part3,
  roadmapExPhase1Part4,
  roadmapExPhase1Part5,
  roadmapExPhase1Part6,
  roadmapExPhase1Part7,
};
// similar for other phases
