import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import { posts } from "@/data";
import { Post } from "@/entities";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
export default function ForumManagementPage() {
  const columns: GridColDef[] = [
    {
      field: "postID",
      headerName: "ID",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "CREATOR",
      flex: 2,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) => {
        return row.creator.username;
      },
    },
    {
      field: "content",
      headerName: "CONTENT",
      align: "center",
      headerAlign: "center",
      flex: 4,
    },

    {
      field: "totalLike",
      headerName: "LIKES",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "totalComment",
      headerName: "COMMENTS",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "updated_at",
      headerName: "UPDATED AT",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      align: "center",
      headerAlign: "center",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Delete"
          onClick={() => {
            console.log("Deleted: ", params.row);
            // Add delete logic here
          }}
        />,
        <GridActionsCellItem
          icon={<ModeEditOutlineIcon />}
          label="Edit"
          onClick={() => {
            console.log(params.row);
            // Add edit logic here
          }}
        />,
      ],
    },
  ];
  // Map the posts array to rows
  const rows: Post[] = posts;
  return (
    <div className="w-full h-screen p-4 flex flex-col gap-2 max-h-screen overflow-hidden bg-background">
      <h2 className="text-2xl font-bold text-black">Posts List</h2>
      <div className="table-container w-full h-full">
        <ThemeProvider theme={adminTableTheme}>
          <DataGrid
            style={{
              borderRadius: "20px",
              backgroundColor: "white",
            }}
            rows={rows}
            columns={columns}
            getRowId={(row) => row.postID} // Specify custom id for each row
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
        <Button variant="contained">Create post</Button>
      </div>
    </div>
  );
}
