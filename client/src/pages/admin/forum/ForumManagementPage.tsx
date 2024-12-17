import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import { Post } from "@/entities";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import sForum from "@/store/forumStore";
import { useEffect, useState } from "react";
import LoadingProgress from "@/components/LoadingProgress";
import { forumService } from "@/services";
export default function ForumManagementPage() {
  const forumStore = sForum.use((cur) => cur.posts);
  const [posts, setPosts] = useState<Post[]>(forumStore);

  useEffect(() => {
    if (forumStore.length > 0) {
      setPosts(forumStore);
    }
  }, [forumStore]);

  if (!posts) {
    return <LoadingProgress />;
  }

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
      headerName: "CREATOR",
      flex: 2,
      align: "center",
      headerAlign: "center",
      valueGetter: (_value, row) => {
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
      valueGetter: (_value, row) => {
        return row.comments.length;
      },
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
          onClick={async () => {
            console.log("Deleted: ", params.row);
            // Add delete logic here
            try {
              const response = await forumService.deletePost(params.row._id);
              if (response.EC === 0) {
                setPosts((prev) =>
                  prev.filter((post) => post._id !== params.row._id)
                );
              } else {
                console.log("Error deleting post: ", response.EM);
              }
            } catch (error) {
              console.log("Error deleting post: ", error);
            }
          }}
        />,
      ],
    },
  ];

  // Map the posts array to rows
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
            rows={posts}
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
        <Button variant="contained">Create post</Button>
      </div>
    </div>
  );
}
