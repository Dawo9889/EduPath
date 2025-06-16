import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import FormTextField from "../form/FormTextField";
import Course from "../../types/Course";

export interface EnrollFormData {
  id: string;
  password: string;
}

interface EnrollFormProps {
  course: Course;
  onSave: (formData: EnrollFormData) => void;
  onClose?: () => void;
}

function EnrollForm({ course, onSave, onClose }: EnrollFormProps) {
  const [formData, setFormData] = useState<EnrollFormData>({
    id: course.id,
    password: "",
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
    setFormData({ id: "", password: "" });
  };

  return (
    <div className="m-4 relative">
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 relative">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          Enroll Course: {course.name}
        </h2>
        {/* Close button */}
        <IoCloseOutline
          className="text-4xl absolute top-0 right-0 cursor-pointer text-gray-600 hover:text-red-500"
          onClick={onClose}
        />
        {course.isPublic ? (
          <div className="flex flex-col gap-4">
            <p className="text-primary">The course is public. You can enroll now!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <FormTextField
              title={"Password"}
              isPassword={true}
              value={formData.password}
              onChange={handleChange}
              placeholder={"Password"}
              otherStyles={""}
              fieldName="password"
              inputfieldstyles="bg-secondary"
              inputValid={formData.password !== ""}
            />
          </div>
        )}
        <button
          type="submit"
          className="btn-primary px-4 py-2 rounded font-medium"
        >
          Enroll
        </button>
      </form>
    </div>
  );
}

export default EnrollForm;
