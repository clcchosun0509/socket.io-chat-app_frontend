import { Route, Routes } from "react-router-dom";
import RequireUser from "./components/RequireUser";
import ChatRoomList from "./pages/ChatRoomList";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chatroom" element={<ChatRoomList />} />
        <Route element={<RequireUser />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
