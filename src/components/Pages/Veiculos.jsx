import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({});

  const navigate = useNavigate();

  function onSeeDetailsClick(veiculo) {
    const query = new URLSearchParams();
    query.set("modelo", veiculo.title);
    query.set("marca", veiculo.marca);
    query.set("cor", veiculo.modelo)
    query.set("quilometragem", veiculo.quilometragem)
    query.set("combustivel", veiculo.combustivel)
    query.set("valordiaria", veiculo.valorDiaria)
    query.set("valorseguro", veiculo.valorSeguro)
    query.set("disponivel", veiculo.disponivel)
    query.set("manutencao", veiculo.manutencao)
    query.set("dataultimamanutencao", veiculo.dataUltimaManutencao)
    query.set("datacadastro", veiculo.dataCadastro)
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

  const deletarVeiculo = async (id) => {
    try {
      await deleteDoc(doc(db, "veiculos", id));
      setVeiculos((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Erro ao deletar veículo:", error);
    }
  };

  const iniciarEdicao = (veiculo) => {
    setEditandoId(veiculo.id);
    setFormEdicao({ ...veiculo });
  };

  const salvarEdicao = async () => {
    try {
      const veiculoRef = doc(db, "veiculos", editandoId);
      await updateDoc(veiculoRef, formEdicao);
      setVeiculos((prev) =>
        prev.map((v) => (v.id === editandoId ? { ...v, ...formEdicao } : v))
      );
      setEditandoId(null);
      setFormEdicao({});
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEdicao((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Veículos Cadastrados</h2>
      {veiculos.length === 0 ? (
        <p>Nenhum veículo encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {veiculos.map((veiculo) => (
            <li key={veiculo.id} className="bg-white p-4 rounded shadow">
              {editandoId === veiculo.id ? (
                <div>
                  <input
                    name="title"
                    value={formEdicao.title}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Modelo"
                  />
                  <input
                    name="marca"
                    value={formEdicao.marca}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Marca"
                  />
                  <input
                    name="modelo"
                    value={formEdicao.modelo}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Modelo"
                  />
                  <input
                    name="placa"
                    value={formEdicao.placa}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Placa"
                  />
                  <input
                    name="quilometragem"
                    value={formEdicao.quilometragem}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Quilometragem"
                  />
                  <input
                    name="combustivel"
                    value={formEdicao.combustivel}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Combustível"
                  />
                  <input
                    name="valorDiaria"
                    value={formEdicao.valorDiaria}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Valor da Diária"
                  />
                  <input
                    name="valorSeguro"
                    value={formEdicao.valorSeguro}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Valor do Seguro"
                  />
                  <input
                    name="disponivel"
                    value={formEdicao.disponivel}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Disponibilidade"
                  />
                  <input
                    name="manutencao"
                    value={formEdicao.manutencao}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Manutenção"
                  />
                  <input
                    name="dataUltimaManutencao"
                    value={formEdicao.dataUltimaManutencao}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Data da Última Manutenção"
                  />
                  <input
                    name="dataCadastro"
                    value={formEdicao.dataCadastro}
                    onChange={handleChange}
                    className="border p-1 mb-1 w-full"
                    placeholder="Data de Cadastro"
                  />
                </div>
              ) : (
                <div className="w-[300px] h-[500px] bg-red-500">
                  <p><span className="font-bold">Modelo:</span> {veiculo.title}</p>
                  <p><span className="font-bold">Marca:</span> {veiculo.marca}</p>
                  <p><span className="font-bold">Cor:</span> {veiculo.modelo}</p>
                  <p><span className="font-bold">Placa:</span> {veiculo.placa}</p>
                  <p><span className="font-bold">Quilometragem:</span> {veiculo.quilometragem}</p>
                  <p><span className="font-bold">Combustível:</span> {veiculo.combustivel}</p>
                  <p><span className="font-bold">Valor da Diária:</span> {veiculo.valorDiaria}</p>
                  <p><span className="font-bold">Valor do Seguro:</span> {veiculo.valorSeguro}</p>
                  <p><span className="font-bold">Disponibilidade:</span> {veiculo.disponivel}</p>
                  <p><span className="font-bold">Manutenção:</span> {veiculo.manutencao}</p>
                  <p><span className="font-bold">Data da Última Manutenção:</span> {veiculo.dataUltimaManutencao}</p>
                  <p><span className="font-bold">Data de Cadastro:</span> {veiculo.dataCadastro}</p>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                {editandoId === veiculo.id ? (
                  <button
                    onClick={salvarEdicao}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Salvar
                  </button>
                ) : (
                  <button
                    onClick={() => iniciarEdicao(veiculo)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                )}

                <button
                  onClick={() => deletarVeiculo(veiculo.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Deletar
                </button>
                <button onClick={() => onSeeDetailsClick(veiculo)}>Details</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Veiculos;