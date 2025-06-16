import { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import User from '../../types/User';
import FormTextField from '../form/FormTextField';

interface userFormProps {
  user: User;
  onSave: (user: User) => void;
  onClose?: () => void;
  isSaving: boolean
}

function UserForm({ user, onSave, onClose, isSaving }: userFormProps) {
  const [formData, setFormData] = useState<User>({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    role: 'student',
  });

  const emailValid = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/;
    return emailRegex.test(formData.email);
  }

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
        <FormTextField
          title={'First name'}
          isPassword={false}
          value={formData.firstname}
          onChange={handleChange}
          placeholder={'First name'}
          otherStyles={''}
          fieldName="firstname"
          inputfieldstyles='bg-secondary'
          inputValid={formData.firstname !== ''}
        />
        <FormTextField
          title={'Last name'}
          isPassword={false}
          value={formData.lastname}
          onChange={handleChange}
          placeholder={'Last name'}
          otherStyles={''}
          fieldName="lastname"
          inputfieldstyles='bg-secondary'
          inputValid={formData.lastname !== ''}
        />
        <FormTextField
          title={'Email address'}
          isPassword={false}
          value={formData.email}
          onChange={handleChange}
          placeholder={'Email address'}
          otherStyles={``}
          fieldName='email'
          inputfieldstyles={`bg-secondary`}
          inputValid={user.id == '' ? emailValid() : null}
          disabled={user.id !== ''}
        />
        <p className='text-lg text-secondary font-medium'>Role</p>
        <select
          name="role"
          className="flex-1 bg-secondary outline-none text-secondary font-regular text-base mt-[-10px]
          w-full min-h-12 px-4 rounded-2xl appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-default"
          value={formData.role}
          onChange={handleChange}
          disabled={user.id !== ''}
        >
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit"
       className="btn-primary text-white px-4 py-2 rounded"
       disabled={(formData.firstname === '' || formData.lastname === '' || formData.email === '' || !emailValid()) || isSaving}>
        {isSaving ? 'Saving...' : user.id !== '' ? 'Update User' : 'Add User'}
      </button>
    </form>
    </div>
  );
}

export default UserForm;
