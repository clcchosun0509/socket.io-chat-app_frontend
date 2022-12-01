import { useOutletContext, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import Background from "../components/UI/Background";
import Card from "../components/UI/Card";
import BottomNavBar from "../components/BottomNavBar";
import { User } from "../service/type";
import TopNavBar from "../components/TopNavBar";
import ProfileItem from "../components/UI/ProfileItem";
import { useLogoutMutation } from "../service/auth";

type ContextProps = {
  user: User;
};
const Profile = () => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["logged_in"]);
  const { user } = useOutletContext<ContextProps>();
  const [logout, { isLoading, isSuccess, error, isError }] = useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      removeCookie("logged_in");
      navigate("/");
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: "top-right",
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Background>
      <Card className="flex flex-col justify-between divide-y-2">
        <TopNavBar text="프로필" />
        <div className="h-full flex flex-col justify-between">
          <div>
            <ProfileItem title="닉네임" content={user.username} />
            <ProfileItem title="이메일" content={user.email} />
            <ProfileItem title="아이디" content={user.id} />
          </div>
          <button
            className="m-3 h-16 bg-sky-400 rounded-md flex flex-row justify-center items-center"
            onClick={() => logout()}
          >
            <FontAwesomeIcon className="mr-2 text-xl" icon={faRightFromBracket} color="white" size="2x" />
            <p className="text-white text-xl font-notoSans">로그아웃</p>
          </button>
        </div>
        <BottomNavBar active="profile" onClickChat={() => navigate("/chatrooms")} />
      </Card>
    </Background>
  );
};

export default Profile;
