import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, ThemeProvider } from "@mui/material";
import { adminTableTheme } from "@/context";
import { VocabByTopic } from "@/entities";
import { sVocab } from "@/store";
import LoadingProgress from "@/components/LoadingProgress";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import vocabService from "@/services/vocabService";
import { toast } from "react-toastify";

export default function VocabManagementPage() {
  const vocabsByTopics = sVocab.use((state) => state.vocabTopics);
  const nav = useNavigate();
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState<boolean>(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  if (!vocabsByTopics) {
    return <LoadingProgress />;
  }
  const rows: VocabByTopic[] = vocabsByTopics;
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
    {
      field: "delete",
      type: "actions",
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            console.log(params.row);
            setSelectedTopicId(params.id as string);
            setIsConfirmPopupOpen(true);
          }}
        />,
      ],
    },
  ];

  const handleDeleteTopic = async () => {
    try {
      const res = await vocabService.deleteVocabTopic(selectedTopicId);
      if (res.EC === 0) {
        const newVocabsByTopics = vocabsByTopics.filter(
          (topic) => topic._id !== selectedTopicId
        );
        sVocab.set((pre) => (pre.value.vocabTopics = newVocabsByTopics));
        toast.success("Topic deleted successfully");
      } else {
        toast.error("Failed to delete topic");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete topic");
    }
  };

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
      {isConfirmPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-4 w-1/3 flex flex-col items-center gap-2">
            <h2 className="text-xl font-bold text-center">
              Are you sure you want to delete this topic?
            </h2>
            <div className="flex gap-4 justify-center">
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
                onClick={handleDeleteTopic}
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
