import { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import User from '../../types/User';
import FormTextField from '../form/FormTextField';

interface confirmUserDeleteProps {
  onDelete: (user: User) => void;
  onClose?: () => void;
}

function ConfirmUserDelete({onDelete, onClose }: confirmUserDeleteProps) { 

    const [formData, setFormData] = useState({
    confirm: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative p-5">
      {/* Close button */}
      <IoCloseOutline
                className="text-4xl absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-red-500"
                onClick={onClose}
              />
    <form onSubmit={() => onDelete} className="mb-2 space-y-2">
      <h2 className="text-2xl font-bold mb-4 text-primary">Delete User</h2>
      <p className="text-primary mb-4">
        Are you sure you want to delete this user? This action cannot be undone. All user data will be lost!
      </p>
      <div className="flex flex-col gap-4">
        <FormTextField
          title={'Confirm Delete - type "DELETE" below'}
          isPassword={false}
          value={formData.confirm}
          onChange={handleChange}
          placeholder={'DELETE'}
          otherStyles={''}
          fieldName="confirm"
          inputfieldstyles='bg-primary'
          inputValid={formData.confirm === 'DELETE' ? true : false}
        />
      </div>
      <button type="submit" className="btn-danger text-white px-4 py-2 rounded" disabled={formData.confirm !== 'DELETE'}>
        Delete
      </button>
    </form>
    </div>
  );
}

export default ConfirmUserDelete;
