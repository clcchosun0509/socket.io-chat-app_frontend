import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const LoggedOutRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LoggedOutRouter;
