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
import { useState } from "react";
import { testService } from "@/services";
import { toast } from "react-toastify";

export default function TestManagementPage() {
  const nav = useNavigate();
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState<string>("");
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
            setSelectedTestId(params.id as string);
            setIsConfirmPopupOpen(true);
          }}
        />,
      ],
    },
  ];

  const rows = testStore.use((v) => v.testList);
  const handleDeleteTest = async () => {
    try {
      const res = await testService.deleteTest(selectedTestId);
      setIsConfirmPopupOpen(false);
      if (res.EC === 0) {
        const newTests = rows.filter((test) => test._id !== selectedTestId);
        testStore.set((pre) => (pre.value.testList = newTests));
        toast.success("Test deleted successfully");
      } else {
        toast.error("Failed to delete test");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete test");
    }
  };
  return (
    <>
      <h2 className="text-2xl font-bold text-black">Tests List</h2>
      <div className="admin-table-container ">
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
      {isConfirmPopupOpen && (
        <div
          className="
        fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white rounded-xl p-4 w-1/3 flex flex-col items-center gap-2">
            <h2 className="text-xl font-bold text-black text-center">
              Are you sure you want to delete this test?
            </h2>
            <div className="flex gap-2 justify-center">
              <Button
                variant="contained"
                onClick={() => {
                  setIsConfirmPopupOpen(false);
                }}
              >
                No
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteTest}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
