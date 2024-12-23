import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import { User } from "@/entities";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { sUser } from "@/store";
export default function UserManagementPage() {
  const users = sUser.use((v) => v.users);
  const rows = users.map((user: User, index: number) => {
    return {
      ...user,
      index: index + 1,
      created_at: user.created_at.split("T")[0].split("-").reverse().join("/"),
      updated_at: user.updated_at.split("T")[0].split("-").reverse().join("/"),
    };
  });
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
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "NAME",
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
    <>
      <h2 className="text-2xl font-bold text-black">Users List</h2>
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
                  pageSize: 6,
                },
              },
            }}
            pageSizeOptions={
              rows.length < 6 ? [6, rows.length] : [6, rows.length + 1]
            }
            slots={{ toolbar: GridToolbar }}
            rowSelection={false}
          />
        </ThemeProvider>
      </div>
    </>
  );
}
