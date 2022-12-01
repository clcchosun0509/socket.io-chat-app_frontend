import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Room } from "../../service/type";
import elapsedTime from "../../utils/elapsedTime";

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  room: Room;
};
const RoomItem = ({ room, ...props }: Props) => {
  return (
    <button className="flex flex-row h-20 p-3 font-notoSans w-full items-center" {...props}>
      <img className="flex h-full rounded-2xl mr-4" alt="room owner avatar" src={room.ownerAvatar} />
      <div className="flex flex-col flex-auto justify-center items-start">
        <p className="text-lg">{room.title}</p>
        <p className="text-sm font-thin">{room.ownerUsername}</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <p className="text-sm font-thin mr-2 text-gray-500">{room.numOfUsers}</p>
          <FontAwesomeIcon className="text-sm text-gray-500" icon={faUser} size="1x" />
        </div>
        <p className="text-sm font-thin">{elapsedTime(room.updatedAt)}</p>
      </div>
    </button>
  );
};

export default RoomItem;
