import { Button } from "@mui/material";
import { useState } from "react";

export default function CreatingPracticeLessonsPage() {
  const [part, setPart] = useState<number>(0);
  return (
    <div className="w-full min-h-screen rounded-xl bg-white text-black flex flex-col gap-4 p-4">
      <div className="flex gap-2 items-center">
        <p className="text-2xl font-bold">Part:</p>
        <select
          className="p-2"
          value={part}
          onChange={(e) => {
            setPart(parseInt(e.target.value));
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
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
