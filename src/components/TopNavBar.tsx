import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

interface Props {
  text: string;
  backButtonRoute?: string;
  roomInfo?: {
    ownerUsername: string;
    numOfUsers: number;
  };
}
const TopNavBar = ({ text, backButtonRoute, roomInfo }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-fit flex flex-row items-center justify-between font-notoSans">
      <div className="flex h-14 flex-row items-center">
        <FontAwesomeIcon
          className="p-3 text-xl cursor-pointer"
          icon={faArrowLeft}
          size="2x"
          onClick={() => (backButtonRoute ? navigate(backButtonRoute) : navigate(-1))}
        />
        <p className="text-lg">{text}</p>
      </div>
      {roomInfo ? (
        <div className="flex flex-row items-center mr-3 font-thin text-gray-500 text-base">
          <p className="mr-4">{roomInfo.ownerUsername}</p>
          <FontAwesomeIcon className="mr-2" icon={faUser} size="1x" />
          <p>{roomInfo.numOfUsers}</p>
        </div>
      ) : null}
    </div>
  );
};

export default TopNavBar;
