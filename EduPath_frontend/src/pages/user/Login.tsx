import { useEffect, useState } from "react";
import FormField from "../../components/FormField"

function Login() {
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [emailValid, setEmailValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const result = EMAIL_REGEX.test(form.email);
    setEmailValid(result);
  }, [form.email])

  return (
    <div className="bg-primary h-screen w-[300px] mx-auto">
      <div className="flex flex-col items-center h-50vh bg-tertiary rounded-xl mt-[100px]">
        <form>
          <FormField
            title={"Email address"}
            isPassword={false}
            value={form.email}
            placeholder={"Email address"}
            otherStyles={""} 
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <FormField
            title={"Password"}
            isPassword={true}
            value={form.password}
            placeholder={"Password"}
            otherStyles={"mt-3"}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          <button type="submit"
            className="block mx-auto btn-primary text-primary font-medium px-4 py-2 rounded-2xl w-[100px] my-3">
              Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login