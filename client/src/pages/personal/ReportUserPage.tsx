import { BarChart } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";
import React, { useState, useRef } from "react";

export default function ReportUserPage() {
  const averageSocre = 800;
  const scorePerMonthData = [
    {
      month: "January",
      score: 650,
    },
    {
      month: "February",
      score: 600,
    },
    {
      month: "March",
      score: 750,
    },
    {
      month: "April",
      score: 800,
    },
    {
      month: "May",
      score: 830,
    },
    {
      month: "June",
      score: 900,
    },
    {
      month: "July",
      score: 910,
    },
  ];
  const accuracyPerPartData = [
    { part: "Part 1", accuracy: 50 },
    { part: "Part 2", accuracy: 60 },
    { part: "Part 3", accuracy: 70 },
    { part: "Part 4", accuracy: 80 },
    { part: "Part 5", accuracy: 90 },
    { part: "Part 6", accuracy: 95 },
    { part: "Part 7", accuracy: 100 },
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
              Điểm trung bình: {averageSocre}
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
                yAxis={[{ dataKey: "accuracy" , scaleType: "linear"}]}
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
