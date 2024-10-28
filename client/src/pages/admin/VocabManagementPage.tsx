import { SideBar } from "@/components";
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
      headerName: "CHỦ ĐỀ",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "numberOfVocabs",
      headerName: "SỐ TỪ VỰNG",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) => {
        return row.vocabs.length;
      },
    },
    {
      field: "created_at",
      headerName: "NGÀY TẠO",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updated_at",
      headerName: "NGÀY CẬP NHẬT",
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
    <div className="w-full max-h-screen overflow-hidden bg-background flex gap-4">
      <SideBar />
      <div className="w-full h-screen p-4 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-black">
          Danh sách chủ đề từ vựng
        </h2>
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
          <Button variant="contained">Tạo chủ đề mới</Button>
        </div>
      </div>
    </div>
  );
}