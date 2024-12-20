import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
// Import components
import {
  Steps,
  BuildRoadmapProgressBar,
  LevelChart,
  LevelExplain,
} from "../../components";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { sCreatingPersonalRoadmap, sRoadmap, sUser } from "@/store";
import { roadmapService } from "@/services";
import { RoadmapExercise, RoadmapHistory } from "@/entities";
import { testStore } from "@/store/testStore";
export default function CreatingRoadmapPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completeCreatingRoadmap, setCompleteCreatingRoadmap] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const nav = useNavigate();
  const evaluationTestScore = sCreatingPersonalRoadmap.use(
    (v) => v.evaluationTestScore
  );
  sCreatingPersonalRoadmap.watch((newValue) => {
    console.log("sCreatingPersonalRoadmap: " + newValue);
    if (newValue.targetLevel <= newValue.startLevel) {
      alert("Mục tiêu không thể thấp hơn trình độ hiện tại");
      newValue.targetLevel = newValue.startLevel + 1;
    }
  });
  useEffect(() => {
    if (sCreatingPersonalRoadmap.value.evaluationTestScore !== -1) {
      swiperInstance?.slideTo(2);
    }
  }, [evaluationTestScore, swiperInstance]);

  const handleNextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleSlideTo = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const handleCreatingRoadmap = async () => {
    try {
      const start_level = sCreatingPersonalRoadmap.value.startLevel;
      const target_level = sCreatingPersonalRoadmap.value.targetLevel;
      const res = await roadmapService.createPersonalRoadmap({
        start_level,
        target_level,
        userId: sUser.value.info._id,
        current_level: sCreatingPersonalRoadmap.value.startLevel,
      });
      if (res.EC === 0) {
        console.log("Create roadmap success: " + res.DT);
        sRoadmap.set(
          (pre) => (pre.value.userRoadmap = res.DT as RoadmapHistory)
        );
        const fetchRoadmapExercisesResponse =
          await roadmapService.getRoadmapExercisesByPhase(start_level);
        if (fetchRoadmapExercisesResponse.EC === 0) {
          sRoadmap.set(
            (pre) =>
              (pre.value.exercises =
                fetchRoadmapExercisesResponse.DT as RoadmapExercise[])
          );
          console.log(
            "fetch roadmap exercises",
            fetchRoadmapExercisesResponse.DT
          );
        } else {
          console.log(fetchRoadmapExercisesResponse.EM);
        }
      } else {
        console.log("Fetch failed: " + res.EM);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDoTestEvaluation = () => {
    const tests = testStore.value.testList;
    // random get a mini test
    const randomIndex = Math.floor(Math.random() * tests.length);
    const randomMiniTest = tests[randomIndex];
    nav(`/taking-test/${randomMiniTest._id}/evaluation`);
  };

  return (
    <div className="bg-background flex flex-col gap-4 items-center py-4 px-12 w-full h-screen">
      <Steps currentStep={currentStep} />
      <div className="container w-full h-full bg-white rounded-lg shadow-lg p-8 pb-2 mb-8 relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={(swiper) => setCurrentStep(swiper.activeIndex)}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          className="w-full h-full mb-12"
        >
          <SwiperSlide className="step-1.1 flex flex-col items-center gap-6">
            <h3 className="text-3xl font-bold text-center">
              {/* THIẾT LẬP TRÌNH ĐỘ HIỆN TẠI */}
              SET YOUR CURRENT LEVEL
            </h3>
            <img className="h-56" src="/src/assets/geotag.png" alt="geotag" />
            <p className="text-xl font-bold text-center">
              {/* Để có được một lộ trình đúng đắn và cụ thể, hãy cho chúng tôi biết
              trình độ hiện tại của bạn! */}
              To have an accurate and specific roadmap, let us know your current
              level!
            </p>
            <div className="buttons-container flex gap-4 mt-4">
              <button
                className="manual bg-white text-black text-lg px-3 py-2 border border-secondary rounded-md"
                onClick={() => handleSlideTo(1)}
              >
                {/* Thiết lập trình độ */}
                Set level
              </button>
              <button
                className="taking-test bg-secondary text-white text-lg px-3 py-2 rounded-md"
                onClick={handleDoTestEvaluation}
              >
                {/* Làm bài kiểm tra */}
                Do test
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="step-1.2 flex flex-col gap-4">
            <h3 className="text-3xl font-bold">
              {/*ThIẾT LẬP TRÌNH ĐỘ HIỆN TẠI */}
              SET YOUR CURRENT LEVEL
            </h3>
            <div className="level-chart-container w-3/4 mx-auto">
              <LevelChart isStartChart={true} />
            </div>
            <div className="level-explain-container w-3/4 mx-auto">
              <LevelExplain isStartLevel={true} />
            </div>
            <div className="buttons-container absolute bottom-2 w-full flex justify-between items-center">
              <button
                className="prev-slide bg-white text-black text-lg px-3 py-2 border border-secondary rounded-md"
                onClick={handlePrevSlide}
              >
                Back
              </button>
              <button
                className="next-slide bg-secondary text-white text-lg px-3 py-2 rounded-md"
                onClick={handleNextSlide}
              >
                Next
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="step-2 flex flex-col gap-4">
            <h3 className=" text-3xl font-bold">
              {/* THIẾT LẬP MỤC TIÊU */}
              SET YOUR TARGET LEVEL
            </h3>
            <div className="level-chart-container w-3/4 mx-auto">
              <LevelChart isStartChart={false} />
            </div>
            <div className="level-explain-container w-3/4 mx-auto">
              <LevelExplain isStartLevel={false} />
            </div>
            <div className="buttons-container absolute bottom-2 w-full flex justify-between items-center mt-4">
              <button
                className="prev-slide bg-white text-black text-lg px-3 py-2 border border-secondary rounded-md"
                onClick={handlePrevSlide}
              >
                Back
              </button>
              <button
                className="next-slide bg-secondary text-white text-lg px-3 py-2 rounded-md"
                onClick={() => {
                  handleCreatingRoadmap();
                  handleNextSlide();
                }}
              >
                Create roadmap
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="step-3 flex flex-col gap-8">
            <h3 className="text-3xl font-bold">
              {/* XÂY DỰNG LỘ TRÌNH HỌC */}
              BUILDING YOUR ROADMAP
            </h3>
            {currentStep === 3 && (
              <>
                <BuildRoadmapProgressBar
                  onComplete={() => setCompleteCreatingRoadmap(true)}
                />
                {completeCreatingRoadmap && (
                  <p className="text-xl font-semibold text-center">
                    {/* Lộ trình học tập cá nhân hóa của bạn đã được khởi tạo thành
                    công. Hãy bắt đầu tham gia lộ trình để đạt được số điểm
                    TOEIC mong muốn! */}
                    Your personalized learning roadmap has been successfully set
                    up. Let's start the journey to achieve your desired TOEIC
                    score!
                  </p>
                )}
              </>
            )}
            <div className="buttons-container absolute bottom-2 w-full flex justify-end items-center mt-4">
              {completeCreatingRoadmap && (
                <button className="end-swiper bg-secondary text-white text-lg px-3 py-2 rounded-md">
                  <Link to="/road-map">Start</Link>
                </button>
              )}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
