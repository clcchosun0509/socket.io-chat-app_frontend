import { useDispatch } from "react-redux";
import { useGetMeQuery } from "./service/auth";
import { authActions } from "./store/auth";
import LoggedOutRouter from "./routers/LoggedOutRouter";
import LoggedInRouter from "./routers/LoggedInRouter";

const App = () => {
  const dispatch = useDispatch();
  const { data: userData, isLoading, isSuccess, isError, error } = useGetMeQuery();
  console.log("user", userData);
  console.log("error", error);

  if (isSuccess && userData) {
    dispatch(authActions.setUser(userData));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <LoggedOutRouter />;
  }

  return <LoggedInRouter />;
};

export default App;
