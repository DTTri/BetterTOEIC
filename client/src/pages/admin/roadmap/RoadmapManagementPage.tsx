import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import DeleteIcon from "@mui/icons-material/Delete";
import { sRoadmap } from "@/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { roadmapService } from "@/services";
import { toast } from "react-toastify";
export default function RoadmapManagementPage() {
  const nav = useNavigate();
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState<boolean>(false);
  const [selectedRoadmapExercise, setSelectedRoadmapExercise] =
    useState<string>("");
  const columns: GridColDef[] = [
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
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phase",
      headerName: "PHASE",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "part",
      headerName: "PART",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "chapter",
      headerName: "CHAPTER",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "questions",
      headerName: "QUESTIONS",
      flex: 0.5,
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
      flex: 0.5,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            setSelectedRoadmapExercise(params.row._id);
            setIsConfirmPopupOpen(true);
          }}
        />,
      ],
    },
  ];
  const roadmapExercises = sRoadmap.use((v) => v.exercises);
  const rows = roadmapExercises.map((exercise, index) => {
    return {
      index: index + 1,
      _id: exercise._id,
      phase: exercise.phase,
      part: exercise.part,
      chapter: exercise.chapter,
      questions: exercise.questions.length,
      created_at: exercise.created_at
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/"),

      updated_at: exercise.updated_at
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/"),
    };
  });

  const handleDeleteChapter = async () => {
    try {
      const res = await roadmapService.deleteRoadmapExercise(
        selectedRoadmapExercise
      );
      setIsConfirmPopupOpen(false);
      if (res.EC === 0) {
        const newRoadmapExercises = roadmapExercises.filter(
          (exercise) => exercise._id !== selectedRoadmapExercise
        );
        sRoadmap.set((pre) => (pre.value.exercises = newRoadmapExercises));
        toast.success("Chapter deleted successfully");
      } else {
        console.log(res.EM);
        toast.error("Failed to delete chapter");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete chapter");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-black">Roadmap Chapters List</h2>
      <div className="admin-table-container">
        <ThemeProvider theme={adminTableTheme}>
          <DataGrid
            className="admin-table"
            rows={rows}
            columns={columns}
            rowHeight={50}
            getRowId={(row) => row._id} // Specify custom id for each row
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 7,
                },
              },
            }}
            pageSizeOptions={
              rows.length < 7 ? [7, rows.length] : [7, rows.length + 1]
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
            nav("/admin/roadmap/creatingRoadmapEx");
          }}
        >
          Create Chapter
        </Button>
      </div>
      {isConfirmPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-4 w-1/3">
            <h2 className="text-xl font-bold mb-4 text-center">
              Are you sure you want to delete this chapter?
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
                onClick={handleDeleteChapter}
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
