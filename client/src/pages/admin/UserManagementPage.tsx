import { SideBar } from "@/components";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import { User } from "@/entities";
import { users } from "@/data";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function UserManagementPage() {
  const rows: User[] = users;
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "TÊN",
      flex: 1.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1.5,
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
      headerName: "NGÀY SỬA",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.2,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="flex justify-center gap-2">
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Xem chi tiết"
              onClick={() => {
                console.log(params.id);
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="w-full max-h-screen overflow-hidden bg-background flex gap-4">
      <SideBar />
      <div className="w-full h-screen p-4 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-black">Danh sách người dùng</h2>
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
    </div>
  );
}
