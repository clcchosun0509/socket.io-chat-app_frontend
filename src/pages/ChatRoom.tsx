import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import uuid from "react-uuid";
import TopNavBar from "../components/TopNavBar";
import Background from "../components/ui/Background";
import Card from "../components/ui/Card";
import FullScreenSpinner from "../components/ui/FullScreenSpinner";
import { SocketContext } from "../context/socket";
import { useGetRoomQuery } from "../service/room";
import { Message, Room } from "../service/type";

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
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      roomDispatch({ type: "update", payload: data });
    }
  }, [data]);

  useEffect(() => {
    socket.emit("onRoomJoin", { roomId: id });
    socket.on("userRoomJoin", ({ username, numOfUsers }) => {
      roomDispatch({ type: "update", payload: { numOfUsers } });
    });
    socket.on("userRoomLeave", ({ username, numOfUsers }) => {
      roomDispatch({ type: "update", payload: { numOfUsers } });
    });
    console.log('ddd')
    return () => {
      console.log("www")
      socket.emit("onRoomLeave", { roomId: id });
      socket.off("userRoomJoin");
    };
  }, [id, socket]);

  useEffect(() => {
    socket.on("getMessage", ({ username, avatar, message }) => {
      const messages = _.cloneDeep(room.messages);
      messages.push({ id: uuid(), isMine: false, username, avatar, content: message });
      roomDispatch({ type: "update", payload: { messages } });
    });
  }, [id, room.messages, socket])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [room.messages]);

  if (isError) {
    navigate("/chatrooms");
  }
  if (isLoading || !data || !room) {
    return <FullScreenSpinner />;
  }

  const sendMessage = () => {
    console.log("message sent", message);
    socket.emit("sendMessage", { roomId: room.id, message });
    const messages = _.cloneDeep(room.messages);
    messages.push({ id: uuid(), isMine: true, username: "", avatar: "", content: message });
    roomDispatch({ type: "update", payload: { messages } });
    setMessage("");
  };

  const messageElement = (message: Message) => {
    return (
      <div key={message.id} className="flex flex-row justify-start items-center m-4 mb-0 font-notoSans">
        <img className="flex h-14 rounded-2xl mr-2" alt="avatar" src={message.avatar} referrerPolicy="no-referrer" />
        <div>
          <p className="font-thin text-gray-500 mb-2">{message.username}</p>
          <p className="bg-white p-2 font-light inline-block">{message.content}</p>
        </div>
      </div>
    );
  };

  const myMessageElement = (message: Message) => {
    return (
      <div key={message.id} className="flex flex-row justify-end items-center m-4 mb-0">
        <p className="bg-amber-300 p-2 font-light">{message.content}</p>
      </div>
    );
  };

  const messageElements = () => {
    const elements: JSX.Element[] = [];

    room.messages.forEach((message) => {
      if (message.isMine) {
        elements.push(myMessageElement(message));
      } else {
        elements.push(messageElement(message));
      }
    });

    return elements;
  };

  return (
    <Background>
      <Card className="flex flex-col justify-between divide-y-2">
        <TopNavBar
          text={room.title}
          backButtonRoute="/chatrooms"
          roomInfo={{ ownerUsername: room.ownerUsername, numOfUsers: room.numOfUsers }}
        />
        <div className="h-full flex flex-col bg-sky-300 overflow-y-auto">
          {messageElements()}
          <div ref={messagesEndRef} />
        </div>
        <div className="h-56 flex flex-col">
          <textarea
            className="h-28 p-3 outline-none resize-none"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            value={message}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
              }
            }}
            onKeyUp={(event) => {
              event.preventDefault();
              console.log(message.trim().length);
              if (event.key === "Enter" && message.trim().length !== 0) {
                sendMessage();
              }
            }}
          />
          <div className="flex flex-auto flex-row justify-between items-center">
            <div />
            <button
              className="bg-sky-400 mr-[6px] p-3 py-2 p rounded-md flex flex-row justify-center items-center font-notoSans text-lg text-white disabled:bg-gray-300"
              onClick={() => sendMessage()}
              disabled={message.trim().length === 0}
            >
              전송
            </button>
          </div>
        </div>
      </Card>
    </Background>
  );
};

export default ChatRoom;
