import { useRef } from "react";

interface FormFileFieldProps {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fieldName: string;
  inputFieldStyles?: string;
  otherStyles?: string;
  disabled?: boolean;
}

const FormFileField = ({
  title,
  onChange,
  fieldName,
  inputFieldStyles,
  otherStyles,
  disabled,
}: FormFileFieldProps) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInput.current?.click();
  };

  return (
    <div className={`space-y-2 ${otherStyles}`}>
      <p className="text-lg text-secondary font-medium mb-1">{title}</p>
      <div className={`w-full h-12 px-4 flex items-center ${inputFieldStyles}`}>
        <input
          className={"hidden"}
          onChange={onChange}
          type="file"
          name={fieldName}
          disabled={disabled}
          ref={fileInput}
        />
        <button
          onClick={handleClick}
          className="btn-primary px-4 py-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Select file
        </button>
      </div>
    </div>
  );
};

export default FormFileField;
