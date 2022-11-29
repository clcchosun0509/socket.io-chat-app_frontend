import { useOutletContext } from "react-router-dom";
import Background from "../components/UI/Background";
import Card from "../components/UI/Card";
import BottomNavBar from "../components/BottomNavBar";
import { User } from "../service/type";
import TopNavBar from "../components/TopNavBar";

type ContextProps = {
  user: User;
};
const Profile = () => {
  const { user } = useOutletContext<ContextProps>();
  console.log("Profile user", user);

  return (
    <Background>
      <Card className="flex flex-col justify-between divide-y-2">
        <TopNavBar text="프로필" />
        <div className="h-full">Profile</div>
        <BottomNavBar active="profile" />
      </Card>
    </Background>
  );
};

export default Profile;
