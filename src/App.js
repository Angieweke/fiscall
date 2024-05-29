import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Profile from "./pages/Profile";
import Income from "./pages/Income";
import { useState } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const [profileURL, setProfileURL] = useState(null);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <Home profileURL={profileURL} setProfileURL={setProfileURL} />
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="income" element={<Income />} />
              <Route
                path="profile"
                element={
                  <Profile
                    profileURL={profileURL}
                    setProfileURL={setProfileURL}
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
