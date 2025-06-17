import { IoCloseOutline } from "react-icons/io5";

interface ConfirmOperationProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmOperation({
  message,
  onConfirm,
  onClose,
}: ConfirmOperationProps) {
  return (
    <div className="relative p-5">
      <IoCloseOutline
        className="text-4xl absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-red-500"
        onClick={onClose}
      />
      <div className="flex flex-col gap-4">
        <p className="text-primary">{message}</p>
        <div className="space-x-2 flex justify-end">
          <button
            className="btn-secondary text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Return
          </button>
          <button
            className="btn-danger text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOperation;
