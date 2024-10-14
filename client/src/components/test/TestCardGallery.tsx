import { Test } from "@/entities";
import TestCard from "./TestCard";

export default function TestCardGallery({ tests }: { tests: Test[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tests.map((test) => (
        <TestCard key={test._id} titleTestCard={test.title} />
      ))}
    </div>
  );
}
