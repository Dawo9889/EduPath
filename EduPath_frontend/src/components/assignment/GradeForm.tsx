import { useState } from "react";
import Solution from "../../types/Solution";
import { IoCloseOutline } from "react-icons/io5";
import FormNumberField from "../form/FormNumberField";

export interface GradeFormData {
  solutionId: string;
  grade: string;
}

interface GradeFormProps {
  solution: Solution;
  onSave: (data: GradeFormData) => void;
  onClose: () => void;
}

function GradeForm({ solution, onSave, onClose }: GradeFormProps) {
  const [formData, setFormData] = useState<GradeFormData>({
    solutionId: solution.id,
    grade: "0",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ solutionId: "", grade: "0" });
  };

  return (
    <div className="m-4 relative">
      <form onSubmit={handleSubmit} className="mb-6 space-y-2 relative">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          Grade the {solution.studentName}'s solution
        </h2>
        {/* Close button */}
        <IoCloseOutline
          className="text-4xl absolute top-0 right-0 cursor-pointer text-gray-600 hover:text-red-500"
          onClick={onClose}
        />
        <div className="flex flex-col gap-4">
          <FormNumberField
            title={"Grade"}
            value={formData.grade}
            onChange={handleChange}
            placeholder={"0"}
            otherStyles={""}
            fieldName="grade"
            inputfieldstyles="bg-secondary"
            inputValid={
              5 >= Number(formData.grade) && Number(formData.grade) >= 2
            }
          />
        </div>
        <button
          type="submit"
          className="btn-primary px-4 py-2 rounded font-medium"
        >
          Grade
        </button>
      </form>
    </div>
  );
}

export default GradeForm;
