import { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import User from '../../types/User';
import FormField from '../FormField';

interface userFormProps {
  user: User;
  onSave: (user: User) => void;
  onClose?: () => void;
}

function UserForm({ user, onSave, onClose }: userFormProps) {
  const [formData, setFormData] = useState<User>({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    role: 'student',
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ id: '', firstname: '', lastname: '', email: '', role: 'student' });
  };

  return (
    <div className="m-4 relative">
    <form onSubmit={handleSubmit} className="mb-6 space-y-2 relative">
      <h2 className="text-2xl font-bold mb-4 text-primary">{user.id !== '' ? 'Edit User' : 'Add User'}</h2>
      {/* Close button */}
      <IoCloseOutline
                className="text-4xl absolute top-0 right-0 cursor-pointer text-gray-600 hover:text-red-500"
                onClick={onClose}
              />
      <div className="flex flex-col gap-4">
        <FormField
          title={'First name'}
          isPassword={false}
          value={formData.firstname}
          onChange={handleChange}
          placeholder={'First name'}
          otherStyles={''}
          fieldName="firstname"
          inputfieldstyles='bg-secondary'
        />
        <FormField
          title={'Last name'}
          isPassword={false}
          value={formData.lastname}
          onChange={handleChange}
          placeholder={'Last name'}
          otherStyles={''}
          fieldName="lastname"
          inputfieldstyles='bg-secondary'
        />
        <FormField
          title={'Email address'}
          isPassword={false}
          value={formData.email}
          onChange={handleChange}
          placeholder={'Email address'}
          otherStyles={''}
          fieldName='email'
          inputfieldstyles='bg-secondary'
        />
        <select
          name="role"
          className="border p-2 rounded w-1/3"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {user.id !== '' ? 'Update User' : 'Add User'}
      </button>
    </form>
    </div>
  );
}

export default UserForm;
