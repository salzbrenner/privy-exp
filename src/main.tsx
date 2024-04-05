import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Privy from "./routes/privy";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      <BrowserRouter>
        <div id="sidebar">
          <nav>
            <ul>
              <li>
                <Link to={`/privy`}>Privy</Link>
              </li>
              <li>
                <Link to={`/`}>Home</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route element={<Root />} path="/" />
          <Route element={<Privy />} path="privy" />
        </Routes>
      </BrowserRouter>
    </>
  </React.StrictMode>
);
