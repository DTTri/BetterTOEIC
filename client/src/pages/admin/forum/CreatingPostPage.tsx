import { Button } from "@mui/material";
import { useState } from "react";

export default function CreatingPostPage() {
  const [title, setTitle] = useState<string>("");
  return (
    <div className="w-full min-h-screen rounded-xl bg-white text-black flex flex-col gap-4 p-4">
      <div className="flex gap-2 items-center">
        <p className="text-2xl font-bold">Title:</p>
        <input
          type="text"
          className="flex-1 p-2 text-lg bg-gray-100 rounded-sm border border-black"
          placeholder="Type title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="w-full">
        <textarea
          className="w-full h-96 p-2 border border-black rounded-sm"
          style={{
            resize: "none",
          }}
        />
      </div>
      <div className="w-full flex justify-end gap-2 items-center">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#D0E3FF",
            color: "#1E3A8A",
          }}
        >
          Refresh
        </Button>
        <Button variant="contained" style={{ backgroundColor: "#00205C" }}>
          Create
        </Button>
      </div>
    </div>
  );
}
