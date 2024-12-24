import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import GetEmailPage from "../pages/edit/GetEmailPage";
import GetVideoPage from "../pages/edit/GetVideoPage";

function Router() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/edit1" element={<GetEmailPage />} />
                <Route path="/edit2" element={<GetVideoPage />} />
            </Routes>
        </div>
    );
}

export default Router;