import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import StudentsPage from "./pages/StudentsPage";
import CheckinsPage from "./pages/CheckinsPage";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          <Routes>
            <Route path="/" element={<StudentsPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/checkins" element={<CheckinsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;