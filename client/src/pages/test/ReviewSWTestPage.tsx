import { useMemo, useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore from "swiper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import { SWQuestion } from "@/entities";
import { useParams } from "react-router-dom";
import { sUser, swTestStore } from "@/store";
import { toast } from "react-toastify";

const questionGroups = [
  {
    isSpeaking: true,
    question: "Questions 1-2",
    questionNumbers: [1, 2],
  },
  {
    isSpeaking: true,
    question: "Questions 3-4",
    questionNumbers: [3, 4],
  },
  {
    isSpeaking: true,
    question: "Questions 5-7",
    questionNumbers: [5, 6, 7],
  },
  {
    isSpeaking: true,
    question: "Questions 8-10",
    questionNumbers: [8, 9, 10],
  },
  {
    isSpeaking: true,
    question: "Questions 11",
    questionNumbers: [11],
  },
  {
    isSpeaking: false,
    question: "Questions 12-16",
    questionNumbers: [12, 13, 14, 15, 16],
  },
  {
    isSpeaking: false,
    question: "Questions 17-18",
    questionNumbers: [17, 18],
  },
  {
    isSpeaking: false,
    question: "Questions 19",
    questionNumbers: [19],
  },
];

const ReviewNavItem = ({
  selected,
  isSpeaking,
  questions,
  onClick,
}: {
  selected: boolean;
  isSpeaking: boolean;
  questions: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="min-w-[200px] py-2 px-4 text-sm rounded-[12px] border
     hover:bg-gray-50 cursor-pointer
      "
      style={{
        borderColor: selected ? "#4880FF" : "#E5E5E5",
        boxShadow: selected ? "0px 0px 0px 1px #4880FF" : "none",
      }}
      onClick={onClick}
    >
      <p>
        {isSpeaking ? "Speaking" : "Writing"}:{" "}
        <span className="font-bold">{questions}</span>
      </p>
      <p className="text-gray-500">18 scores</p>
    </div>
  );
};

const scoreClassifications = [
  {
    min: 0,
    max: 5,
    classification: "Poor",
    content: "You need to improve your English skills",
    color: "#FF4D4F",
  },
  {
    min: 5,
    max: 10,
    classification: "Average",
    content: "You need to improve your English skills",
    color: "#FFA500",
  },
  {
    min: 10,
    max: 15,
    classification: "Good",
    content: "You need to improve your English skills",
    color: "#FFD700",
  },
  {
    min: 15,
    max: 20,
    classification: "Excellent",
    content: "You need to improve your English skills",
    color: "#008000",
  },
];

const speakText = (text: string, voices: SpeechSynthesisVoice[] = []) => {
  if (!("speechSynthesis" in window)) {
    toast.error(
      "Your browser doesn't support text to speech. Please try a different browser."
    );
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = 0.9;
  utterance.pitch = 1;

  const availableVoices =
    voices.length > 0 ? voices : window.speechSynthesis.getVoices();

  const englishVoice = availableVoices.find(
    (voice) =>
      voice.lang.includes("en") &&
      (voice.name.includes("Female") || voice.name.includes("Google"))
  );

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
};

const SWQuestionReview = ({
  question,
  answer,
  evaluation,
  sampleAnswer,
  score,
}: {
  question: SWQuestion;
  answer: string;
  evaluation: string;
  sampleAnswer: string;
  score: number;
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const availableVoices = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        availableVoices.current = voices;
      }

      const voicesChangedHandler = () => {
        availableVoices.current = window.speechSynthesis.getVoices();
      };

      window.speechSynthesis.addEventListener(
        "voiceschanged",
        voicesChangedHandler
      );

      return () => {
        window.speechSynthesis.removeEventListener(
          "voiceschanged",
          voicesChangedHandler
        );
      };
    }
  }, []);

  const classifyScore = useMemo(() => {
    const classification = scoreClassifications.find(
      (item) => score >= item.min && score <= item.max
    );
    console.log("Classify score: ", classification);
    return classification;
  }, [score]);

  const handlePlaySampleAnswer = () => {
    if (question.question_number < 12) {
      setIsSpeaking(true);
      speakText(sampleAnswer, availableVoices.current);

      const speechEndHandler = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.addEventListener("end", speechEndHandler);

      setTimeout(() => {
        window.speechSynthesis.removeEventListener("end", speechEndHandler);
        setIsSpeaking(false);
      }, 15000);
    }
  };
  return (
    <div className="w-full p-8 bg-white rounded-[16px] flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <p className="text-lg font-bold">
          Question {question.question_number}:
        </p>
        <div
          className="px-4 py-2 rounded-[16px] flex items-center gap-2"
          style={{
            backgroundColor: `${classifyScore?.color}10`,
          }}
        >
          <div className="relative w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              {/* Background circle */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={`${classifyScore?.color}20`}
                strokeWidth="3"
              />
              {/* Progress circle */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={classifyScore?.color}
                strokeWidth="3"
                strokeDasharray={`${(score / 20) * 100}, 100`}
                transform="rotate(0 18 18)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className={`text-[12px] font-bold ${classifyScore?.color}`}>
                {score}/20
              </p>
            </div>
          </div>
          <div className="">
            <p
              className={`text-[14px] font-bold text-[${classifyScore?.color}]`}
            >
              {classifyScore?.classification}
            </p>
            <p className="text-[14px] text-black">{classifyScore?.content}</p>
          </div>
        </div>
      </div>
      {[3, 4, 12, 13, 14, 15, 16].includes(question.question_number) ? (
        <div className="w-full flex flex-col items-center gap-2">
          <img
            src={question.image?.[0]}
            alt="question"
            className="w-[430px] h-auto object-cover"
          />
          {question.question_number > 11 && (
            <p className="text-[18px]">
              {question.text + " " + question.passage}
            </p>
          )}
        </div>
      ) : (
        <p className="text-[18px]">{question.text}</p>
      )}
      <div
        className={`w-full flex gap-4  ${
          question.question_number > 11 ? "flex-col" : "items-center"
        }`}
      >
        <p className="text-[20px] font-medium text-[#4880FF]">Your answer:</p>
        {question.question_number > 11 ? (
          <p className="text-[18px]">{answer}</p>
        ) : (
          <audio
            src={answer}
            controls
            className="[&::-webkit-media-controls-panel]:bg-white [&::-webkit-media-controls-current-time-display]:text-[#4880FF] [&::-webkit-media-controls-time-remaining-display]:text-[#4880FF] [&::-webkit-media-controls-mute-button]:text-[#4880FF] [&::-webkit-media-controls-volume-slider]:text-[#4880FF] [&::-webkit-media-controls-play-button]:text-[#4880FF] border border-black rounded-full p-1"
          />
        )}
      </div>
      <Accordion type="single" collapsible className="w-full" defaultValue="3">
        <AccordionItem
          value={question.question_number.toString()}
          className="has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-[16px] border border-[#BCFFE3] px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
        >
          <AccordionPrimitive.Header className="flex ">
            <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-0 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
              <p className="text-[#007142] text-[20px] font-medium">
                AI evaluation
              </p>
              <PlusIcon
                size={16}
                className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="text-muted-foreground pb-2 flex flex-col gap-2">
            <p className="text-[18px]">{evaluation}</p>
            <div className="flex items-center gap-2">
              <p className="text-[18px] text-[#007142] font-medium">
                Sample answer:
              </p>
              {question.question_number < 12 && (
                <button
                  onClick={handlePlaySampleAnswer}
                  disabled={isSpeaking}
                  className={`flex items-center gap-2 bg-[#007142] text-white px-3 py-1 rounded-md hover:bg-[#005a33] transition-colors ${
                    isSpeaking ? "opacity-70" : ""
                  }`}
                >
                  <Volume2 size={18} />
                  {isSpeaking ? "Speaking..." : "Play Sample Answer"}
                </button>
              )}
            </div>
            <p className="text-[18px]">{sampleAnswer}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default function ReviewSWTestPage() {
  const { testId, attemptId } = useParams();
  const userId = sUser.use((state) => state.info._id);
  console.log(testId, attemptId, userId);
  const [currentQuestions, setCurrentQuestions] = useState<number[]>([1, 2]);
  const test = swTestStore
    .use((state) => state.swTestList)
    .find((test) => test._id === testId);
  const completedTest = swTestStore
    .use((state) => state.swTestHistory)
    .find((test) => test.testId === testId && test.attemptId === attemptId);
  console.log(test);
  console.log(completedTest);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  if (!completedTest || !test) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Test data not found or failed to load</p>
      </div>
    );
  }

  return (
    <div className="px-20 pt-8 pb-[100px]">
      <div className="fixed left-0 bottom-0 w-full bg-white px-8 z-10">
        <div className="relative">
          <button
            onClick={handlePrev}
            className=" absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            className=" absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Navigation]}
            slidesPerView={5}
            spaceBetween={10}
            style={{
              padding: "12px 0",
            }}
          >
            {questionGroups.map((item, index) => (
              <SwiperSlide key={index}>
                <ReviewNavItem
                  selected={item.questionNumbers.includes(currentQuestions[0])}
                  isSpeaking={item.isSpeaking}
                  questions={item.question}
                  onClick={() => setCurrentQuestions(item.questionNumbers)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        {(currentQuestions.includes(5) || currentQuestions.includes(8)) && (
          <div className="w-full bg-white rounded-[16px] p-4">
            {currentQuestions.includes(5) && test.questions && (
              <p>{test.questions[4]?.passage}</p>
            )}
            {currentQuestions.includes(8) && test.questions && (
              <img
                src={test.questions[7]?.image?.[0]}
                alt="question"
                className="w-[430px] h-auto object-cover"
              />
            )}
          </div>
        )}
        {currentQuestions.map((questionNumber) => (
          <SWQuestionReview
            key={questionNumber}
            question={test.questions?.[questionNumber - 1]}
            answer={completedTest.answers?.[questionNumber - 1]}
            evaluation={completedTest.evaluations?.[questionNumber - 1]}
            sampleAnswer={completedTest.sampleAnswers?.[questionNumber - 1]}
            score={completedTest.scores?.[questionNumber - 1]}
          />
        ))}
      </div>
    </div>
  );
}
