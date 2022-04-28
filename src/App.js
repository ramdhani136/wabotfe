import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import {
  AutoReply,
  ContactPage,
  HomePage,
  KeyAndMenuPage,
  SalesGroupPage,
  SalesPage,
  SettingsPage,
} from "./pages";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} exact={true} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/bot" element={<AutoReply />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/key&menu" element={<KeyAndMenuPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/salesgroup" element={<SalesGroupPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
