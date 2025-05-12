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
import { swTestStore } from "@/store/swTestStore";
import { useEffect, useState } from "react";
import { testService } from "@/services";
import swTestService from "@/services/swTestService";
import { toast } from "react-toastify";
import { SWTest } from "@/entities";

export default function TestManagementPage() {
  const nav = useNavigate();
  const [isLRTest, setIsLRTest] = useState(true);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState<string>("");

  useEffect(() => {
    const fetchSWTests = async () => {
      try {
        const swTests = swTestStore.use((state) => state.swTestList);
        if (swTests.length === 0) {
          const response = await swTestService.getAllSWTests();
          if (response.EC === 0) {
            swTestStore.set((state) => (state.value.swTestList = response.DT));
          }
        }
      } catch (error) {
        console.error("Failed to fetch SW tests:", error);
      }
    };

    fetchSWTests();
  }, []);

  const lrColumns: GridColDef[] = [
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
      field: "type",
      headerName: "TYPE",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (_, row) => {
        return row.isMiniTest ? "Mini Test" : "Full Test";
      },
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
      valueGetter: (_, row) => {
        return row.created_at.split("T")[0].split("-").reverse().join("/");
      },
    },
    {
      field: "updated_at",
      headerName: "UPDATED AT",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
      valueGetter: (_, row) => {
        return row.updated_at.split("T")[0].split("-").reverse().join("/");
      },
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

  const swColumns: GridColDef[] = [
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
      field: "description",
      headerName: "DESCRIPTION",
      flex: 2,
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
      valueGetter: (_, row) => {
        const date = row.created_at;
        if (typeof date === "string") {
          return date.split("T")[0].split("-").reverse().join("/");
        }
        return "";
      },
    },
    {
      field: "updated_at",
      headerName: "UPDATED AT",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
      valueGetter: (_, row) => {
        const date = row.updated_at;
        if (typeof date === "string") {
          return date.split("T")[0].split("-").reverse().join("/");
        }
        return "";
      },
    },
    {
      field: "difficulty",
      headerName: "DIFFICULTY",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center h-full">
            <div
              className={`w-24 h-8 flex items-center justify-center ${
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

  const lrRows = testStore.use((v) => v.testList);
  const swRows = swTestStore.use((v) => v.swTestList);

  const formattedSWRows = swRows.map((test: SWTest) => ({
    ...test,
    created_at: test.created_at ? test.created_at.toString() : "",
    updated_at: test.updated_at ? test.updated_at.toString() : "",
  }));

  const handleDeleteTest = async () => {
    try {
      if (isLRTest) {
        const res = await testService.deleteTest(selectedTestId);
        setIsConfirmPopupOpen(false);
        if (res.EC === 0) {
          const newTests = lrRows.filter((test) => test._id !== selectedTestId);
          testStore.set((pre) => (pre.value.testList = newTests));
          toast.success("Test deleted successfully");
        } else {
          toast.error("Failed to delete test");
        }
      } else {
        const res = await swTestService.deleteSWTest(selectedTestId);
        setIsConfirmPopupOpen(false);
        if (res.EC === 0) {
          const newTests = swRows.filter((test) => test._id !== selectedTestId);
          swTestStore.set((pre) => (pre.value.swTestList = newTests));
          toast.success("SW Test deleted successfully");
        } else {
          toast.error("Failed to delete SW test");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(`Failed to delete ${isLRTest ? "test" : "SW test"}`);
    }
  };

  return (
    <>
      <div className="header flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">
          {isLRTest ? "Listening & Reading Tests" : "Speaking & Writing Tests"}
        </h2>
        <Button
          variant="contained"
          onClick={() => setIsLRTest(!isLRTest)}
          className="text-white"
        >
          {isLRTest ? "S&W Tests" : "L&R Tests"}
        </Button>
      </div>
      <div className="admin-table-container">
        <ThemeProvider theme={adminTableTheme}>
          <DataGrid
            className="admin-table"
            rows={isLRTest ? lrRows : formattedSWRows}
            columns={isLRTest ? lrColumns : swColumns}
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
              isLRTest
                ? lrRows.length < 6
                  ? [6, lrRows.length]
                  : [6, lrRows.length + 1]
                : formattedSWRows.length < 6
                ? [6, formattedSWRows.length]
                : [6, formattedSWRows.length + 1]
            }
            slots={{ toolbar: GridToolbar }}
            rowSelection={false}
          />
        </ThemeProvider>
      </div>
      <div className="buttons flex gap-2 justify-end mt-4">
        <Button
          variant="contained"
          onClick={() => {
            if (isLRTest) {
              nav("/admin/test/creatingTest");
            } else {
              nav("/admin/test/creatingSWTest");
            }
          }}
        >
          {isLRTest ? "Create L&R Test" : "Create S&W Test"}
        </Button>
      </div>
      {isConfirmPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-4 w-1/3 flex flex-col items-center gap-2">
            <h2 className="text-xl font-bold text-black text-center">
              Are you sure you want to delete this{" "}
              {isLRTest ? "test" : "SW test"}?
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
