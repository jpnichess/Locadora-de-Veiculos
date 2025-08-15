import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

function VeiculoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [veiculo, setVeiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicao, setFormEdicao] = useState({});

  const labels = {
    title: "Modelo",
    marca: "Marca",
    placa: "Placa",
    cor: "Cor",
    image: "Foto",
    quilometragem: "Quilometragem",
    combustivel: "Combustível",
    valorDiaria: "Valor da Diária",
    valorSeguro: "Valor do Seguro",
    disponivel: "Disponibilidade",
    manutencao: "Estado da Manutenção",
    dataUltimaManutencao: "Data da Última Manutenção",
    createdAt: "Data de Cadastro",
  };

  const ordemCampos = [
    "image",
    "title",
    "marca",
    "cor",
    "placa",
    "quilometragem",
    "combustivel",
    "valorDiaria",
    "valorSeguro",
    "disponivel",
    "manutencao",
    "dataUltimaManutencao",
  ];

  const newLocate = () => {
    if (!veiculo.disponivel) {
      alert("Veículo indisponível para locação!");
      return;
    }
    // Navega para a página de locação, passando o id
    navigate(`/locacao/${veiculo.id}`);
  };

  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        const ref = doc(db, "veiculos", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          setVeiculo({ id: snapshot.id, ...snapshot.data() });
        } else {
          alert("Veículo não encontrado");
          navigate("/veiculos");
        }
      } catch (error) {
        console.error("Erro ao buscar o veículo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVeiculo();
  }, [id, navigate]);

  if (loading) return <p>Carregando...</p>;
  if (!veiculo) return <p>Veículo não encontrado.</p>;

  const iniciarEdicao = () => {
    setEditandoId(veiculo.id);
    setFormEdicao({ ...veiculo });
  };

  const salvarEdicao = async () => {
    try {
      const veiculoRef = doc(db, "veiculos", editandoId);
      const { id: _id, ...payload } = formEdicao;
      await updateDoc(veiculoRef, payload);
      setVeiculo({ ...payload, id: editandoId });
      setEditandoId(null);
      setFormEdicao({});
      alert("Edição salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
      alert("Erro ao salvar edição!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormEdicao((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const formatarValor = (valor) => {
    if (valor?.seconds !== undefined && typeof valor.toDate === "function") {
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
            <div className="flex flex-col gap-3">
              {/* Preview da imagem */}
              {formEdicao.image && (
                <img
                  src={formEdicao.image}
                  alt={formEdicao.title || "Imagem do veículo"}
                  style={{ width: 300, height: "auto", objectFit: "cover" }}
                />
              )}
              <div>
                <label className="font-medium">Trocar imagem:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {/* Inputs padronizados */}
              <input
                value={formEdicao.title || ""}
                onChange={(e) =>
                  setFormEdicao({ ...formEdicao, title: e.target.value })
                }
                placeholder="Nome do Veículo"
                className="w-full p-2 border rounded"
              />

              <select
                value={formEdicao.marca || ""}
                onChange={(e) =>
                  setFormEdicao({ ...formEdicao, marca: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione a Marca</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Fiat">Fiat</option>
                <option value="Ford">Ford</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Honda">Honda</option>
                <option value="Toyota">Toyota</option>
                <option value="Renault">Renault</option>
                <option value="Nissan">Nissan</option>
                <option value="Hyundai">Hyundai</option>
              </select>

              <select
                value={formEdicao.cor || ""}
                onChange={(e) =>
                  setFormEdicao({ ...formEdicao, cor: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione a cor</option>
                <option value="Branco">Branco</option>
                <option value="Preto">Preto</option>
                <option value="Prata">Prata</option>
                <option value="Cinza">Cinza</option>
                <option value="Vermelho">Vermelho</option>
                <option value="Azul">Azul</option>
              </select>

              <input
                value={formEdicao.placa || ""}
                onChange={(e) => {
                  let v = e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "");
                  if (v.length > 3) v = v.slice(0, 3) + "-" + v.slice(3, 7);
                  if (v.length > 8) v = v.slice(0, 8);
                  setFormEdicao({ ...formEdicao, placa: v });
                }}
                placeholder="Insira a Placa"
                className="w-full p-2 border rounded"
              />

              <input
                value={formEdicao.quilometragem || ""}
                onChange={(e) => {
                  // remove tudo que não for número
                  let v = e.target.value.replace(/\D/g, "").slice(0, 6);

                  // adiciona ponto a cada milhar
                  v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                  setFormEdicao({
                    ...formEdicao,
                    quilometragem: v ? `${v} km` : "",
                  });
                }}
                placeholder="Insira a Quilometragem"
                className="w-full p-2 border rounded"
              />

              <select
                value={formEdicao.combustivel || ""}
                onChange={(e) =>
                  setFormEdicao({ ...formEdicao, combustivel: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione o Combustível</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Etanol (Álcool)">Etanol (Álcool)</option>
                <option value="Diesel">Diesel</option>
                <option value="GNV (Gás Natural Veicular)">
                  GNV (Gás Natural Veicular)
                </option>
                <option value="Elétrico">Elétrico</option>
                <option value="Híbrido (Gasolina + Elétrico)">
                  Híbrido (Gasolina + Elétrico)
                </option>
                <option value="Flex (Gasolina + Etanol)">
                  Flex (Gasolina + Etanol)
                </option>
              </select>

              <input
                value={formEdicao.valorDiaria || ""}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "");
                  v = (v / 100).toFixed(2);
                  setFormEdicao({
                    ...formEdicao,
                    valorDiaria: `R$ ${v.replace(".", ",")}`,
                  });
                }}
                placeholder="Valor da Diária"
                className="w-full p-2 border rounded"
              />

              <input
                value={formEdicao.valorSeguro || ""}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "");
                  v = (v / 100).toFixed(2);
                  setFormEdicao({
                    ...formEdicao,
                    valorSeguro: `R$ ${v.replace(".", ",")}`,
                  });
                }}
                placeholder="Valor do Seguro"
                className="w-full p-2 border rounded"
              />

              <select
                value={
                  formEdicao.disponivel === null
                    ? ""
                    : formEdicao.disponivel.toString()
                }
                onChange={(e) =>
                  setFormEdicao({
                    ...formEdicao,
                    disponivel: e.target.value === "true",
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione a disponibilidade</option>
                <option value="true">Disponível</option>
                <option value="false">Indisponível</option>
              </select>

              <select
                value={formEdicao.manutencao || ""}
                onChange={(e) =>
                  setFormEdicao({ ...formEdicao, manutencao: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Estado da manutenção</option>
                <option value="Em dia">Em dia</option>
                <option value="Precisa de Manutenção">
                  Precisa de Manutenção
                </option>
              </select>

              <input
                type="date"
                value={formEdicao.dataUltimaManutencao || ""}
                onChange={(e) =>
                  setFormEdicao({
                    ...formEdicao,
                    dataUltimaManutencao: e.target.value,
                  })
                }
                placeholder="Data da Última Manutenção"
                className="w-full p-2 border rounded"
              />

              <button
                onClick={salvarEdicao}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mt-2"
              >
                Salvar
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {veiculo.image && (
                <img
                  src={veiculo.image}
                  alt={veiculo.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: 300,
                    objectFit: "cover",
                  }}
                />
              )}
              {ordemCampos.map((campo) => {
                if (campo === "image") return null;
                const valor = veiculo[campo];
                if (!valor) return null;
                return (
                  <p key={campo}>
                    <span className="font-bold">{labels[campo] || campo}:</span>{" "}
                    {formatarValor(valor)}
                  </p>
                );
              })}

              <div className="flex">
                <button
                  onClick={iniciarEdicao}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mt-2 w-[47.5%] mr-[2.5%]"
                >
                  Editar
                </button>
                <button
                  onClick={newLocate}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mt-2 w-[47.5%] ml-[2.5%]"
                >
                  Locar
                </button>
              </div>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default VeiculoDetail;
