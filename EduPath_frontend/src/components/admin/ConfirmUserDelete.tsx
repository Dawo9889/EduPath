import { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import User from '../../types/User';
import FormTextField from '../form/FormTextField';

interface ConfirmUserDeleteProps {
  onDelete: (user: User) => void;
  onClose?: () => void;
  user: User;
}

function ConfirmUserDelete({ onDelete, onClose, user }: ConfirmUserDeleteProps) {
  const [formData, setFormData] = useState({
    confirm: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (formData.confirm === 'DELETE') {
            onDelete(user);
          }
        }}
        className="mb-2 space-y-2"
      >
        <h2 className="text-2xl font-bold mb-4 text-primary">Delete User</h2>
        <h4 className="text-gray-500 font-medium text-xl">{user.email}</h4>
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
            inputValid={formData.confirm === 'DELETE'}
          />
        </div>
        <button
          type="submit"
          className="btn-danger text-white px-4 py-2 rounded"
          disabled={formData.confirm !== 'DELETE'}
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export default ConfirmUserDelete;
