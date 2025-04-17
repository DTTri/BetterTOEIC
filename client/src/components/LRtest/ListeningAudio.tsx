export default function ListeningAudio({ audioFile }: { audioFile: string }) {
  return (
    <audio
      src={audioFile}
      controls
    />
  );
}
