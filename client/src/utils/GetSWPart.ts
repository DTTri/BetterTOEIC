export default function GetSWPart(question_number: number) {
  // question_number: 1 - 19
  // speaking:
  //  Tasks 1–2
  // Read a text aloud	● Pronunciation
  // ● Intonation and stress
  // Tasks 3-4 *
  // Describe a picture	All of the above, plus
  // ● Grammar
  // ● Vocabulary
  // ● Cohesion
  // Tasks 5-7
  // Respond to questions	All of the above, plus
  // ● Relevance of content
  // ● Completeness of content
  // Tasks 8-10
  // Respond to questions using information provided	All of the above
  // Tasks 10
  // Propose a solution
  // (Eliminate from August 7, 2021)	All of the above
  // Tasks 11
  // Express an opinion	All of the above
  // // Writing:
  // Task 1-5
  // Write a sentence based on a picture	● Grammar
  // ● Relevance of the sentences to the pictures
  // Task 6-7
  // Respond to a written request	● Quality and variety of your sentences
  // ● Vocabulary
  // ● Organisation
  // Task 8
  // Write an opinion essay	● Whether your opinion is supported with reasons and/or examples
  // ● Grammar
  // ● Vocabulary
  // ● Organisation
  if (question_number <= 2) {
    return 1;
  } else if (question_number <= 4) {
    return 2;
  } else if (question_number <= 7) {
    return 3;
  } else if (question_number <= 10) {
    return 4;
  } else if (question_number === 11) {
    return 5;
  } else if (question_number <= 16) {
    return 6;
  } else if (question_number <= 18) {
    return 7;
  } else if (question_number === 19) {
    return 8;
  } else {
    return 0;
  }
}
