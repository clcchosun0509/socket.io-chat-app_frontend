import { Route, Routes } from "react-router-dom";
import RequireUser from "./components/RequireUser";
import ChatRoomList from "./pages/ChatRoomList";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<RequireUser />}>
            <Route path="/chatrooms" element={<ChatRoomList />} />
          </Route>
          <Route element={<RequireUser />}>
            <Route path="/chatroom/:id" element={<ChatRoom />} />
          </Route>
          <Route element={<RequireUser />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
