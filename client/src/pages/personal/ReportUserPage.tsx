import { testStore } from "@/store/testStore";
import getAccuracyPerPart from "@/utils/CalculateAccuracyPerPart";
import getAverageCorrectAnswersPerPart from "@/utils/CalculateAverageCorrectAnswersPerPart";
import getTestScore from "@/utils/CalculateTestScore";
import { BarChart } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";

export default function ReportUserPage() {
  const completedTests = testStore.use((v) => v.testHistory);
  function getAverageScore(fromDate: string, toDate: string) {
    const scores = completedTests
      .filter(
        (test) =>
          test.attempted_at.split("T")[0] >= fromDate &&
          test.attempted_at.split("T")[0] <= toDate
      )
      .map((test) => getTestScore(test.correctAnswersPerPart));
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }
  const scorePerMonthData = [
    {
      month: "January",
      score: getAverageScore("2022-01-01", "2022-01-31"),
    },
    {
      month: "February",
      score: getAverageScore("2022-02-01", "2022-02-28"),
    },
    {
      month: "March",
      score: getAverageScore("2022-03-01", "2022-03-31"),
    },
    {
      month: "April",
      score: getAverageScore("2022-04-01", "2022-04-30"),
    },
    {
      month: "May",
      score: getAverageScore("2022-05-01", "2022-05-31"),
    },
    {
      month: "June",
      score: getAverageScore("2022-06-01", "2022-06-30"),
    },
    {
      month: "July",
      score: getAverageScore("2022-07-01", "2022-07-31"),
    },
  ];

  const accuracyPerPart = getAccuracyPerPart(
    getAverageCorrectAnswersPerPart(completedTests)
  );
  const averageScore = getTestScore(accuracyPerPart);
  const accuracyPerPartData = [
    { part: "Part 1", accuracy: accuracyPerPart[0] },
    { part: "Part 2", accuracy: accuracyPerPart[1] },
    { part: "Part 3", accuracy: accuracyPerPart[2] },
    { part: "Part 4", accuracy: accuracyPerPart[3] },
    { part: "Part 5", accuracy: accuracyPerPart[4] },
    { part: "Part 6", accuracy: accuracyPerPart[5] },
    { part: "Part 7", accuracy: accuracyPerPart[6] },
  ];

  return (
    <div className="w-full h-screen py-7 px-52">
      <h2 className="font-bold text-[#000] text-4xl text-center mb-4">
        Thông tin cá nhân
      </h2>
      <div className="chart flex flex-col">
        <div className="bg-[#fff] py-8 px-8 flex flex-col items-center gap-3">
          <div className="w-full flex flex-row items-center gap-4 ml-4">
            <h2 className="text-xl text-[#343C6A] font-semibold ">
              Biểu đồ kết quả thi:{" "}
            </h2>
            <span className="py-[3px] px-6 rounded-xl border-[1px] bg-[#FAFBFD]">
              Điểm trung bình: {averageScore}
            </span>
          </div>
          <div className="test-score w-full mb-4 ">
            <LineChart
              height={500}
              dataset={scorePerMonthData}
              xAxis={[{ dataKey: "month", scaleType: "point" }]}
              series={[
                {
                  type: "line",
                  dataKey: "score",
                  area: true,
                  color: "#1814F3",
                },
              ]}
              grid={{ vertical: true, horizontal: true }}
              yAxis={[
                {
                  colorMap: {
                    type: "continuous",
                    min: 0,
                    max: 990,
                    color: ["#2D60FF33", "#1814F3"],
                  },
                  min: 0,
                  max: 990,
                },
              ]}
            />
          </div>
          <div className="w-full flex flex-row items-center gap-4 ml-4">
            <h2 className="text-xl text-[#343C6A] font-semibold ">
              Tỷ lệ chính xác theo từng part (%):
            </h2>
          </div>
          <div className="part-accurac w-full ">
            <BarChart
              height={300}
              dataset={accuracyPerPartData}
              xAxis={[{ dataKey: "part", scaleType: "band" }]}
              yAxis={[{ dataKey: "accuracy", scaleType: "linear" }]}
              series={[
                {
                  type: "bar",
                  dataKey: "accuracy",
                  color: "#123",
                },
              ]}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
