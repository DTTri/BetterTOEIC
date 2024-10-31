import { SideBar } from "@/components";
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
      headerName: "TÊN TÁC GIẢ",
      flex: 2,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) => {
        return row.creator.username;
      },
    },
    {
      field: "content",
      headerName: "NỘI DUNG",
      align: "center",
      headerAlign: "center",
      flex: 4,
    },

    {
      field: "totalLike",
      headerName: "LƯỢT THÍCH",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "totalComment",
      headerName: "LƯỢT BÌNH LUẬN",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "NGÀY TẠO",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "updated_at",
      headerName: "NGÀY SỬA",
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
          label="Xóa"
          onClick={() => {
            console.log("Deleted: ", params.row);
            // Add delete logic here
          }}
        />,
        <GridActionsCellItem
          icon={<ModeEditOutlineIcon />}
          label="Sửa"
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
      <h2 className="text-2xl font-bold text-black">Danh sách bài viết</h2>
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
        <Button variant="contained">Tạo bài viết mới</Button>
      </div>
    </div>
  );
}
