import ResetPasswordForm from '../../components/ResetPasswordForm'
import { completeRegistration } from '../../api/userApi';

function ResetPassword() {

  const handleReset = (data: { userId: string; resetToken: string; emailToken: string; newPassword: string }) => {
    // Implement the reset password logic here
    console.log('Resetting password for:', data);
    // You can call an API to reset the password
    const response = completeRegistration(data.userId, data.resetToken, data.emailToken, data.newPassword);
    response.then(res => {
      console.log('Password reset successful:', res);
      // Handle success (e.g., redirect to login page)
    }).catch(err => {
      console.error('Error resetting password:', err);
      // Handle error (e.g., show error message)
    });
  }

  return (
    <div className="flex flex-col bg-primary w-[400px] mx-auto pt-5">
      <ResetPasswordForm onReset={handleReset} isResetting={false} />
    </div>
  )
}

export default ResetPassword