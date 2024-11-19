import Question from "@/entities/Question";
import Practice from "@/entities/PracticeTest";

//example data for part 2 practice test
const practiceForPart1 = [
  {
    _id: "1",
    created_at: "",
    updated_at: "",
    part: 1,
    practice_audio: "",
    questions: [
      {
        _id: "11",
        text: "Question text for part 1 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 1,
        question_number: 1,
      },
      {
        _id: "12",
        text: "Question text for part 1 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 1,
      },
      {
        _id: "13",
        text: "Question text for part 1 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 1,
      },
    ],
  },
  {
    _id: "2",
    created_at: "",
    updated_at: "",
    part: 1,
    practice_audio: "",
    questions: [
      {
        _id: "q4",
        text: "Question text for part 2 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 1,
      },
      {
        _id: "q5",
        text: "Question text for part 2 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 2,
      },
      {
        _id: "q6",
        text: "Question text for part 2 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 3,
      },
    ],
  },
  {
    _id: "3",
    created_at: "",
    updated_at: "",
    part: 1,
    practice_audio: "",
    questions: [
      {
        _id: "q7",
        text: "Question text for part 3 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 1,
      },
      {
        _id: "q8",
        text: "Question text for part 3 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 2,
      },
      {
        _id: "q9",
        text: "Question text for part 3 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 3,
      },
    ],
  },
];
const practiceForPart2 = [
  {
    _id: "2",
    created_at: "",
    updated_at: "",
    part: 2,
    practice_audio: "",
    questions: [
      {
        _id: "q1",
        text: "Question text for part 1 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 1,
        question_number: 1,
      },
      {
        _id: "q2",
        text: "Question text for part 1 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 1,
      },
      {
        _id: "q3",
        text: "Question text for part 1 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 1,
      },
    ],
  },
  {
    _id: "2",
    created_at: "",
    updated_at: "",
    part: 2,
    practice_audio: "",
    questions: [
      {
        _id: "q4",
        text: "Question text for part 2 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 1,
      },
      {
        _id: "q5",
        text: "Question text for part 2 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 2,
      },
      {
        _id: "q6",
        text: "Question text for part 2 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 3,
      },
    ],
  },
  {
    _id: "3",
    created_at: "",
    updated_at: "",
    part: 2,
    practice_audio: "",
    questions: [
      {
        _id: "q7",
        text: "Question text for part 3 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 1,
      },
      {
        _id: "q8",
        text: "Question text for part 3 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 2,
      },
      {
        _id: "q9",
        text: "Question text for part 3 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 3,
      },
    ],
  },
];
const practiceForPart3 = [
  {
    _id: "1",
    created_at: "",
    updated_at: "",
    part: 3,
    practice_audio: "",
    questions: [
      {
        _id: "q1",
        text: "Question text for part 1 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 1,
        question_number: 1,
      },
      {
        _id: "q2",
        text: "Question text for part 1 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 1,
      },
      {
        _id: "q3",
        text: "Question text for part 1 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 1,
      },
    ],
  },
  {
    _id: "2",
    created_at: "",
    updated_at: "",
    part: 3,
    practice_audio: "",
    questions: [
      {
        _id: "q4",
        text: "Question text for part 2 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 1,
      },
      {
        _id: "q5",
        text: "Question text for part 2 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 2,
      },
      {
        _id: "q6",
        text: "Question text for part 2 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 3,
      },
    ],
  },
  {
    _id: "3",
    created_at: "",
    updated_at: "",
    part: 3,
    practice_audio: "",
    questions: [
      {
        _id: "q7",
        text: "Question text for part 3 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 1,
      },
      {
        _id: "q8",
        text: "Question text for part 3 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 2,
      },
      {
        _id: "q9",
        text: "Question text for part 3 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 3,
      },
    ],
  },
];
const practiceForPart4 = [
  {
    _id: "1",
    created_at: "",
    updated_at: "",
    part: 4,
    practice_audio: "",
    questions: [
      {
        _id: "q1",
        text: "Question text for part 1 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 1,
        question_number: 1,
      },
      {
        _id: "q2",
        text: "Question text for part 1 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 1,
      },
      {
        _id: "q3",
        text: "Question text for part 1 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 1,
      },
    ],
  },
  {
    _id: "2",
    created_at: "",
    updated_at: "",
    part: 4,
    practice_audio: "",
    questions: [
      {
        _id: "q4",
        text: "Question text for part 2 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 1,
      },
      {
        _id: "q5",
        text: "Question text for part 2 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 2,
      },
      {
        _id: "q6",
        text: "Question text for part 2 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 3,
      },
    ],
  },
  {
    _id: "3",
    created_at: "",
    updated_at: "",
    part: 4,
    practice_audio: "",
    questions: [
      {
        _id: "q7",
        text: "Question text for part 3 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 1,
      },
      {
        _id: "q8",
        text: "Question text for part 3 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 2,
      },
      {
        _id: "q9",
        text: "Question text for part 3 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 3,
      },
    ],
  },
];
const practiceForPart5 = [
  {
    _id: "1",
    created_at: "",
    updated_at: "",
    part: 5,
    questions: [
      {
        _id: "q1",
        text: "Question text for part 1 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 1,
        question_number: 1,
      },
      {
        _id: "q2",
        text: "Question text for part 1 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 1,
      },
      {
        _id: "q3",
        text: "Question text for part 1 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 1,
      },
    ],
  },
  {
    _id: "2",
    created_at: "",
    updated_at: "",
    part: 5,
    questions: [
      {
        _id: "q4",
        text: "Question text for part 2 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 1,
      },
      {
        _id: "q5",
        text: "Question text for part 2 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 2,
      },
      {
        _id: "q6",
        text: "Question text for part 2 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 2,
        question_number: 3,
      },
    ],
  },
  {
    _id: "3",
    created_at: "",
    updated_at: "",
    part: 5,
    questions: [
      {
        _id: "q7",
        text: "Question text for part 3 - 1",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 0,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 1,
      },
      {
        _id: "q8",
        text: "Question text for part 3 - 2",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 1,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 2,
      },
      {
        _id: "q9",
        text: "Question text for part 3 - 3",
        image: [],
        choices: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        correct_choice: 2,
        created_at: "",
        updated_at: "",
        explanation: "",
        part: 3,
        question_number: 3,
      },
    ],
  },
];

export {
  practiceForPart1,
  practiceForPart2,
  practiceForPart3,
  practiceForPart4,
  practiceForPart5,
};
