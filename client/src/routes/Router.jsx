import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import GetEmailPage from "../pages/edit/GetEmailPage";

function Router() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/edit1" element={<GetEmailPage />} />
            </Routes>
        </div>
    );
}

export default Router;