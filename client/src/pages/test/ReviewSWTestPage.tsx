import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

type SWQuestion = {
  question_number: number;
  text?: string;
  image?: string;
  keywords?: string[]; // for describing image
  groupImages?: string[];
  groupText?: string;
};

type SWTest = {
  title: string;
  description: string;
  questions: SWQuestion[];
};
type CompletedTest = {
  // arrays have same length - 19 (11 speaking + 8 writing)
  answers: string[]; // 11 first elements are audio url, the rest are text
  evaluations: string[]; // all text
  sampleAnswers: string[]; // AI sample answers - audio url
  scores: number[]; // scores for each question
};
const sampleSWTest: SWTest = {
  title: "Sample SW Test",
  description: "This is a sample SW test",
  questions: [
    {
      question_number: 1,
      text: "Hi. This is Myra Peters calling about my appointment with Dr. Jones. I have a three o'clock appointment scheduled for this afternoon. Unfortunately, I won't be able to keep it because of an important meeting at work. So, I'll need to reschedule. I was hoping to come in sometime next week. Any time Monday, Tuesday, or Wednesday afternoon would work for me. I hope the doctor has some time available on one of those days. Please call me back and let me know.",
    },
    {
      question_number: 2,
      text: "Hi. This is Myra Peters calling about my appointment with Dr. Jones. I have a three o'clock appointment scheduled for this afternoon. Unfortunately, I won't be able to keep it because of an important meeting at work. So, I'll need to reschedule. I was hoping to come in sometime next week. Any time Monday, Tuesday, or Wednesday afternoon would work for me. I hope the doctor has some time available on one of those days. Please call me back and let me know.",
    },
    {
      question_number: 3,
      image:
        "https://media.zim.vn/648002b59951e9bad7675cf3/toeic-speaking-describe-a-picture-samples-2.jpeg",
    },
    {
      question_number: 4,
      image:
        "https://media.zim.vn/648002b59951e9bad7675cf3/toeic-speaking-describe-a-picture-samples-2.jpeg",
    },
    {
      question_number: 5,
      text: "What sports do you like?",
      groupText:
        "Imagine that a research firm is doing a telephone survey of people in your city You have agreed to answer some questions about sports.",
    },
    {
      question_number: 6,
      text: "What sports do you like?",
    },
    {
      question_number: 7,
      text: "What sports do you like?",
    },
    {
      question_number: 8,
      groupImages: [
        "https://media.zim.vn/648002b59951e9bad7675cf3/toeic-speaking-describe-a-picture-samples-2.jpeg",
      ],
      text: "What time is the meeting?",
    },
    {
      question_number: 9,
      groupImages: [
        "https://media.zim.vn/648002b59951e9bad7675cf3/toeic-speaking-describe-a-picture-samples-2.jpeg",
      ],
      text: "What time is the meeting?",
    },
    {
      question_number: 10,
      groupImages: [
        "https://media.zim.vn/648002b59951e9bad7675cf3/toeic-speaking-describe-a-picture-samples-2.jpeg",
      ],
      text: "What time is the meeting?",
    },
    {
      question_number: 11,
      text: "Many people prefer driving their own cars, while others would rather use public transportation. Which do you prefer? Explain why.",
    },
    {
      question_number: 12,
      image:
        "https://media.zim.vn/648002b59951e9bad7675cf3/toeic-speaking-describe-a-picture-samples-2.jpeg",
      keywords: ["car", "public transportation"],
    },
    {
      question_number: 13,
      image:
        "https://media.zim.vn/648002b59951e9bad7675cf3/toeic-speaking-describe-a-picture-samples-2.jpeg",
      keywords: ["car", "public transportation"],
    },
    {
      question_number: 14,
      image:
        "https://media.zim.vn/648002b59951e9bad7675cf3/toeic-speaking-describe-a-picture-samples-2.jpeg",
      keywords: ["car", "public transportation"],
    },
    {
      question_number: 15,
      image:
        "https://media.zim.vn/648002b59951e9bad7675cf3/toeic-speaking-describe-a-picture-samples-2.jpeg",
      keywords: ["car", "public transportation"],
    },
    {
      question_number: 16,
      image:
        "https://media.zim.vn/648002b59951e9bad7675cf3/toeic-speaking-describe-a-picture-samples-2.jpeg",
      keywords: ["car", "public transportation"],
    },
    {
      question_number: 17,
      text: "An email",
    },
    {
      question_number: 18,
      text: "An email",
    },
    {
      question_number: 19,
      text: "Do you agree or disagree with the following statement? It is more important to work at a job you enjoy than to make a lot of money. Support your answer with specific reasons and examples.",
    },
  ],
};

const sampleCompletedTest: CompletedTest = {
  answers: [
    // Speaking answers (audio URLs)
    "https://storage.googleapis.com/bettertoeic/audio/answer1.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/answer2.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/answer3.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/answer4.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/answer5.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/answer6.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/answer7.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/answer8.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/answer9.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/answer10.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/answer11.mp3",
    // Writing answers (text)
    "The meeting is scheduled for 2 PM in the main conference room. All department heads are required to attend.",
    "The project deadline has been extended to next Friday due to unexpected technical challenges.",
    "I recommend implementing a new training program to improve employee productivity.",
    "The company should invest in renewable energy sources to reduce carbon emissions.",
    "The marketing strategy needs to be revised to target younger demographics.",
    "The new software system will streamline our workflow and increase efficiency.",
    "The budget proposal includes provisions for staff training and development.",
    "The quarterly report shows significant growth in our overseas markets.",
  ],
  evaluations: [
    // Speaking evaluations
    "Good pronunciation and clear delivery. However, could improve on using more complex vocabulary.",
    "Excellent fluency and natural intonation. Good use of appropriate business language.",
    "Clear description of the image with good use of present continuous tense.",
    "Well-structured response with good use of spatial language.",
    "Good response to the survey question with appropriate examples.",
    "Clear and concise answer with good use of supporting details.",
    "Natural response with good use of conversational language.",
    "Good description of the schedule with clear time references.",
    "Well-organized response with good use of sequence words.",
    "Clear explanation of the process with appropriate technical terms.",
    "Excellent opinion response with strong supporting arguments.",
    // Writing evaluations
    "Well-structured email with clear purpose and appropriate tone.",
    "Good use of business language and proper formatting.",
    "Clear recommendations with supporting evidence.",
    "Strong argument with good use of persuasive language.",
    "Well-organized proposal with clear objectives.",
    "Good use of technical terms and clear explanations.",
    "Professional report format with comprehensive data analysis.",
    "Clear market analysis with good use of business terminology.",
  ],
  sampleAnswers: [
    // Speaking sample answers (audio URLs)
    "https://storage.googleapis.com/bettertoeic/audio/sample1.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/sample2.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/sample3.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/sample4.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/sample5.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/sample6.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/sample7.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/sample8.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/sample9.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/sample10.mp3",
    "https://storage.googleapis.com/bettertoeic/audio/sample11.mp3",
    // Writing sample answers (text)
    "The meeting will be held at 2:00 PM in the main conference room. All department heads must attend.",
    "Due to technical issues, the project deadline has been extended to next Friday.",
    "I suggest implementing a comprehensive training program to enhance employee productivity.",
    "To reduce our carbon footprint, the company should transition to renewable energy sources.",
    "Our marketing strategy should be updated to better reach younger consumers.",
    "The new software system promises to optimize our workflow and boost efficiency.",
    "The proposed budget includes funding for staff training and professional development.",
    "Our quarterly report indicates substantial growth in international markets.",
  ],
  scores: [
    // Speaking scores
    18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18,
    // Writing scores
    18, 18, 18, 18, 18, 18, 18, 18,
  ],
};

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
  const classifyScore = useMemo(() => {
    const classification = scoreClassifications.find(
      (item) => score >= item.min && score <= item.max
    );
    console.log("Classify score: ", classification);
    return classification;
  }, [score]);
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
            src={question.image}
            alt="question"
            className="w-[430px] h-auto object-cover"
          />
          {question.question_number > 11 && (
            <p className="text-[18px]">{question.keywords?.join(", ")}</p>
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
                <audio
                  src={sampleAnswer}
                  controls
                  className="w-1/3 [&::-webkit-media-controls-panel]:bg-white [&::-webkit-media-controls-current-time-display]:text-[#007142] [&::-webkit-media-controls-time-remaining-display]:text-[#007142] [&::-webkit-media-controls-mute-button]:text-[#007142] [&::-webkit-media-controls-volume-slider]:text-[#007142] [&::-webkit-media-controls-play-button]:text-[#007142] border border-black rounded-full h-[40px]"
                />
              )}
            </div>
            {/* sampleAnswer speech to text */}
            {question.question_number > 2 && (
              <p className="text-[18px]">{sampleAnswer}</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default function ReviewSWTestPage() {
  const [currentQuestions, setCurrentQuestions] = useState<number[]>([1, 2]);

  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };
  const handleNext = () => {
    swiperInstance?.slideNext();
  };

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
            {currentQuestions.includes(5) && (
              <p>{sampleSWTest.questions[4].groupText}</p>
            )}
            {currentQuestions.includes(8) && (
              <img
                src={sampleSWTest.questions[7].groupImages?.[0]}
                alt="question"
                className="w-[430px] h-auto object-cover"
              />
            )}
          </div>
        )}
        {currentQuestions.map((questionNumber) => (
          <SWQuestionReview
            key={questionNumber}
            question={sampleSWTest.questions[questionNumber - 1]}
            answer={sampleCompletedTest.answers[questionNumber - 1]}
            evaluation={sampleCompletedTest.evaluations[questionNumber - 1]}
            sampleAnswer={sampleCompletedTest.sampleAnswers[questionNumber - 1]}
            score={sampleCompletedTest.scores[questionNumber - 1]}
          />
        ))}
      </div>
    </div>
  );
}
