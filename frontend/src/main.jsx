import React, {Suspense, lazy} from "react";
import ReactDOM from "react-dom/client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import api from "./redux/apiSlice";
import {Spiner} from './assets'
import "./index.css";


const Form = lazy(() => import('./components/Form'));
const App = lazy(()=> import('./App'));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<div className='flex justify-center items-center min-h-screen'><Spiner/></div>}>
    <ApiProvider api={api}>
    <BrowserRouter>
    <Routes>
      <Route path="/create" Component={Form}/>
      <Route path="/" Component={App}/>
    </Routes>
    </BrowserRouter>
    </ApiProvider>
    </Suspense>
    
  </React.StrictMode>
);
