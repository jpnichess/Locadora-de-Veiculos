import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { Timestamp } from "firebase/firestore";

function VeiculoDetail() {
  const { id } = useParams();
  const [veiculo, setVeiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({});

  const labels = {
    title: "Nome do Veículo",
    marca: "Marca",
    placa: "Placa",
    modelo: "Cor",
    quilometragem: "Quilometragem",
    combustivel: "Combustível",
    valorDiaria: "Valor da Diário",
    valorSeguro: "Valor do Seguro",
    disponivel: "Disponibilidade",
    manutencao: "Valor da Última Manutenção",
    dataUltimaManutencao: "Data da última Manutenção",
  };

  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        const ref = doc(db, "veiculos", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          setVeiculo({ id: snapshot.id, ...snapshot.data() }); // <<< garante que tenha o ID
        } else {
          alert("Veículo não encontrado");
          navigate("/veiculos");
        }
      } catch (error) {
        console.error("Erro ao buscar veículo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVeiculo();
  }, [id, navigate]);

  if (loading) return <p>Carregando...</p>;

  const iniciarEdicao = (veiculo) => {
    setEditandoId(veiculo.id);
    setFormEdicao({ ...veiculo });
  };

  const salvarEdicao = async () => {
    try {
      const veiculoRef = doc(db, "veiculos", editandoId);
      await updateDoc(veiculoRef, formEdicao);
      setVeiculo({ ...formEdicao, id: editandoId }); // <<< atualiza um único objeto
      setEditandoId(null);
      setFormEdicao({});
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEdicao((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatarValor = (valor) => {
    if (
      valor?.seconds !== undefined &&
      valor?.nanoseconds !== undefined &&
      typeof valor.toDate === "function"
    ) {
      return valor.toDate().toLocaleDateString("pt-BR");
    }
    return valor;
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Veículo</h2>
      <ul className="space-y-4">
        <li className="bg-white p-4 rounded shadow">
          {editandoId === veiculo.id ? (
            <div>
              {Object.keys(formEdicao).map((campo) => (
                <input
                  key={campo}
                  name={campo}
                  value={formEdicao[campo] || ""}
                  onChange={handleChange}
                  className="border p-1 mb-1 w-full"
                  placeholder={campo}
                />
              ))}
            </div>
          ) : (
            <div className="w-[400px] h-[500px] bg-red-500 p-4 overflow-auto flex flex-col">
              {Object.entries(veiculo).map(([campo, valor]) => {
                if (campo === "id") return null; // ignora o id

                const label = labels[campo] || campo; // pega o label legível
                const valorFormatado = formatarValor(valor); // converte timestamp para data

                return (
                  <p key={campo}>
                    <span className="font-bold">{label}:</span> {valorFormatado}
                  </p>
                );
              })}
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
          </div>
        </li>
      </ul>
    </div>
  );
}

export default VeiculoDetail;
