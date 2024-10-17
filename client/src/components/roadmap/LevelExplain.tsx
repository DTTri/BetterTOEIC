export default function LevelExplain({
  level,
  explain,
}: {
  level: string;
  explain: string;
}) {
  return (
    <div className="bg-[#DEF3FF] p-4 rounded-xl border border-black shadow-md">
      <h2 className="text-lg font-bold mb-2">{level}</h2>
      <p>{explain}</p>
    </div>
  );
}
