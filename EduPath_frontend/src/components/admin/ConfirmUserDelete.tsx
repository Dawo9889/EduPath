import { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import User from '../../types/User';
import FormField from '../FormField';

interface confirmUserDeleteProps {
  onDelete: (user: User) => void;
  onClose?: () => void;
}

function ConfirmUserDelete({onDelete, onClose }: confirmUserDeleteProps) { 

    const [formData, setFormData] = useState({
    confirm: '',
  });

  const [inputsValid, setInputsValid] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="m-4 relative">
    <form onSubmit={() => onDelete} className="mb-6 space-y-2 relative">
      <h2 className="text-2xl font-bold mb-4 text-primary">Delete User</h2>
      {/* Close button */}
      <IoCloseOutline
                className="text-4xl absolute top-0 right-0 cursor-pointer text-gray-600 hover:text-red-500"
                onClick={onClose}
              />
      <div className="flex flex-col gap-4">
        <FormField
          title={'First name'}
          isPassword={false}
          value={formData.confirm}
          onChange={handleChange}
          placeholder={''}
          otherStyles={''}
          fieldName="confirm"
          inputfieldstyles='bg-secondary'
        />
      </div>
      <button type="submit" className="btn-primary text-white px-4 py-2 rounded" disabled={formData.confirm === 'DELETE'}>
        Delete
      </button>
    </form>
    </div>
  );
}

export default ConfirmUserDelete;
