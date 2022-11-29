import { useNavigate } from "react-router-dom";
import Background from "../components/UI/Background";
import Card from "../components/UI/Card";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";

const ChatRoomList = () => {
  const navigate = useNavigate();
  return (
    <Background>
      <Card className="flex flex-col justify-between divide-y-2">
        <TopNavBar text="채팅방 리스트" />
        <div className="h-full">main</div>
        <BottomNavBar active="chat" onClickProfile={() => navigate("/profile")} />
      </Card>
    </Background>
  );
};

export default ChatRoomList;
