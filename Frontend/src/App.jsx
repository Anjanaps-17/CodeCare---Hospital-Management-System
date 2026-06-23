import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "../src/components/Auth/login";
import Dashboard from "./pages/Dashboard";
import Signup from "../src/components/Auth/Signup";
import AddPatient from "./pages/receptionist/AddPatient";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/receptionist/add-patient" element={<AddPatient />} />

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;