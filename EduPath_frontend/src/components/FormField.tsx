import { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

interface FormFieldProps {
  title: string,
  isPassword: boolean,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
  otherStyles: string,
}

const FormField = ({title, value, isPassword, placeholder, otherStyles, onChange}: FormFieldProps) => {

    const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`space-y-2 ${otherStyles}`}>
      <p className='text-lg text-secondary font-medium my-0'>{title}</p>
      <div className='border-2 w-full h-12 px-4 bg-black-100 rounded-2xl flex items-center'>
        <input
          className='flex-1 bg-transparent outline-none text-secondary font-regular text-base placeholder-gray-400'
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          type={isPassword && !showPassword ? 'password' : 'text'}
        />
        {isPassword && (
          <button
            type="button"
            className="text-secondary ml-2"
            onClick={() => setShowPassword(sp => !sp)}
          >
            {showPassword ? <IoMdEyeOff size={24} /> : <IoMdEye size={24} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField