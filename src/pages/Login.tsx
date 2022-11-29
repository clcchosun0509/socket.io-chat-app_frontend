import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Background from "../components/UI/Background";
import Card from "../components/UI/Card";
import GoogleLoginButton from "../components/UI/GoogleLoginButton";

const Login = () => {
  const [cookies] = useCookies(["logged_in"]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (cookies.logged_in) {
      navigate("/chatroom");
    }
  }, [cookies.logged_in, navigate]);

  return (
    <Background>
      <Card className="flex justify-center items-center">
        <GoogleLoginButton
          onClick={() => {
            window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, "_self");
          }}
        />
      </Card>
    </Background>
  );
};

export default Login;
