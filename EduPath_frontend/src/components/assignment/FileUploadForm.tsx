import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import FormFileField from "../form/FormFileField";
import DragAndDropField from "../form/DragAndDropField";

export interface UploadFileFormData {
  file?: File;
}

interface UploadFileForm {
  message: string;
  onSave: (data: UploadFileFormData) => void;
  onClose: () => void;
}

function UploadFileForm({ message, onSave, onClose }: UploadFileForm) {
  const [formData, setFormData] = useState<UploadFileFormData>({
    file: undefined,
  });

  const [selectedFileName, setSelectedFileName] = useState<string>("...");
  const allowedFileTypes = [
    { mimeType: "application/msword", extension: ".doc" },
    {
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      extension: ".docx",
    },
    { mimeType: "application/pdf", extension: ".pdf" },
    { mimeType: "text/plain", extension: ".txt" },
    { mimeType: "application/zip", extension: ".zip" },
    { mimeType: "application/x-zip-compressed", extension: ".zip" },
  ];

  const handleFileChange = (file: File) => {
    if (!allowedFileTypes.map((af) => af.mimeType).includes(file.type)) {
      setSelectedFileName("The selected file type is not allowed!");
      return;
    };
    setFormData({ file });
    setSelectedFileName(file.name);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files![0];
    handleFileChange(file);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.items[0].getAsFile() ?? undefined;
    if (file !== undefined) handleFileChange(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ file: undefined });
    setSelectedFileName("...");
  };

  return (
    <div className="m-4 relative">
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 relative">
        <h2 className="text-2xl font-bold mb-4 text-primary">{message}</h2>
        <IoCloseOutline
          className="text-4xl absolute top-0 right-0 cursor-pointer text-gray-600 hover:text-red-500"
          onClick={onClose}
        />
        <div className="flex flex-col gap-4">
          <div className="p-2 text-primary">
            Allowed file extensions:{" "}
            {Array.from(
              new Set(allowedFileTypes.map((af) => af.extension))
            ).join(", ")}
          </div>
          <div className="p-2 text-primary">
            Selected file: {selectedFileName}
          </div>
          <FormFileField
            title={""}
            onChange={handleFileInput}
            otherStyles=""
            fieldName="file"
            inputFieldStyles=""
          />
          <DragAndDropField onDrop={handleFileDrop} />
        </div>
        <button
          type="submit"
          className="btn-primary px-4 py-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={formData.file === undefined}
        >
          Upload file
        </button>
      </form>
    </div>
  );
}

export default UploadFileForm;
