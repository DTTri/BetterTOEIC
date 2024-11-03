import CreatingVocab from "@/components/admin/CreatingVocab";
import { Button } from "@mui/material";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function CreatingVocabsPage() {
  const [topicName, setTopicName] = useState<string>("");
  const [topicAvt, setTopicAvt] = useState<string>("");
  const [vocabs, setVocabs] = useState<{ id: string; number: number }[]>([
    {
      id: uuidv4(),
      number: 1,
    },
  ]);
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
              setTopicAvt(URL.createObjectURL(file));
            }
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold mb-2">Vocabs:</p>
        <div className="flex flex-col gap-4">
          {vocabs.map((vocab, index) => (
            <CreatingVocab
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
            setVocabs([...vocabs, { id: uuidv4(), number: vocabs.length + 1 }])
          }
        >
          Add vocabulary
        </Button>
      </div>
    </div>
  );
}
