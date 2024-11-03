import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { VocabByTopic } from "@/entities";
import { vocabsByTopics } from "@/data";

export default function VocabManagementPage() {
  const rows: VocabByTopic[] = vocabsByTopics;
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "topic_name",
      headerName: "TOPIC",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "numberOfVocabs",
      headerName: "VOCABS",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) => {
        return row.vocabs.length;
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
          onClick={() => {
            console.log(params.row);
          }}
        />,
      ],
    },
  ];

  return (
    <div className="w-full h-screen p-4 rounded-xl flex flex-col gap-2 max-h-screen overflow-hidden bg-background">
      <h2 className="text-2xl font-bold text-black">Topics List</h2>
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
        <Button variant="contained">Create topic</Button>
      </div>
    </div>
  );
}
