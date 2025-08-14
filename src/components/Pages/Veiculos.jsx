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
    query.set("cor", veiculo.modelo);
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
    <section className="w-full min-h-screen relative z-0">
      <h2 className="text-2xl font-bold">Veículos Cadastrados</h2>
      {veiculos.length === 0 ? (
        <p>Nenhum veículo encontrado.</p>
      ) : (
        <div className="px-5 py-12 max-w-7xl mx-auto flex flex-col relative z-10">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {veiculos.map((veiculo) => (
              <li
                key={veiculo.id}
                className="bg-white p-4 rounded shadow flex flex-col"
              >
                <div className="w-[300px] h-[500px] bg-red-500 rounded-lg flex justify-start items-center flex-col">
                  <h2 className="">
                    {veiculo.marca} {veiculo.title}
                  </h2>
                  <div className="w-[300px]">
                  <button onClick={() => onSeeDetailsClick(veiculo)}>
                    Details
                  </button>
                  </div>
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
