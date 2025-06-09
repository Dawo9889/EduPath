import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../../components/FormField"
import { loginApi } from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
  const [emailValid, setEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });


  useEffect(() => {
    const result = EMAIL_REGEX.test(form.email);
    setEmailValid(result);
  }, [form.email])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid || form.password === '') return;

    setLoading(true);

    try {
      const userData = await loginApi(form.email, form.password); // <-- teraz zwraca {email, role}
      login(userData.email, userData.role, userData.token); // <-- wywołujemy login z contextu
      setError(null);
      // Redirect to the appropriate dashboard based on user role
      switch (userData.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'lecturer':
          navigate('/lecturer/dashboard');
          break;
        case 'student':
          navigate('/student/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setForm({ email: form.email, password: '' });
    }
  };

  return (
    <div className="bg-primary h-screen w-[400px] mx-auto">
      <div className="flex flex-col items-center h-50vh bg-secondary rounded-xl shadow-lg mt-20 w-full relative">
        <h2 className="pt-2 text-2xl font-bold mb-4 text-primary">Login</h2>
        <form>
          <FormField
            title={"Email address"}
            isPassword={false}
            value={form.email}
            placeholder={"Email address"}
            otherStyles={"w-[350px]"} 
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            inputfieldstyles='bg-primary'
            inputValid={emailValid}
          />
          <FormField
            title={"Password"}
            isPassword={true}
            value={form.password}
            placeholder={"Password"}
            otherStyles={"mt-3"}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            inputfieldstyles='bg-primary'
            />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
              type="submit"
              onClick={handleLogin}
              disabled={!emailValid || form.password === '' || loading}
              className="flex items-center justify-center mx-auto btn-primary text-primary font-medium px-4 py-2 rounded-2xl w-[100px] my-3"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : (
                'Login'
              )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login