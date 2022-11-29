import { useOutletContext, useNavigate } from "react-router-dom";
import Background from "../components/UI/Background";
import Card from "../components/UI/Card";
import BottomNavBar from "../components/BottomNavBar";
import { User } from "../service/type";
import TopNavBar from "../components/TopNavBar";
import ListItem from "../components/UI/ListItem";

type ContextProps = {
  user: User;
};
const Profile = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext<ContextProps>();

  return (
    <Background>
      <Card className="flex flex-col justify-between divide-y-2">
        <TopNavBar text="프로필" />
        <div className="h-full">
          <ListItem title="닉네임" content={user.username} />
          <ListItem title="이메일" content={user.email} />
          <ListItem title="아이디" content={user.id} />
        </div>
        <BottomNavBar active="profile" onClickChat={() => navigate("/chatroom")}/>
      </Card>
    </Background>
  );
};

export default Profile;
