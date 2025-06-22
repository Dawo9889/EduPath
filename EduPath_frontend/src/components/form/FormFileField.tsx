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
  return (
    <div className={`space-y-2 ${otherStyles}`}>
      <p className="text-lg text-secondary font-medium mb-1">{title}</p>
      <div className={`w-full h-12 px-4 flex items-center ${inputFieldStyles}`}>
        <input
          className={`text-secondary font-regular text-base placeholder-gray-400 border-2 p-3 rounded w-min disabled:opacity-50`}
          onChange={onChange}
          type="file"
          name={fieldName}
          disabled={disabled}
          id="file-input"
        />
      </div>
    </div>
  );
};

export default FormFileField;
