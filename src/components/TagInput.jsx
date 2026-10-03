import { useState } from 'react';
import { X } from 'lucide-react';

export default function TagInput({ tags, onChange, placeholder = "Type and press enter..." }) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (indexToRemove) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg bg-white min-h-[2.75rem]">
        {tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm bg-blue-50 text-primary font-medium">
            {tag}
            <button 
              type="button" 
              onClick={() => removeTag(index)}
              className="text-blue-400 hover:text-blue-600 focus:outline-none"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 outline-none min-w-[120px] text-sm bg-transparent"
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">Press enter to add</p>
    </div>
  );
}
