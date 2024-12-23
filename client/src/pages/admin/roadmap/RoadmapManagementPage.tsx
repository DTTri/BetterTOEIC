import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { sRoadmap } from "@/store";
import { useNavigate } from "react-router-dom";
export default function RoadmapManagementPage() {
  const nav = useNavigate();
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
      field: "edit",
      type: "actions",
      flex: 0.5,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeEditOutlineIcon />}
          label="Edit"
          onClick={() => {
            console.log(params.row);
            // nav(`/admin/roadmap/edit/${params.row._id}`);
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
    </>
  );
}
