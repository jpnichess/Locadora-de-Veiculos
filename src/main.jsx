import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./index.css";
import Relatorios from './components/Pages/Relatorios.jsx'
import Veiculos from './components/Pages/Veiculos.jsx'
import CadastroVeiculos from "./components/Pages/CadastroVeiculos.jsx";
import VeiculoDetail from "./components/Pages/VeiculoDetail.jsx";
import Financeiro from "./components/Pages/Financeiro.jsx"

const router = createBrowserRouter([
{
  path: "/",
  element: <App />,
},
{
  path: '/financeiro',
  element: <Financeiro />
},
{
  path: '/cadastro',
  element: <CadastroVeiculos />
},
{
  path: '/relatorios',
  element: <Relatorios />
},
{
  path: '/veiculos',
  element: <Veiculos />
},
{
  path: '/veiculos/:id',
  element: <VeiculoDetail />
}
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
  