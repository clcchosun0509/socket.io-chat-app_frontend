import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Background from "../components/ui/Background";
import Card from "../components/ui/Card";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket";
import { useCreateRoomMutation, useGetRoomsQuery } from "../service/room";
import { Room } from "../service/type";
import FullScreenSpinner from "../components/ui/FullScreenSpinner";
import RoomItem from "../components/ui/RoomItem";
import { useAppDispatch, useAppSelector } from "../store";
import { roomActions } from "../store/room";

const ChatRoomList = () => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { data: getRoomsData, isLoading: isGetRoomsLoading } = useGetRoomsQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const [createRoom, { isLoading: isCreateRoomLoading, error: createRoomError, isError: isCreateRoomError }] =
    useCreateRoomMutation();
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.room.rooms);

  useEffect(() => {
    if (getRoomsData) {
      dispatch(roomActions.setRooms(getRoomsData));
    }
  }, [getRoomsData, dispatch]);

  useEffect(() => {
    socket.on("onRoomsUpdate", (rooms: Room[]) => {
      dispatch(roomActions.setRooms(rooms));
    });

    return () => {
      socket.off("onRoomsUpdate");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    if (isCreateRoomError) {
      if (Array.isArray((createRoomError as any).data.error)) {
        (createRoomError as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error((createRoomError as any).data.message, {
          position: "top-right",
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateRoomLoading]);

  if (isGetRoomsLoading) {
    return <FullScreenSpinner />;
  }

  const joinRoomHandler = (roomId: string) => {
    navigate(`/chatroom/${roomId}`);
  };

  const roomElements = rooms.map((room) => (
    <RoomItem key={`room_el_${room.id}`} room={room} onClick={() => joinRoomHandler(room.id)} />
  ));

  return (
    <Background>
      <Card className="flex flex-col justify-between divide-y-2">
        <TopNavBar text="????????? ?????????" />
        <div className="h-full flex flex-col justify-between">
          <div>{roomElements}</div>
          <div className="flex m-2 h-16 border border-gray-600">
            <input
              className="flex-auto font-notoSans font-thin text-lg outline-none pl-4 placeholder:text-gray-700"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              placeholder="????????? ????????? ????????? ???????????????. (2 ~ 20??? ??????)"
            />
            <button
              className="flex px-4 flex-col justify-center items-center border-2 border-gray-500 font-notoSans font-thin text-base"
              onClick={() => createRoom(title)}
            >
              <p>?????????</p>
              <p>??????</p>
            </button>
          </div>
        </div>
        <BottomNavBar active="chat" onClickProfile={() => navigate("/profile")} />
      </Card>
    </Background>
  );
};

export default ChatRoomList;
