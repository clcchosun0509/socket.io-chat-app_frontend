import { Room } from "../../service/type";
import elapsedTime from "../../utils/elapsedTime";

interface Props {
  room: Room;
}
const RoomItem = ({ room }: Props) => {
  return (
    <button className="flex flex-row h-20 p-3 font-notoSans w-full items-center">
      <img className="flex h-full rounded-2xl mr-4" alt="room owner avatar" src={room.owner.avatar} />
      <div className="flex flex-col flex-auto justify-center items-start">
        <p className="text-lg">{room.title}</p>
        <p className="text-sm font-thin">{room.owner.username}</p>
      </div>
      <p className="text-sm font-thin">{elapsedTime(room.updatedAt)}</p>
    </button>
  );
};

export default RoomItem;
