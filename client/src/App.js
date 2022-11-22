import { BrowserRouter} from "react-router-dom";
import React  from "react";
import AuthProvider from "./providers/AuthProviders";
import { WebRouter, AdminRouter } from "./config";

import "./app.scss";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <WebRouter />
        <AdminRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
