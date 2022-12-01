import { useParams, useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import TopNavBar from "../components/TopNavBar";
import Background from "../components/UI/Background";
import Card from "../components/UI/Card";
import FullScreenSpinner from "../components/UI/FullScreenSpinner";
import { useGetRoomQuery } from "../service/room";

const ChatRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetRoomQuery(id!, {
    refetchOnMountOrArgChange: true,
  });
  if (isError) {
    navigate("/chatrooms");
  }
  if (isLoading || !data) {
    return <FullScreenSpinner />;
  }

  return (
    <Background>
      <Card className="flex flex-col justify-between divide-y-2">
        <TopNavBar
          text={data.title}
          backButtonRoute="/chatrooms"
          roomInfo={{ ownerUsername: data.ownerUsername, numOfUsers: data.numOfUsers }}
        />
        <div className="h-full flex flex-col">채팅방</div>
      </Card>
    </Background>
  );
};

export default ChatRoom;
