import {useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {
  text: string;
}
const TopNavBar = ({ text }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-14 flex flex-row items-center">
      <FontAwesomeIcon className="p-3 text-xl cursor-pointer" icon={faArrowLeft} size="2x" onClick={() => navigate(-1)}/>
      <p className="font-notoSans text-lg">{text}</p>
    </div>
  );
};

export default TopNavBar;
