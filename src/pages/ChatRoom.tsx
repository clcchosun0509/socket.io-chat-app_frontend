import { useContext, useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import Background from "../components/UI/Background";
import Card from "../components/UI/Card";
import FullScreenSpinner from "../components/UI/FullScreenSpinner";
import { SocketContext } from "../context/socket";
import { useGetRoomQuery } from "../service/room";
import { Room } from "../service/type";

type RoomAction = {
  type: "update";
  payload: Partial<Room>;
};

const roomReducer = (state: Room, action: RoomAction) => {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
  }
};

const ChatRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetRoomQuery(id!, {
    refetchOnMountOrArgChange: true,
  });
  const socket = useContext(SocketContext);
  const [room, roomDispatch] = useReducer(roomReducer, {
    id: "",
    title: "",
    numOfUsers: 0,
    ownerUsername: "",
    ownerAvatar: "",
    messages: [],
    updatedAt: new Date(),
  });

  useEffect(() => {
    if (data) {
      roomDispatch({type: "update", payload: data})
    }
  }, [data]);

  useEffect(() => {
    socket.emit("onRoomJoin", { roomId: id });
    socket.on("userRoomJoin", ({ username, numOfUsers }) => {
      roomDispatch({type: "update", payload: {numOfUsers}})
    });
    socket.on("userRoomLeave", ({ username, numOfUsers }) => {
      roomDispatch({type: "update", payload: {numOfUsers}})
    });
    return () => {
      socket.emit("onRoomLeave", { roomId: id });
      socket.off("userRoomJoin");
    };
  }, [id, socket]);

  if (isError) {
    navigate("/chatrooms");
  }
  if (isLoading || !data || !room) {
    return <FullScreenSpinner />;
  }

  return (
    <Background>
      <Card className="flex flex-col justify-between divide-y-2">
        <TopNavBar
          text={room.title}
          backButtonRoute="/chatrooms"
          roomInfo={{ ownerUsername: room.ownerUsername, numOfUsers: room.numOfUsers }}
        />
        <div className="h-full flex flex-col bg-sky-300">채팅방</div>
        <div className="h-56 flex flex-col">
          <textarea className="h-28 p-3 outline-none resize-none" />
          <div className="flex flex-auto flex-row justify-between items-center">
            <div />
            <button className="bg-sky-400 mr-[6px] p-3 py-2 p rounded-md flex flex-row justify-center items-center font-notoSans text-lg text-white">
              전송
            </button>
          </div>
        </div>
      </Card>
    </Background>
  );
};

export default ChatRoom;
