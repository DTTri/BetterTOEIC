import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Practice } from "@/entities";
import { practiceForPart1 } from "@/data/practice_test";
export default function PracticeManagementPage() {
  const rows: Practice[] = practiceForPart1;
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "part",
      headerName: "PART",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "numberOfQuestions",
      headerName: "QUESTIONS",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) => {
        return row.questions.length;
      },
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
      field: "edit",
      type: "actions",
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ModeEditOutlineIcon />}
          label="Edit"
          onClick={() => console.log("Edit", params.row)}
        />,
      ],
    },
  ];
  return (
    <div className="w-full h-screen p-4 rounded-xl flex flex-col gap-2 max-h-screen overflow-hidden bg-background">
      <h2 className="text-2xl font-bold text-black">Exercises List</h2>
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
        <Button variant="contained">Create exercise</Button>
      </div>
    </div>
  );
}
