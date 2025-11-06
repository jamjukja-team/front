import RegisterView from "@/views/register/Register.view";
import { registerEmployee } from "@/services/employeeService";

export default function RegisterPage() {
  const handleRegister = async (data: {
    email: string;
    password: string;
    emp_nm: string;
    birth_date: string;
    hire_date: string;
    dept_id: string;
    grade_id: string;
    photo: string;
  }) => {
    try {
      const response = await registerEmployee(data);
      console.log("Register success:", response);
      // 성공 시 로그인 페이지로 리다이렉트 또는 다른 처리
    } catch (error) {
      console.error("Register error:", error);
      // 에러 처리
    }
  };

  return <RegisterView registerFn={handleRegister} />;
}
