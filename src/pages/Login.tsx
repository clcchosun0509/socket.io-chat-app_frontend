import GoogleLoginButton from "../components/ui/GoogleLoginButton";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col bg-sky-400">
      <GoogleLoginButton onClick={() => {
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, "_self")
      }}/>
    </div>
  );
};

export default Login;
