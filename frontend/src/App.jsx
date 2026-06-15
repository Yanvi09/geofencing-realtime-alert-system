import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Geofences from "./pages/Geofences";
import Vehicles from "./pages/Vehicles";
import Tracking from "./pages/Tracking";
import Alerts from "./pages/Alerts";
import Violations from "./pages/Violations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/geofences" element={<Geofences />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/violations" element={<Violations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;