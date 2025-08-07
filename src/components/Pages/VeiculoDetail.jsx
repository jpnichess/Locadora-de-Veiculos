import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

function VeiculoDetail() {
  const { id } = useParams();
  const [veiculo, setVeiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        const ref = doc(db, "veiculos", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          setVeiculo(snapshot.data());
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

  

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Veículo</h2>
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

      <button
        onClick={() => navigate("/veiculos")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Voltar
      </button>
    </div>
  );
}

export default VeiculoDetail;
