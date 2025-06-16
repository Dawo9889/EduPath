import { useEffect, useState } from "react";
import Assignment from "../../types/Assignment";
import { IoCloseOutline } from "react-icons/io5";
import FormTextField from "../form/FormTextField";
import FormDateField from "../form/FormDateField";

interface Props {
  assignment: Assignment;
  onSave: (assignment: Assignment) => void;
  onClose?: () => void;
}

function AssignmentForm({assignment, onSave, onClose}: Props) {
  const [formData, setFormData] = useState<Assignment>({
    id: '',
    name: '',
    content: '',
    dateStart: '',
    dateEnd: ''
  });

  useEffect(() => {
    if (assignment) setFormData(assignment);
  }, [assignment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ id: '', name: '', content: '', dateStart: '', dateEnd: '' });
  };

  return (
    <div className="m-4 relative">
    <form onSubmit={handleSubmit} className="mb-6 space-y-2 relative">
      <h2 className="text-2xl font-bold mb-4 text-primary">{assignment.id !== '' ? 'Edit Assignment' : 'Add Assignment'}</h2>
      {/* Close button */}
      <IoCloseOutline
                className="text-4xl absolute top-0 right-0 cursor-pointer text-gray-600 hover:text-red-500"
                onClick={onClose}
              />
      <div className="flex flex-col gap-4">
        <FormTextField
          title={'Name'}
          isPassword={false}
          value={formData.name}
          onChange={handleChange}
          placeholder={'Name'}
          otherStyles={''}
          fieldName="name"
          inputfieldstyles='bg-secondary'
        />
        <FormTextField
          title={'Content'}
          isPassword={false}
          value={formData.content}
          onChange={handleChange}
          placeholder={'Content'}
          otherStyles={''}
          fieldName="content"
          inputfieldstyles='bg-secondary'
        />
        <FormDateField 
          title={"Start Date"}
          value={formData.dateStart}
          onChange={handleChange}
          placeholder={""}
          otherStyles={""}
          fieldName="dateStart"
          inputfieldstyles="bg-secondary"
        />
        <FormDateField 
          title={"Submission Deadline"}
          value={formData.dateEnd}
          onChange={handleChange}
          placeholder={""}
          otherStyles={""}
          fieldName="dateEnd"
          inputfieldstyles="bg-secondary"
        />
      </div>
      <button type="submit" className="btn-primary px-4 py-2 rounded font-medium">
        {assignment.id !== '' ? 'Update Assignment' : 'Add Assignment'}
      </button>
    </form>
    </div>
  );
}

export default AssignmentForm;