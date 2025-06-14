interface FormDateFieldProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  otherStyles: string;
  fieldName?: string;
  inputfieldstyles?: string;
  inputValid?: boolean;
  disabled?: boolean;
}

const FormDateField = ({
  title,
  value,
  onChange,
  placeholder,
  otherStyles,
  fieldName,
  inputfieldstyles,
  inputValid,
  disabled,
}: FormDateFieldProps) => {
  return (
    <div className={`space-y-2 ${otherStyles}`}>
      <p className="text-lg text-secondary font-medium mb-1">{title}</p>
      <div
        className={`w-full h-12 px-4 rounded-2xl flex items-center
             ${inputfieldstyles} ${
          inputValid === null
            ? "border-gray-300"
            : inputValid === false
            ? "border-2 border-red-500"
            : "border-2 border-green-500"
        }
             `}
      >
        <input
          className={`flex-1 bg-transparent outline-none text-secondary font-regular text-base placeholder-gray-400 disabled:opacity-50`}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          type="date"
          name={fieldName}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default FormDateField;
