import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { HeaderComponent } from "./components/organism";
import { HomePage } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact={true} />
        {/* <Route path="/asset" component={Listasset} />
        <Route path="/form/asset" component={CreateAsset} />
        <Route path="/view/asset/:kode" component={ViewAsset} />
        <Route path="/users" component={Users} />
        <Route path="/kategori" component={ListKategori} />
        <Route path="/form/kategori" component={CreateAsset} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
