import CreatingVocab from "@/components/admin/CreatingVocab";
import LoadingProgress from "@/components/LoadingProgress";
import CreateVocabDTO from "@/entities/DTOS/CreateVocabDTO";
import http from "@/services/http";
import vocabService from "@/services/vocabService";
import { sVocab } from "@/store";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
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
    <div className="w-full min-h-screen rounded-xl bg-white text-black p-4 flex flex-col gap-6">
      <div className="flex gap-2 items-center">
        <p className="text-2xl font-bold">Topic Name:</p>
        <input
          type="text"
          className="p-2 text-lg bg-gray-100 rounded-sm border border-black"
          placeholder="Type topic name here"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-2xl font-bold">Topic Avatar:</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setTopicAvt(file);
            }
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold mb-2">Vocabs:</p>
        <div className="flex flex-col gap-4">
          {vocabs.map((vocab, index) => (
            <CreatingVocab
              vocabId={vocab.id}
              onSave={handleOnSave}
              key={vocab.id}
              vocabNumber={index + 1}
              onDelete={() => {
                setVocabs(vocabs.filter((v) => v.id !== vocab.id));
              }}
            />
          ))}
        </div>
        <Button
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
        >
          Add vocabulary
        </Button>
        <div className="flex flex-row justify-end items-center p-2">
          <Button variant="contained" onClick={handleCreateTopic}>
            Create Topic
          </Button>
        </div>
      </div>
    </div>
  );
}
