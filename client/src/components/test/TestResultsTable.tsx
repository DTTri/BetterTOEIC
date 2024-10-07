// This is just a stub code (mock code)
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
export default function TestResultsTable() {
  const data = [
    {
      date: "01/10/2024",
      totalTime: "01:50:25",
      correctAnswers: 185,
      result: 880,
    },
    {
      date: "01/10/2024",
      totalTime: "01:50:25",
      correctAnswers: 185,
      result: 880,
    },
    {
      date: "01/10/2024",
      totalTime: "01:50:25",
      correctAnswers: 185,
      result: 880,
    },
    {
      date: "01/10/2024",
      totalTime: "01:50:25",
      correctAnswers: 185,
      result: 880,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-primary text-white">
        <thead>
          <tr className="uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left border border-white">
              Ngày làm
            </th>
            <th className="py-3 px-6 text-left border border-white">
              Thời gian làm bài
            </th>
            <th className="py-3 px-6 text-left border border-white">
              Số câu đúng
            </th>
            <th className="py-3 px-6 text-left border border-white">Kết quả</th>
            <th className="py-3 px-6 text-left border border-white"></th>
          </tr>
        </thead>
        <tbody className="text-sm font-light">
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 ">
              <td className="py-3 px-6 text-center whitespace-nowrap border border-white">
                {item.date}
              </td>
              <td className="py-3 px-6 text-center border border-white">
                {item.totalTime}
              </td>
              <td className="py-3 px-6 text-center border border-white">
                {item.correctAnswers}
              </td>
              <td className="py-3 px-6 text-center border border-white">
                {item.result}
              </td>
              <td className="py-3 px-6 text-center border border-white">
                <button>
                  <RemoveRedEyeIcon color="primary" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
