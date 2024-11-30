import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { sRoadmap } from "@/store";
export default function RoadmapManagementPage() {
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
    <div className="w-full h-screen p-4 rounded-xl flex flex-col gap-2 max-h-screen overflow-hidden bg-background">
      <h2 className="text-2xl font-bold text-black">Chapters List</h2>
      <div className="table-container w-full h-full">
        <ThemeProvider theme={adminTableTheme}>
          <DataGrid
            style={{
              borderRadius: "20px",
              backgroundColor: "white",
            }}
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id} // Specify custom id for each row
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 9,
                },
              },
            }}
            pageSizeOptions={[5]}
            slots={{ toolbar: GridToolbar }}
            rowSelection={false}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}
