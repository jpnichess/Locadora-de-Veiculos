import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]); // Lista de veículos cadastrados
  const navigate = useNavigate();

  function onSeeDetailsClick(veiculo) {
    const query = new URLSearchParams();
    query.set("image", veiculo.image);
    query.set("modelo", veiculo.title);
    query.set("marca", veiculo.marca);
    query.set("cor", veiculo.cor);
    query.set("quilometragem", veiculo.quilometragem);
    query.set("combustivel", veiculo.combustivel);
    query.set("valordiaria", veiculo.valorDiaria);
    query.set("valorseguro", veiculo.valorSeguro);
    query.set("disponivel", veiculo.disponivel);
    query.set("manutencao", veiculo.manutencao);
    query.set("dataultimamanutencao", veiculo.dataUltimaManutencao);

    navigate(`/veiculos/${veiculo.id}`);
  }

  useEffect(() => {
    const buscarCarros = async () => {
      const querySnapshot = await getDocs(collection(db, "veiculos"));
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVeiculos(lista);
    };
    buscarCarros();
  }, []);

  // const deletarVeiculo = async (id) => {
  //   try {
  //     await deleteDoc(doc(db, "veiculos", id));
  //     setVeiculos((prev) => prev.filter((v) => v.id !== id));
  //   } catch (error) {
  //     console.error("Erro ao deletar veículo:", error);
  //   }
  // };

  return (
    <section className="w-full min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Veículos Cadastrados
      </h2>

      {veiculos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum veículo encontrado.</p>
      ) : (
        <div className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {veiculos.map((veiculo) => (
              <li
                key={veiculo.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center transition-transform transform hover:scale-105"
              >
                {/* Imagem centralizada */}
                <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
                  <img
                    src={veiculo.image}
                    alt={`${veiculo.marca} ${veiculo.title}`}
                    className="object-cover h-full w-full"
                  />
                </div>

                {/* Informações do veículo */}
                <div className="p-4 flex flex-col items-center text-center space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {veiculo.marca} {veiculo.title}
                  </h3>
                  <p className="text-gray-600">{veiculo.modelo}</p>
                  <p className="text-gray-600">{veiculo.placa}</p>
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      veiculo.disponivel ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {veiculo.disponivel ? "Disponível" : "Indisponível"}
                  </span>
                </div>

                {/* Botão de detalhes */}
                <div className="w-full p-4 flex justify-center">
                  <button
                    onClick={() => onSeeDetailsClick(veiculo)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Detalhes
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default Veiculos;
