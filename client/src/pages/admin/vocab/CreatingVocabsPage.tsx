import CreatingVocab from "@/components/admin/CreatingVocab";
import LoadingProgress from "@/components/LoadingProgress";
import CreateVocabDTO from "@/entities/DTOS/CreateVocabDTO";
import http from "@/services/http";
import vocabService from "@/services/vocabService";
import { sVocab } from "@/store";
import {
  Button,
  Paper,
  TextField,
  FormControl,
  Tooltip,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
export default function CreatingVocabsPage() {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const [topicName, setTopicName] = useState<string>("");
  const nav = useNavigate();
  const [topicAvt, setTopicAvt] = useState<File | null>(null);
  const [vocabs, setVocabs] = useState<
    { id: string; number: number; vocab: CreateVocabDTO }[]
  >([
    {
      id: uuidv4(),
      number: 1,
      vocab: {} as CreateVocabDTO,
    },
  ]);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  const handleOnSave = (
    createdVocab: CreateVocabDTO,
    createdVocabId: string
  ) => {
    setVocabs(
      vocabs.map((v) =>
        v.id === createdVocabId ? { ...v, vocab: createdVocab } : v
      )
    );
  };

  console.log("vocabs " + vocabs[0].vocab.image);

  const uploadFile = async (file: File) => {
    const response = await http.get(
      `file/presigned-url?fileName=${file.name}&contentType=${file.type}`
    );
    console.log(response);

    const result = await fetch(response.presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    if (!result.ok) {
      toast("Failed to upload file", { type: "error" });
    }
    console.log(result);

    return "https://seuit-qlnt.s3.amazonaws.com/" + response.key;
  };

  const handleCreateTopic = async () => {
    if (!topicName) {
      toast.error("Please enter topic name");
      return;
    }
    setIsWaiting(true);
    let topicAvatarUrl = "";
    if (topicAvt) {
      topicAvatarUrl = await uploadFile(topicAvt);
    }

    const vocabUploadPromises = vocabs.map(async (vocab) => {
      let imageUrl = "";
      let audioUrl = "";

      if (vocab.vocab.image) {
        imageUrl = await uploadFile(vocab.vocab.image);
      }

      if (vocab.vocab.audio) {
        audioUrl = await uploadFile(vocab.vocab.audio);
      }

      console.log(imageUrl, audioUrl);

      return {
        ...vocab.vocab,
        image: imageUrl,
        audio: audioUrl,
      };
    });

    const uploadedVocabs = await Promise.all(vocabUploadPromises);

    const topicData = {
      name: topicName,
      image: topicAvatarUrl,
      vocabs: uploadedVocabs,
    };

    try {
      const responseTopic = await vocabService.createVocabTopic(topicData);
      if (responseTopic.EC === 0) {
        toast("Create topic successfully", { type: "success" });
        sVocab.set((pre) => pre.value.vocabTopics.push(responseTopic.data));
        setIsWaiting(false);
        nav("/admin/vocab");
      }
    } catch (error) {
      toast("Failed to create topic: " + error, { type: "error" });
    }
  };
  if (isWaiting) {
    return <LoadingProgress />;
  }
  console.log(vocabs);
  return (
    <div className="creating-test-container max-w-7xl mx-auto px-4 py-6">
      <h4 className="text-3xl font-semibold">Create New Vocabulary Topic</h4>

      <Paper elevation={2} className="p-6 mb-8 rounded-xl shadow-lg bg-gray-50">
        <h6 className="text-xl text-gray-700 font-medium mb-4">
          Topic Information
        </h6>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <FormControl fullWidth variant="outlined">
            <TextField
              id="topic-name"
              label="Topic Name"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              placeholder="Enter topic name"
              variant="outlined"
              fullWidth
              required
              className="transition-all duration-300 hover:shadow-md"
            />
          </FormControl>

          <div>
            <div className="flex items-center gap-4">
              <input
                id="image-input"
                type="file"
                accept="image/*"
                multiple={false}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setTopicAvt(file);
                  }
                }}
                style={{ display: "none" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => document.getElementById("image-input")?.click()}
                startIcon={<ImageIcon />}
                className="transition-all duration-300 hover:shadow-md"
              >
                Topic Banner
              </Button>
              {topicAvt ? (
                <Chip
                  label={topicAvt.name}
                  variant="outlined"
                  color="primary"
                  className="animate-fadeIn"
                />
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No image selected
                </p>
              )}
            </div>
          </div>
        </div>
      </Paper>

      <div className="flex flex-col gap-6">
        {vocabs.map((vocab, index) => (
          <Paper
            elevation={2}
            className="p-4 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-md"
            key={vocab.id}
          >
            <CreatingVocab
              vocabId={vocab.id}
              onSave={handleOnSave}
              vocabNumber={index + 1}
              onDelete={() => {
                setVocabs(vocabs.filter((v) => v.id !== vocab.id));
              }}
            />
          </Paper>
        ))}
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() =>
          setVocabs([
            ...vocabs,
            {
              id: uuidv4(),
              number: vocabs.length + 1,
              vocab: {} as CreateVocabDTO,
            },
          ])
        }
        startIcon={<AddIcon />}
        className="transition-all duration-300 hover:shadow-md w-fit"
        style={{
          margin: "0 auto",
        }}
      >
        Add Vocabulary
      </Button>

      <div className="flex justify-end gap-4">
        <Tooltip title="Create vocabulary topic">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTopic}
            startIcon={<CreateIcon />}
            className="transition-all duration-300 hover:shadow-lg"
            size="large"
          >
            Create Topic
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
