import { SideBar } from "@/components";
import { testList } from "@/data";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
export default function TestManagementPage() {
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "TIÊU ĐỀ",
      flex: 3,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "created_by",
      headerName: "NGƯỜI TẠO",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "NGÀY TẠO",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updated_at",
      headerName: "NGÀY CẬP NHẬT",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "difficulty",
      headerName: "ĐỘ KHÓ",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "delete",
      type: "actions",
      flex: 0.5,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Delete"
          onClick={() => {
            console.log("Deleted: ", params.row);
            // Add delete logic here
          }}
        />,
      ],
    },
  ];

  const rows = testList;
  return (
    <div className="w-full h-screen p-4 flex flex-col gap-2 max-h-screen overflow-hidden bg-background">
      <h2 className="text-2xl font-bold text-black">Danh sách đề thi</h2>
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
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[5]}
            slots={{ toolbar: GridToolbar }}
            rowSelection={false}
          />
        </ThemeProvider>
      </div>
      <div className="buttons flex gap-2 justify-end">
        <Button variant="contained">Tạo đề thi mới</Button>
      </div>
    </div>
  );
}
