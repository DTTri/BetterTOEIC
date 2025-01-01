import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import DeleteIcon from "@mui/icons-material/Delete";
import { practiceStore } from "@/store/practiceStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import practiceService from "@/services/practiceService";
import { toast } from "react-toastify";
export default function PracticeManagementPage() {
  const nav = useNavigate();
  const [isTestList, setIsTestList] = useState(true);
  const practiceTestList = practiceStore.use((v) => v.practiceTestList);
  const practiceLessonList = practiceStore.use((v) => v.practiceLesson);
  const [selectedTestId, setSelectedTestId] = useState<string>("");
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState<boolean>(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [isConfirmLessonPopupOpen, setIsConfirmLessonPopupOpen] =
    useState<boolean>(false);
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
      field: "delete",
      type: "actions",
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            console.log(params.row);
            setSelectedTestId(params.id as string);
            setIsConfirmPopupOpen(true);
          }}
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
      field: "delete",
      type: "actions",
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            setSelectedLessonId(params.id as string);
            setIsConfirmLessonPopupOpen(true);
          }}
        />,
      ],
    },
  ];

  const handleDeletePracticeTest = async () => {
    try {
      const res = await practiceService.deletePraticeTest(selectedTestId);
      setIsConfirmPopupOpen(false);
      if (res.EC === 0) {
        const newTestList = practiceTestList.filter(
          (test) => test._id !== selectedTestId
        );
        practiceStore.set((pre) => (pre.value.practiceTestList = newTestList));
        toast.success("Practice Test deleted successfully");
      } else {
        toast.error("Failed to delete Practice Test");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete Practice Test");
    }
  };

  const handleDeletePracticeLesson = async () => {
    try {
      const res = await practiceService.deletePraticeLesson(selectedLessonId);
      setIsConfirmLessonPopupOpen(false);
      if (res.EC === 0) {
        const newLessonList = practiceLessonList.filter(
          (lesson) => lesson._id !== selectedLessonId
        );
        practiceStore.set((pre) => (pre.value.practiceLesson = newLessonList));
        toast.success("Practice Lesson deleted successfully");
      } else {
        toast.error("Failed to delete Practice Lesson");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete Practice Lesson");
    }
  };
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
            if (isTestList) nav("creatingPracticeEx");
            else nav("creatingPracticeLesson");
          }}
        >
          {isTestList ? "Create Practice Test" : "Create Lesson"}
        </Button>
      </div>
      {isConfirmPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-4 w-1/3 flex flex-col items-center gap-2">
            <h2 className="text-xl font-bold text-center">
              Are you sure you want to delete this topic?
            </h2>
            <div className="flex gap-4 justify-center">
              <Button
                variant="contained"
                onClick={() => {
                  setIsConfirmPopupOpen(false);
                }}
              >
                No
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeletePracticeTest}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
      {isConfirmLessonPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-4 w-1/3 flex flex-col items-center gap-2">
            <h2 className="text-xl font-bold text-center">
              Are you sure you want to delete this lesson?
            </h2>
            <div className="flex gap-4 justify-center">
              <Button
                variant="contained"
                onClick={() => {
                  setIsConfirmLessonPopupOpen(false);
                }}
              >
                No
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeletePracticeLesson}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
