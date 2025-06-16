import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import FormTextField from "../form/FormTextField";
import Course from "../../types/Course";

export interface AddUserFormData {
  userId: string;
  courseId: string;
}

interface AddUserFormProps {
  course: Course;
  onSave: (formData: AddUserFormData) => void;
  onClose?: () => void;
}

function AddUserForm({ course, onSave, onClose }: AddUserFormProps) {
  const [formData, setFormData] = useState<AddUserFormData>({
    userId: "",
    courseId: course.id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ userId: "", courseId: "" });
  };

  return (
    <div className="m-4 relative">
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 relative">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          Add user to "{course.name}" course.
        </h2>
        {/* Close button */}
        <IoCloseOutline
          className="text-4xl absolute top-0 right-0 cursor-pointer text-gray-600 hover:text-red-500"
          onClick={onClose}
        />
        <div className="flex flex-col gap-4">
          <FormTextField
            title={"User id"}
            isPassword={false}
            value={formData.userId}
            onChange={handleChange}
            placeholder={"User id"}
            otherStyles={""}
            fieldName="userId"
            inputfieldstyles="bg-secondary"
            inputValid={formData.userId !== ""}
          />
        </div>
        <button
          type="submit"
          className="btn-primary px-4 py-2 rounded font-medium"
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUserForm;
