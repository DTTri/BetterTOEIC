import { DataGrid, GridActionsCellItem, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
// import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from '@mui/icons-material/Delete';
import { VocabByTopic } from "@/entities";
import { sVocab } from "@/store";
import LoadingProgress from "@/components/LoadingProgress";
import { useNavigate } from "react-router-dom";
import vocabService from "@/services/vocabService";
import { toast } from "react-toastify";

export default function VocabManagementPage() {
  const vocabsByTopics = sVocab.use((state) => state.vocabTopics);
  const nav = useNavigate();
  if (!vocabsByTopics) {
    return <LoadingProgress />;
  }
  const rows: VocabByTopic[] = vocabsByTopics;
  const deleteVocab = async (id: string) => {
    try {
      const response = await vocabService.deleteVocabTopic(id);
      if (response.EC === 0) {
        toast.success("Delete vocab successfully");
        sVocab.set(prev => prev.value.vocabTopics.filter(vocab => vocab._id !== id));
        rows.filter(vocab => vocab._id !== id);
      } else {
        toast.error("Delete vocab failed" + response.EM);
      }
    } catch (error) {
      toast.error("Error when deleting vocab");
    }
  }
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "TOPIC",
      flex: 1.1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "numberOfVocabs",
      headerName: "VOCABS",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      valueGetter: (_value, row) => {
        return row.vocabs.length;
      },
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueFormatter: (_params, row) => {
        return new Date(row.created_at).toLocaleString();
      },
    },
    {
      field: "updated_at",
      headerName: "UPDATED AT",
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueFormatter: (_params, row) => {
        return new Date(row.updated_at).toLocaleString();
      },
    },
    // {
    //   field: "edit",
    //   type: "actions",
    //   flex: 0.3,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       icon={<ModeEditOutlineIcon />}
    //       label="Edit"
    //       onClick={() => {
    //         console.log(params.row);
    //       }}
    //     />,
    //   ],
    // },
    {
      field: "delete",
      type: "actions",
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            deleteVocab(params.row._id);
          }}
        />,
      ],
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold text-black">Vocabulary Topics List</h2>
      <div className="admin-table-container">
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
      <div
        onClick={() => {
          nav("/admin/vocab/creatingVocab");
        }}
        className="buttons flex gap-2 justify-end"
      >
        <Button variant="contained">Create topic</Button>
      </div>
    </>
  );
}
