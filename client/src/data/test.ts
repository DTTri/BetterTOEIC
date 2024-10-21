import { Test } from "@/entities";
/*
Số câu hỏi cố định cho mỗi part:
Part 1 (6 câu hỏi)
Part 2 (25 câu hỏi)
Part 3 (39 câu hỏi)
Part 4 (30 câu hỏi)
Part 5 (30 câu hỏi)
Part 6 (16 câu hỏi)
Part 7 (54 câu hỏi)
*/
const testData: Test = {
  _id: "653f1ae34b8f1e2f10123456",
  title: "TOEIC Sample Test 2024",
  description: "A sample TOEIC test for practice.",
  main_audio: "https://example.com/audio/test.mp3",
  created_by: "653f1ae34b8f1e2f10111213",
  created_at: "",
  updated_at: "",
  difficulty: "medium",
  questions: [
    // Part 1: 6 câu hỏi với hình ảnh và 3 đáp án
    {
      _id: "653f1af74b8f1e2f10123457",
      question_number: 1,
      text: "What is the man doing?",
      image: [
        "https://images.unsplash.com/photo-1728595840390-d01e1a63f27d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D",
      ],
      choices: [
        "He is talking on the phone.",
        "He is reading a book.",
        "He is writing something.",
      ],
      correct_choice: 1,
      explanation: "The man is holding a phone to his ear.",
      part: 1,
      question_group_id: "0",
    },
    // ... 5 câu tương tự cho Part 1

    // Part 2: 25 câu hỏi chỉ có câu hỏi và 3 đáp án
    {
      _id: "653f1b274b8f1e2f10123458",
      text: "Where did you leave the report?",
      question_number: 7,
      choices: ["", "", ""],
      correct_choice: 1,
      explanation: "The correct answer is about location, not timing.",
      part: 2,
      question_group_id: "0",
    },
    // ... 24 câu tương tự cho Part 2

    // Part 3: 39 câu hỏi (13 nhóm, mỗi nhóm 3 câu hỏi), có thể có hình hoặc không
    {
      _id: "653f1b564b8f1e2f10123459",
      text: "What does the woman imply?",
      question_number: 31,
      choices: [
        "A. She forgot to bring something.",
        "B. She is late for a meeting.",
        "C. She needs more time.",
      ],
      correct_choice: 3,
      explanation: "The woman's tone suggests she needs more time.",
      part: 3,
      question_group_id: "5",
    },
    {
      _id: "653f1b564b8f1e2f10123459",
      text: "What does the woman say?",
      question_number: 32,
      choices: [
        "A. She forgot to bring something.",
        "B. She is late for a meeting.",
        "C. She needs more time.",
      ],
      correct_choice: 3,
      explanation: "The woman's tone suggests she needs more time.",
      part: 3,
      question_group_id: "5",
    },
    {
      _id: "653f1b564b8f1e2f10123459",
      text: "What does the woman asdmas;md?",
      question_number: 33,
      choices: [
        "A. She forgot to bring something.",
        "B. She is late for a meeting.",
        "C. She needs more time.",
      ],
      correct_choice: 3,
      explanation: "The woman's tone suggests she needs more time.",
      part: 3,
      question_group_id: "5",
    },
    // ... 38 câu tương tự cho Part 3

    // Part 4: 30 câu hỏi (10 nhóm, mỗi nhóm 3 câu hỏi), có thể có hình hoặc không
    {
      _id: "653f1b7d4b8f1e2f10123460",
      text: "Who is the intended audience?",
      question_number: 41,
      choices: [
        "A. College students.",
        "B. Business professionals.",
        "C. Tourists.",
      ],
      correct_choice: 2,
      explanation: "The speaker mentions business meetings and conferences.",
      part: 4,
      question_group_id: "0",
    },
    {
      _id: "653f1b7d4b8f1e2f10123460",
      text: "Who is the intended audience?",
      question_number: 42,
      choices: [
        "A. College students.",
        "B. Business professionals.",
        "C. Tourists.",
      ],
      correct_choice: 2,
      explanation: "The speaker mentions business meetings and conferences.",
      part: 4,
      question_group_id: "0",
    },
    {
      _id: "653f1b7d4b8f1e2f10123460",
      text: "Who is the intended audience?",
      question_number: 44,
      choices: [
        "A. College students.",
        "B. Business professionals.",
        "C. Tourists.",
      ],
      correct_choice: 2,
      explanation: "The speaker mentions business meetings and conferences.",
      part: 4,
      question_group_id: "0",
    },
    // ... 29 câu tương tự cho Part 4

    // Part 5: 30 câu hỏi chỉ có câu hỏi và đáp án
    {
      _id: "653f1bb34b8f1e2f10123461",
      question_number: 54,
      text: "The report will be submitted _______ Friday.",
      choices: ["A. on", "B. in", "C. at", "D. to"],
      correct_choice: 1,
      explanation: "'On' is the correct preposition for days of the week.",
      part: 5,
      question_group_id: "0",
    },
    // ... 29 câu tương tự cho Part 5

    // Part 6: 16 câu hỏi với đoạn văn và đáp án
    {
      image: [
        "https://images.unsplash.com/photo-1728595840390-d01e1a63f27d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D",
      ],
      passage: [
        `This truck is 3 years old and in excellent condition for its age. With less than 15z000 miles on the odometer, it has had quite an easy life transporting animals for an animal sanctuary, and it has been used by only one very careful owner.This vehicle averages around 18 miles per gallon on the highway and 13 miles per gallon in the city, which makes its fuel efficiency quite competitive. Price reduced for quick sale to $19,000 (or nearest offer).
                Features: The truck is fitted with seat heaters for both the driver and front passenger. It also features dual and side airbags, satellite navigation, and a USB jack for any second- generation or higher smartphone. Finally, the warranty expires in just under two years.
                The owner will arrange a test drive in the New Jersey area for serious buyers. Please call (201) 555-7586 and leave a message for Geraldine. All calls will be returned within 24 hours.`,
      ],
      _id: "653f1bd84b8f1e2f10123462",
      question_number: 51,
      text: "Which word best completes the sentence in the passages?",
      choices: ["A. Although", "B. Since", "C. Despite", "D. While"],
      correct_choice: 2,
      explanation:
        "'Since' is the best choice for a cause-effect relationship.",
      part: 6,
      question_group_id: "1",
    },
    {
      _id: "653f1c0d4b8f1e2f10123463",
      text: "What is the purpose of the passage?",
      choices: [
        "A. To explain a new policy.",
        "B. To provide a summary.",
        "C. To advertise a product.",
        "D. To give instructions.",
      ],
      question_number: 52,
      correct_choice: 4,
      explanation:
        "The passage gives detailed instructions on how to use a product.",
      part: 6,
      question_group_id: "1",
    },
    {
      _id: "653f1c0d4b8f1e2f10153s463",
      text: "What is the purpose of the passage?",
      choices: [
        "A. To explain a new policy.",
        "B. To provide a summary.",
        "C. To advertise a product.",
        "D. To give instructions.",
      ],
      question_number: 52,
      correct_choice: 4,
      explanation:
        "The passage gives detailed instructions on how to use a product.",
      part: 6,
      question_group_id: "1",
    },

    // ... 13 câu tương tự cho Part 6

    // Part 7: 54 câu hỏi với đoạn văn, có thể có hình
    {
      _id: "653f1c3a4b8f1e2f10123465",
      passage: [
        `This truck is 3 years old and in excellent condition for its age. With less than 15z000 miles on the odometer, it has had quite an easy life transporting animals for an animal sanctuary, and it has been used by only one very careful owner.This vehicle averages around 18 miles per gallon on the highway and 13 miles per gallon in the city, which makes its fuel efficiency quite competitive. Price reduced for quick sale to $19,000 (or nearest offer).
              Features: The truck is fitted with seat heaters for both the driver and front passenger. It also features dual and side airbags, satellite navigation, and a USB jack for any second- generation or higher smartphone. Finally, the warranty expires in just under two years.
              The owner will arrange a test drive in the New Jersey area for serious buyers. Please call (201) 555-7586 and leave a message for Geraldine. All calls will be returned within 24 hours.`,
      ],
      text: "What is the purpose of the email?",
      image: [
        "https://images.unsplash.com/photo-1728595840390-d01e1a63f27d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D",
      ],
      choices: [
        "A. To inform about a meeting.",
        "B. To confirm a reservation.",
        "C. To request information.",
        "D. To apologize for a mistake.",
      ],
      question_number: 61,
      correct_choice: 2,
      explanation:
        "The email contains details about a hotel reservation confirmation.",
      part: 7,
      question_group_id: "2",
    },
    {
      _id: "653f1c3a4b8f1e2f10123465",
      text: "What is the purpose of the email?",
      choices: [
        "A. To inform about a meeting.",
        "B. To confirm a reservation.",
        "C. To request information.",
        "D. To apologize for a mistake.",
      ],
      question_number: 62,
      correct_choice: 2,
      explanation:
        "The email contains details about a hotel reservation confirmation.",
      part: 7,
      question_group_id: "2",
    },
    {
      _id: "653f1c3a4b8f1e2f10123465",
      text: "What is the purpose of the email?",
      choices: [
        "A. To inform about a meeting.",
        "B. To confirm a reservation.",
        "C. To request information.",
        "D. To apologize for a mistake.",
      ],
      question_number: 63,
      correct_choice: 2,
      explanation:
        "The email contains details about a hotel reservation confirmation.",
      part: 7,
      question_group_id: "2",
    },
    // ... 52 câu tương tự cho Part 7
  ],
};

export default testData;
