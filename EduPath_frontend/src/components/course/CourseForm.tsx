import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Course from "../../types/Course";
import FormTextField from "../form/FormTextField";

export interface CourseFormData {
  id: string;
  name: string;
  description: string;
  password: string;
}

interface CourseFormProps {
  Course: Course;
  onSave: (formData: CourseFormData, course: Course) => void;
  onClose?: () => void;
}

function CourseForm({ Course, onSave, onClose }: CourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    id: "",
    name: "",
    description: "",
    password: "",
  });

  useEffect(() => {
    if (Course)
      setFormData({
        id: Course.id,
        name: Course.name,
        description: Course.description,
        password: "",
      });
  }, [Course]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, Course);
    setFormData({ id: "", name: "", description: "", password: "" });
  };

  return (
    <div className="m-4 relative">
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 relative">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          {Course.id !== "" ? "Edit Course" : "Add Course"}
        </h2>
        {/* Close button */}
        <IoCloseOutline
          className="text-4xl absolute top-0 right-0 cursor-pointer text-gray-600 hover:text-red-500"
          onClick={onClose}
        />
        <div className="flex flex-col gap-4">
          <FormTextField
            title={"Name"}
            isPassword={false}
            value={formData.name}
            onChange={handleChange}
            placeholder={"Name"}
            otherStyles={""}
            fieldName="name"
            inputfieldstyles="bg-secondary"
            inputValid={formData.name !== ""}
          />
          <FormTextField
            title={"Description"}
            isPassword={false}
            value={formData.description}
            onChange={handleChange}
            placeholder={"Description"}
            otherStyles={""}
            fieldName="description"
            inputfieldstyles="bg-secondary"
          />
          <FormTextField
            title={"Password"}
            isPassword={true}
            value={formData.password}
            onChange={handleChange}
            placeholder={"Leave empty to make the course public"}
            otherStyles={""}
            fieldName="password"
            inputfieldstyles="bg-secondary"
          />
        </div>
        <button
          type="submit"
          className="btn-primary px-4 py-2 rounded font-medium"
        >
          {Course.id !== "" ? "Update Course" : "Add Course"}
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
