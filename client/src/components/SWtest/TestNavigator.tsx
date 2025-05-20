import { useEffect, useState } from "react";
import Part1 from "./speaking/Part1";
import Part2 from "./speaking/Part2";
import Part3 from "./speaking/Part3";
import Part4 from "./speaking/Part4";
import Part5 from "./speaking/Part5";
import Part6 from "./writing/Part6";
import Part7 from "./writing/Part7";
import Part8 from "./writing/Part8";
import { SWQuestion } from "@/entities";
import getSWPart from "@/utils/GetSWPart";

//type TestSection = "speaking" | "writing";

interface TestNavigatorProps {
  questions: SWQuestion[];
  onComplete: (results: {
    speakingRecordings: Blob[];
    writingAnswers: string[];
  }) => void;
}

export default function TestNavigator({
  questions,
  onComplete,
}: TestNavigatorProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [speakingRecordings, setSpeakingRecordings] = useState<Blob[]>([]);
  const [writingAnswers, setWritingAnswers] = useState<string[]>([]);
  const [currentPart, setCurrentPart] = useState(1);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const handleNextQuestion = () => {
    // if (questions[currentQuestion].question_number === 19) {
    //   // onComplete({
    //   //   speakingRecordings,
    //   //   writingAnswers,
    //   // });
    // } else if (questions[currentQuestion].question_number === 12) {
    //   setCurrentQuestion((q) => q + 5);
    // } else {
    //   setCurrentQuestion((q) => q + 1);
    // }
    const currentQNumber = questions[currentQuestion]?.question_number;

    if (currentQNumber === 19) {
      return;
    }

    if (currentPart === 6) {
      // Part 6 (Q12-Q16) gọi onComplete một lần với tất cả các câu trả lời của nó.
      let nextPartNumber = currentPart + 1;
      let indexOfNextPartStart = -1;

      // Tìm index của câu hỏi đầu tiên thuộc Part tiếp theo
      while(nextPartNumber <= 8 && indexOfNextPartStart === -1) { // Giả sử có tối đa 8 part
          indexOfNextPartStart = questions.findIndex(q => getSWPart(q.question_number) === nextPartNumber);
          if (indexOfNextPartStart !== -1) break;
          nextPartNumber++;
      }

      if (indexOfNextPartStart !== -1) {
        setCurrentQuestion(indexOfNextPartStart);
      } else {
        // Điều này không nên xảy ra nếu cấu trúc bài thi hợp lệ và đã kiểm tra Q19
        console.error(`[TestNavigator] Không tìm thấy điểm bắt đầu của Part ${nextPartNumber} sau Part 6, và đây không phải Q19.`);
        // Có thể cần xử lý lỗi ở đây, tạm thời chuyển đến câu tiếp theo theo index
        setCurrentQuestion((q) => q + 1);
      }
    } else {
      setCurrentQuestion((q) => q + 1);
    }
  };

  useEffect(() => {
    if (questions[currentQuestion]) {
      setCurrentPart(getSWPart(questions[currentQuestion].question_number));
    }
  }, [currentQuestion, questions]);

  const handleRecordingComplete = (recording: Blob) => {
    const newRecordings = [...speakingRecordings];
    newRecordings.push(recording);
    setSpeakingRecordings(newRecordings);
    handleNextQuestion();
  };

  const handleAnswerComplete = (answers: string | string[]) => {
    console.log("[TestNavigator] handleAnswerComplete nhận được:", answers);
    const newAnswers = [...writingAnswers];
    if (Array.isArray(answers)) {
      newAnswers.push(...answers);
    } else {
      newAnswers.push(answers);
    }
    setWritingAnswers(newAnswers);
    handleNextQuestion();
  };

  // useEffect(() => {
  //   console.log("[TestNavigator] speakingRecordings đã cập nhật:", speakingRecordings);
  // }, [speakingRecordings]);
  // useEffect(() => {
  //   console.log("[TestNavigator] writingAnswers đã cập nhật:", writingAnswers);
  // }, [writingAnswers]);

  const renderCurrentPart = () => {
    if (isTestCompleted || !questions[currentQuestion]) {
      return <div className="text-center p-10">Bài thi đã kết thúc hoặc đang tải...</div>;
    }
    switch (currentPart) {
      case 1:
        return (
          <Part1
            question={questions[currentQuestion]}
            onComplete={handleRecordingComplete}
          />
        );
      case 2:
        return (
          <Part2
            question={questions[currentQuestion]}
            onComplete={handleRecordingComplete}
          />
        );
      case 3:
        return (
          <Part3
            question={questions[currentQuestion]}
            onComplete={handleRecordingComplete}
          />
        );
      case 4:
        return (
          <Part4
            question={questions[currentQuestion]}
            onComplete={handleRecordingComplete}
          />
        );
      case 5:
        return (
          <Part5
            question={questions[currentQuestion]}
            onComplete={handleRecordingComplete}
          />
        );
      case 6:
        return (
          <Part6
            questions={questions.filter(
              (q) => getSWPart(q.question_number) === 6
            )}
            onComplete={handleAnswerComplete}
          />
        );
      case 7:
        return (
          <Part7
            question={questions[currentQuestion]}
            onComplete={handleAnswerComplete}
          />
        );
      case 8:
        return (
          <Part8
            question={questions[currentQuestion]}
            onComplete={handleAnswerComplete}
          />
        );
    }
  };

    useEffect(() => {
    if (isTestCompleted || !questions || questions.length === 0) return;

    const speakingQuestionsCount = questions.filter(q => getSWPart(q.question_number) <= 5).length;
    const writingQuestionsCount = questions.filter(q => getSWPart(q.question_number) >= 6).length;

    // Log để kiểm tra điều kiện gọi onComplete cuối cùng
    // console.log(`[TestNavigator] Kiểm tra onComplete cuối cùng:
    //   Speaking: ${speakingRecordings.length}/${speakingQuestionsCount}
    //   Writing: ${writingAnswers.length}/${writingQuestionsCount}`);
    // if (writingAnswers.length > 0 && writingAnswers.length < writingQuestionsCount) {
    //    console.log("[TestNavigator] Nội dung writingAnswers hiện tại:", writingAnswers);
    // }

    if (speakingRecordings.length === speakingQuestionsCount &&
        writingAnswers.length === writingQuestionsCount) {
      onComplete({ speakingRecordings, writingAnswers });
      setIsTestCompleted(true);
    }
  }, [speakingRecordings, writingAnswers, questions, onComplete, isTestCompleted]);

  return (
    <div className="min-h-screen w-[80%] mx-auto bg-gray-50 py-4">
      {renderCurrentPart()}
    </div>
  );
}
