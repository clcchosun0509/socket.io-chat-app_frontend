import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import GoogleIcon from "../../assets/google-icon.png";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  readonly className?: string;
};

const GoogleLoginButton = ({ className, ...props }: Props) => {
  return (
    <button className={`w-[223px] h-10 bg-white flex flex-row items-center rounded-sm drop-shadow-sm ${className}`} {...props}>
      <img className="w-7 m-2 shadow-md" alt="google icon" src={GoogleIcon} />
      <p className="mr-2 font-roboto">
        Google 계정으로 로그인
      </p>
    </button>
  );
};

export default GoogleLoginButton;
