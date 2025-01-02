import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import { Post } from "@/entities";
import DeleteIcon from "@mui/icons-material/Delete";
import sForum from "@/store/forumStore";
import { useEffect, useState } from "react";
import LoadingProgress from "@/components/LoadingProgress";
import { useNavigate } from "react-router-dom";
import { forumService } from "@/services";
export default function ForumManagementPage() {
  const forumStore = sForum.use((cur) => cur.posts);
  const [posts, setPosts] = useState<Post[]>(forumStore);
  const nav = useNavigate();
  useEffect(() => {
    if (forumStore.length > 0) {
      setPosts(forumStore);
    }
  }, [forumStore]);

  if (!posts) {
    return <LoadingProgress />;
  }

  const handleOnDeletePost = async (postId: string) => {
    try {
      const response = await forumService.deletePost(postId);
      if (response.EC === 0) {
        sForum.set((prev) => {
          return prev.value.posts.filter((post) => post._id !== post._id);
        });
        setPosts(posts.filter((post) => post._id !== post._id));
      }
    } catch (error) {
      console.log("Fail to delete post");
    }
  };

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
      valueGetter: (_, row) => {
        return row.totalLike.length;
      },
    },
    {
      field: "totalComment",
      headerName: "COMMENTS",
      align: "center",
      headerAlign: "center",
      flex: 1,
      valueGetter: (_, row) => {
        return row.comments.length;
      },
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      align: "center",
      headerAlign: "center",
      flex: 1,
      valueGetter: (_, row) => {
        return row.created_at.split("T")[0].split("-").reverse().join("/");
      },
    },
    {
      field: "updated_at",
      headerName: "UPDATED AT",
      align: "center",
      headerAlign: "center",
      flex: 1,
      valueGetter: (_, row) => {
        return row.updated_at.split("T")[0].split("-").reverse().join("/");
      },
    },
    {
      field: "actions",
      type: "actions",
      align: "center",
      headerAlign: "center",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            handleOnDeletePost(params.row._id);
          }}
        />,
      ],
    },
  ];

  // Map the posts array to rows
  return (
    <>
      <h2 className="text-2xl font-bold text-black">Posts List</h2>
      <div className="admin-table-container">
        <ThemeProvider theme={adminTableTheme}>
          <DataGrid
            className="admin-table"
            rows={forumStore}
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
              forumStore.length < 6
                ? [6, forumStore.length]
                : [6, forumStore.length + 1]
            }
            slots={{ toolbar: GridToolbar }}
            rowSelection={false}
          />
        </ThemeProvider>
      </div>
      <div className="buttons flex gap-2 justify-end">
        <Button
          onClick={() => {
            nav("/forum/create-post");
          }}
          variant="contained"
        >
          Create post
        </Button>
      </div>
    </>
  );
}
