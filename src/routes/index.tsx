import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapView from "../components/map/MapView";
import Welcome from "@/pages/Welcome";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/welcome" element={<Welcome/>} ></Route>
      </Routes>
    </Router>
  );
}
