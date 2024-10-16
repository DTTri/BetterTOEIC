export default function ListeningAudio(srcAudio: string) {
  return (
    <audio
      src={srcAudio}
      controls
    />
  );
}
