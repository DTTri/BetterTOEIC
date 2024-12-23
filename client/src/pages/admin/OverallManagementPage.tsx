import { sUser } from "@/store";
import sForum from "@/store/forumStore";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

export default function OverallManagementPage() {
  console.log("OverallManagementPage");
  const users = sUser.use((v) => v.users);
  const totalUsers = users.length;
  const getNewUsersPerMonth = (fromDate: string, toDate: string) => {
    return users.filter(
      (user) =>
        user.created_at.split("T")[0] >= fromDate &&
        user.created_at.split("T")[0] <= toDate
    ).length;
  };
  const newUsersPerMonthData = [
    {
      month: "January",
      newUsers: getNewUsersPerMonth("2024-01-01", "2024-01-31"),
    },
    {
      month: "February",
      newUsers: getNewUsersPerMonth("2024-02-01", "2024-02-29"),
    },
    {
      month: "March",
      newUsers: getNewUsersPerMonth("2024-03-01", "2024-03-31"),
    },
    {
      month: "April",
      newUsers: getNewUsersPerMonth("2024-04-01", "2024-04-30"),
    },
    {
      month: "May",
      newUsers: getNewUsersPerMonth("2024-05-01", "2024-05-31"),
    },
    {
      month: "June",
      newUsers: getNewUsersPerMonth("2024-06-01", "2024-06-30"),
    },
    {
      month: "July",
      newUsers: getNewUsersPerMonth("2024-07-01", "2024-07-31"),
    },
    {
      month: "August",
      newUsers: getNewUsersPerMonth("2024-08-01", "2024-08-31"),
    },
    {
      month: "September",
      newUsers: getNewUsersPerMonth("2024-09-01", "2024-09-30"),
    },
    {
      month: "October",
      newUsers: getNewUsersPerMonth("2024-10-01", "2024-10-31"),
    },
    {
      month: "November",
      newUsers: getNewUsersPerMonth("2024-11-01", "2024-11-30"),
    },
  ];
  const totalUsersPerBand: number[] = sUser.use((v) => v.usersPerBand);

  const averageScoreData = [
    {
      label: "10 - 215",
      value: Math.floor((totalUsersPerBand[0] / totalUsers) * 100),
      color: "#B3AA00",
    },
    {
      label: "220 - 465",
      value: Math.floor((totalUsersPerBand[1] / totalUsers) * 100),
      color: "#00871D",
    },
    {
      label: "470 - 725",
      value: Math.floor((totalUsersPerBand[2] / totalUsers) * 100),
      color: "#1CCF00",
    },
    {
      label: "730 - 855",
      value: Math.floor((totalUsersPerBand[3] / totalUsers) * 100),
      color: "#005F88",
    },
    {
      label: "860 - 990",
      value: Math.floor((totalUsersPerBand[4] / totalUsers) * 100),
      color: "#DDFF00",
    },
  ];
  const posts = sForum.use((v) => v.posts);
  const totalPostCreated = posts.length;
  const postsCreatedPerMonthData = [
    {
      month: "May",
      postCreated: posts.filter(
        (post) =>
          post.created_at.split("T")[0] >= "2024-05-01" &&
          post.created_at.split("T")[0] <= "2024-05-31"
      ).length,
    },
    {
      month: "June",
      postCreated: posts.filter(
        (post) =>
          post.created_at.split("T")[0] >= "2024-06-01" &&
          post.created_at.split("T")[0] <= "2024-06-30"
      ).length,
    },
    {
      month: "July",
      postCreated: posts.filter(
        (post) =>
          post.created_at.split("T")[0] >= "2024-07-01" &&
          post.created_at.split("T")[0] <= "2024-07-31"
      ).length,
    },
    {
      month: "August",
      postCreated: posts.filter(
        (post) =>
          post.created_at.split("T")[0] >= "2024-08-01" &&
          post.created_at.split("T")[0] <= "2024-08-31"
      ).length,
    },
    {
      month: "September",
      postCreated: posts.filter(
        (post) =>
          post.created_at.split("T")[0] >= "2024-09-01" &&
          post.created_at.split("T")[0] <= "2024-09-30"
      ).length,
    },
    {
      month: "October",
      postCreated: posts.filter(
        (post) =>
          post.created_at.split("T")[0] >= "2024-10-01" &&
          post.created_at.split("T")[0] <= "2024-10-31"
      ).length,
    },
    {
      month: "November",
      postCreated: posts.filter(
        (post) =>
          post.created_at.split("T")[0] >= "2024-11-01" &&
          post.created_at.split("T")[0] <= "2024-11-30"
      ).length,
    },
  ];

  return (
    <div className="w-full h-full flex flex-wrap justify-between">
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
            Total post created per month
          </p>
          <div className="bg-white px-2 py-1 text-base text-primary rounded-lg border border-gray-500">
            Total post created: {totalPostCreated}
          </div>
        </div>
        <div className="forum-info__chart w-full h-full bg-white rounded-2xl">
          <LineChart
            dataset={postsCreatedPerMonthData}
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
                  max: postsCreatedPerMonthData.reduce(
                    (max, { postCreated }) => Math.max(max, postCreated),
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
