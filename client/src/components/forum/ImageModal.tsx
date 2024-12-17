

export default function ImageModal ({ src, onClose } : { src: string, onClose : () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="max-w-[900px] max-h[550px]">
        <img src={src} alt='' className="block w-full h-full" />
        <button
          onClick={onClose}
          className="absolute top-7 right-10 text-white text-2xl"> &times; </button>
      </div>
    </div>
  );
};
