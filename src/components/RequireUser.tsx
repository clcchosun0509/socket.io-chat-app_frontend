import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useGetMeQuery } from "../service/auth";
import { useAppSelector } from "../store";
import FullScreenSpinner from "./UI/FullScreenSpinner";

const RequireUser = () => {
  const [, , removeCookie] = useCookies(["logged_in"]);
  const user = useAppSelector((state) => state.auth.user);
  const { isLoading, isError } = useGetMeQuery("", { skip: !!user });

  if (isError) {
    removeCookie("logged_in");
    return <Navigate to="/" />;
  }

  if (isLoading || !user) {
    return <FullScreenSpinner />;
  }

  return <Outlet context={{user}} />;
};

export default RequireUser;