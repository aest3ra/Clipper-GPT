import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";

function Router() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </div>
    );
}

export default Router;