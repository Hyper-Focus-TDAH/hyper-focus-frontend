import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fonts/littlepea/LittlePea-Demo-Regular.ttf'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
