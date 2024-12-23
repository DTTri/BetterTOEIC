import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { practiceStore } from "@/store/practiceStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function PracticeManagementPage() {
  const nav = useNavigate();
  const [isTestList, setIsTestList] = useState(true);
  const practiceTestList = practiceStore.use((v) => v.practiceTestList);
  const practiceLessonList = practiceStore.use((v) => v.practiceLesson);
  const testRows = practiceTestList.map((ex, index) => ({
    ...ex,
    index: index + 1,
    questions: ex.questions.length,
    updated_at: ex.updated_at
      .toString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/"),
    created_at: ex.created_at
      .toString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/"),
  }));
  const testColumns: GridColDef[] = [
    {
      field: "index",
      headerName: "#",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "part",
      headerName: "PART",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "questions",
      headerName: "QUESTIONS",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updated_at",
      headerName: "UPDATED AT",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "edit",
      type: "actions",
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeEditOutlineIcon />}
          label="Edit"
          onClick={() => console.log("Edit", params.row)}
        />,
      ],
    },
  ];

  const lessonRows = practiceLessonList.map((ex, index) => ({
    ...ex,
    index: index + 1,
    updated_at: ex.updated_at.split("T")[0].split("-").reverse().join("/"),
    created_at: ex.created_at.split("T")[0].split("-").reverse().join("/"),
  }));
  // type PracticeLesson = {
  //   _id: string;
  //   part: number;
  //   title: string;
  //   content: string;
  //   created_by: string;
  //   created_at: string;
  //   updated_at: string;
  // };
  const lessonColumns: GridColDef[] = [
    {
      field: "index",
      headerName: "#",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "part",
      headerName: "PART",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "TITLE",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updated_at",
      headerName: "UPDATED AT",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "edit",
      type: "actions",
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeEditOutlineIcon />}
          label="Edit"
          onClick={() => console.log("Edit", params.row)}
        />,
      ],
    },
  ];
  return (
    <>
      <div className="header flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">
          {isTestList ? "Practice Exercises List" : "Lessons List"}
        </h2>
        <Button
          variant="contained"
          onClick={() => setIsTestList(!isTestList)}
          className="text-white"
        >
          {isTestList ? "Lessons" : "Practice Tests"}
        </Button>
      </div>
      <div className="admin-table-container">
        <ThemeProvider theme={adminTableTheme}>
          <DataGrid
            className="admin-table"
            rows={isTestList ? testRows : lessonRows}
            columns={isTestList ? testColumns : lessonColumns}
            rowHeight={50}
            getRowId={(row) => row._id} // Specify custom id for each row
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 6,
                },
              },
            }}
            pageSizeOptions={
              isTestList ? [6, testRows.length] : [6, lessonRows.length + 1]
            }
            slots={{ toolbar: GridToolbar }}
            rowSelection={false}
          />
        </ThemeProvider>
      </div>
      <div className="buttons flex gap-2 justify-end">
        <Button
          variant="contained"
          onClick={() => {
            nav("creatingPracticeEx");
          }}
        >
          Create exercise
        </Button>
      </div>
    </>
  );
}
