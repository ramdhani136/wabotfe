import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { HomePage, SettingsPage } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact={true} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
