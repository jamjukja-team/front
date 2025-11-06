import LoginView from "@/views/login/Login.view";

export default function LoginPage() {
  const login = async (email: string, password: string) => {
    // login 로직 및 유저 상태 저장
    console.log("Login attempt:", { email, password });
  };

  return <LoginView loginFn={login} />;
}
