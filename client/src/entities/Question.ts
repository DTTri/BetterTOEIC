type Question = {
  text: string;
  images?: string[];
  passages?: string[];
  choices: string[];
  correct_choice: number;
  explanation: string;
  part: number;
  question_number: number;
  question_group_number: number;
};
// question_group_number will be the number of the first question in the group, for example, if the group has 3 questions, the first question will have question_group_number = 1, the second question will have question_group_number = 1, and the third question will have question_group_number = 1
// if Question is not part of a group, question_group_number will be 0

export default Question;
