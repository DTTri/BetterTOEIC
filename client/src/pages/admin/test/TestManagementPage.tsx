import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import { testStore } from "@/store/testStore";
import { testService } from "@/services";
export default function TestManagementPage() {
  const nav = useNavigate();
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
      headerName: "TITLE",
      flex: 3,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "created_by",
      headerName: "CREATOR",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updated_at",
      headerName: "UPDATED AT",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "difficulty",
      headerName: "DIFFICULTY",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center h-full">
            <div
              className={`w-16 h-6 flex items-center justify-center ${
                params.value === "easy"
                  ? "bg-green-500"
                  : params.value === "medium"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              } rounded-full`}
            >
              {params.value}
            </div>
          </div>
        );
      },
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
            const deleteTest = async () => {
              try {
                const res = await testService.deleteTest(params.row._id);
                if (res.EC === 0) {
                  console.log("Delete test success: ", res.DT);
                  testStore.set((pre) => {
                    pre.value.testList = pre.value.testList.filter(
                      (test) => test._id !== params.row._id
                    );
                  });
                } else {
                  console.log("Delete test failed: ", res.EM);
                }
              } catch (err) {
                console.log(err);
              }
            };
            deleteTest();
          }}
        />,
      ],
    },
  ];

  const rows = testStore.use((v) => v.testList);
  return (
    <div className="w-full h-full rounded-xl p-4 flex flex-col gap-2 max-h-screen overflow-hidden bg-background">
      <h2 className="text-2xl font-bold text-black">Tests List</h2>
      <div className="table-container w-full h-full">
        <ThemeProvider theme={adminTableTheme}>
          <DataGrid
            style={{
              borderRadius: "20px",
              backgroundColor: "white",
              height: "100%",
            }}
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
      <div className="buttons flex gap-2 justify-end">
        <Button
          variant="contained"
          onClick={() => {
            nav("/admin/test/creatingTest");
          }}
        >
          Create Test
        </Button>
      </div>
    </div>
  );
}
