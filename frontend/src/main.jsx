import React from "react";
import ReactDOM from "react-dom/client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Form from './components/Form'
import api from "./redux/apiSlice";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={api}>
    <BrowserRouter>
    <Routes>
      <Route path="/create" Component={Form}/>
      <Route path="/" Component={App}/>
    </Routes>
    </BrowserRouter>
    </ApiProvider>
    
  </React.StrictMode>
);
