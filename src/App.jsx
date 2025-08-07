import { useState } from "react";
import Menu from "./components/Menu.jsx";
import Veiculos from "./components/Pages/Veiculos.jsx";

function App() {
  const [pages] = useState([
    { id: 1, title: "Financeiro", path: "Registros Financeiros" },
    { id: 2, title: "cadastro", path: "Catrastrar veículos" },
    { id: 3, title: "Relatorios", path: "Relatório de dados" },
    { id: 4, title: "Veiculos", path: "/veiculos" },
  ]);

  return (
    
    <main>
      <header className="w-full h-32 bg-slate-500 flex items-center justify-center">
      <ul>
        <li><Menu pages={pages} /></li>
      </ul>
    </header>
      <section>
      <div>
        <div className="w-full h-full flex justify-center">
          <h1 className="text-2xl font-bold mb-4">Pages</h1>
          
        </div>
      </div>
      </section>
    </main>
  );
}

export default App;
