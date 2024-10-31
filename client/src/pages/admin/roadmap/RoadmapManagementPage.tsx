import { SideBar } from "@/components";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import { roadmapChapters } from "@/data";
import { RoadmapChapter } from "@/entities";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
export default function RoadmapManagementPage() {
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
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
      headerName: "SỐ CÂU HỎI",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "NGÀY TẠO",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updated_at",
      headerName: "NGÀY CẬP NHẬT",
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

  const rows: RoadmapChapter[] = roadmapChapters;

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-2 max-h-screen overflow-hidden bg-background">
      <h2 className="text-2xl font-bold text-black">
        Danh sách chương bài tập lộ trình
      </h2>
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
