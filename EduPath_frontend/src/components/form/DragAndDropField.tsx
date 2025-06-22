import { useState } from "react";
import { IoDocumentText } from "react-icons/io5";

interface DragAndDropFieldProps {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const DragAndDropField = ({ onDrop }: DragAndDropFieldProps) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFile(e.dataTransfer.items[0].getAsFile() ?? undefined);

    if (file !== undefined) onDrop(e);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className={`space-y-2`}>
      <div className="w-full px-4 flex items-center">
        <div
          id="drop-zone"
          className="border-2 border-[var(--primary-200)] rounded-md p-3 min-h-48 w-full"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {file === undefined ? (
            <p className="text-primary">Drop your file here</p>
          ) : (
            <div className="flex">
              <div className="flex flex-col items-center">
                <IoDocumentText className="text-4xl text-primary" />
                <span className="text-primary">{file.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragAndDropField;
