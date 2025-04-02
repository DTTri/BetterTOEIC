import { useEffect, useState } from 'react';

interface TextEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function TextEditor({
  initialValue = '',
  onChange,
  placeholder = 'Type your answer here...',
  minHeight = '200px'
}: TextEditorProps) {
  const [text, setText] = useState(initialValue);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setCharCount(newText.length);
    onChange(newText);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-4 border border-gray-200 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        style={{ minHeight }}
      />
      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-b-lg">
        <span className="text-sm text-gray-500">
          Characters: {charCount}
        </span>
        <span className="text-sm text-gray-500">
          Auto-saving...
        </span>
      </div>
    </div>
  );
} 