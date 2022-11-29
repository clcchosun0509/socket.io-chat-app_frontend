import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import NotFound from "../pages/NotFound";

const LoggedInRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LoggedInRouter;
