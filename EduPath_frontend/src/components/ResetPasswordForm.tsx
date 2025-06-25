import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import FormTextField from './form/FormTextField';

interface ResetPasswordFormProps {
  onClose?: () => void;
  onReset: (data: {
    userId: string;
    resetToken: string;
    emailToken: string;
    newPassword: string;
  }) => void;
  isResetting: boolean;
}

export default function ResetPasswordForm({ onClose, onReset, isResetting }: ResetPasswordFormProps) {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tokensValid, setTokensValid] = useState(true);

  const userId = searchParams.get('userId') || '';
  const resetToken = searchParams.get('resetToken') || '';
  const emailToken = searchParams.get('emailToken') || '';

  useEffect(() => {
    if (!userId || !resetToken || !emailToken) {
      setTokensValid(false);
    }
  }, [userId, resetToken, emailToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;
    onReset({ userId, resetToken, emailToken, newPassword });
  };

  return (
    <div className="m-4 relative">
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 relative">
        <h2 className="text-2xl font-bold mb-4 text-primary">Reset Password</h2>
        {/* <IoCloseOutline
          className="text-4xl absolute top-0 right-0 cursor-pointer text-gray-600 hover:text-red-500"
          onClick={onClose}
        /> */}

        {!tokensValid ? (
          <p className="text-red-600 font-medium">Invalid or expired reset link.</p>
        ) : (
          <>
            <FormTextField
                title="New Password"
                isPassword={true}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                fieldName="newPassword"
                inputfieldstyles="bg-secondary"
                inputValid={newPassword.length >= 6} otherStyles={''}            />

            <FormTextField
                title="Confirm Password"
                isPassword={true}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                fieldName="confirmPassword"
                inputfieldstyles="bg-secondary"
                inputValid={newPassword === confirmPassword && confirmPassword.length >= 6} otherStyles={''}            />

            <button
              type="submit"
              className="btn-primary text-white px-4 py-2 rounded"
              disabled={
                isResetting ||
                newPassword.length < 6 ||
                newPassword !== confirmPassword
              }
            >
              {isResetting ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
