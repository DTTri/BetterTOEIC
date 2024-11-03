import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

export default function OverallManagementPage() {
  const totalUsers = 10000;
  const newUsersPerMonthData = [
    {
      month: "January",
      newUsers: 100,
    },
    {
      month: "February",
      newUsers: 120,
    },
    {
      month: "March",
      newUsers: 400,
    },
    {
      month: "April",
      newUsers: 350,
    },
    {
      month: "May",
      newUsers: 420,
    },
    {
      month: "June",
      newUsers: 600,
    },
    {
      month: "July",
      newUsers: 550,
    },
  ];
  const averageScoreData = [
    {
      label: "10 - 215",
      value: 5,
      color: "#B3AA00",
    },
    {
      label: "220 - 465",
      value: 15,
      color: "#00871D",
    },
    {
      label: "470 - 725",
      value: 40,
      color: "#1CCF00",
    },
    {
      label: "730 - 855",
      value: 30,
      color: "#005F88",
    },
    {
      label: "860 - 990",
      value: 10,
      color: "#DDFF00",
    },
  ];
  const totalPostAccess = 2000;
  const postsAccessPerMonthData = [
    {
      month: "January",
      postAccess: 50,
    },
    {
      month: "February",
      postAccess: 80,
    },
    {
      month: "March",
      postAccess: 60,
    },
    {
      month: "April",
      postAccess: 200,
    },
    {
      month: "May",
      postAccess: 250,
    },
    {
      month: "June",
      postAccess: 500,
    },
    {
      month: "July",
      postAccess: 450,
    },
  ];

  return (
    <div className="w-full max-h-screen rounded-xl overflow-hidden p-4 flex flex-wrap justify-between h-screen bg-background">
      {/* TODO: make this reponsive when screen size is small, adjust the this flex */}
      <div className="new-users-info basis-full h-[45vh] flex flex-col gap-2">
        <div className="new-users-info__header flex items-center gap-2">
          <p className="text-xl font-bold text-primary">New users per month</p>
          <div className="bg-white px-2 py-1 text-base text-primary rounded-lg border border-gray-500">
            Total users: {totalUsers}
          </div>
        </div>
        <div className="new-users-info__chart w-full h-full bg-white rounded-2xl">
          <LineChart
            dataset={newUsersPerMonthData}
            xAxis={[{ dataKey: "month", scaleType: "point" }]}
            series={[
              {
                type: "line",
                dataKey: "newUsers",
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
                  max: newUsersPerMonthData.reduce(
                    (max, { newUsers }) => Math.max(max, newUsers),
                    0
                  ),
                  color: ["#2D60FF33", "#1814F3"],
                },
              },
            ]}
          />
        </div>
      </div>
      <div className="average-score basis-1/3 h-[42vh] flex flex-col gap-2">
        <div className="average-score__header">
          <p className="text-xl font-bold text-primary">User's band</p>
        </div>
        <div className="average-score__chart w-full h-full bg-white rounded-2xl p-2">
          <PieChart
            series={[
              {
                data: averageScoreData,
              },
            ]}
          />
        </div>
      </div>
      <div className="forum-infor basis-[65%] h-[42vh] flex flex-col gap-2">
        <div className="forum-info__header flex items-center gap-2">
          <p className="text-xl font-bold text-primary">
            Total post access per month
          </p>
          <div className="bg-white px-2 py-1 text-base text-primary rounded-lg border border-gray-500">
            Total post access: {totalPostAccess}
          </div>
        </div>
        <div className="forum-info__chart w-full h-full bg-white rounded-2xl">
          <LineChart
            dataset={postsAccessPerMonthData}
            xAxis={[{ dataKey: "month", scaleType: "point" }]}
            series={[
              {
                type: "line",
                dataKey: "postAccess",
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
                  max: postsAccessPerMonthData.reduce(
                    (max, { postAccess }) => Math.max(max, postAccess),
                    0
                  ),
                  color: ["#2D60FF33", "#1814F3"],
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
