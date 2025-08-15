import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

function CadastroVeiculos() {
  const [title, setTitle] = useState("");
  const [marca, setMarca] = useState("");
  const [placa, setPlaca] = useState("");
  const [cor, setCor] = useState("");
  const [quilometragem, setQuilometragem] = useState("");
  const [combustivel, setCombustivel] = useState("");
  const [valorDiaria, setValorDiaria] = useState("");
  const [valorSeguro, setValorSeguro] = useState("");
  const [disponivel, setDisponivel] = useState(true); // padrão: disponível
  const [manutencao, setManutencao] = useState("");
  const [dataUltimaManutencao, setDataUltimaManutencao] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Conversão da imagem para base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Cadastro do veículo
  const handleCadastro = async () => {
    if (
      !title ||
      !marca ||
      !placa ||
      !cor ||
      !quilometragem ||
      !combustivel ||
      !valorDiaria ||
      !valorSeguro ||
      disponivel === null ||
      !manutencao ||
      !dataUltimaManutencao ||
      !image
    ) {
      return alert("Preencha todos os campos!");
    }

    try {
      await addDoc(collection(db, "veiculos"), {
        image,
        title,
        marca,
        placa,
        cor,
        quilometragem,
        combustivel,
        valorDiaria,
        valorSeguro,
        disponivel, // booleano
        manutencao,
        dataUltimaManutencao,
        createdAt: new Date(),
      });

      alert("Veículo cadastrado com sucesso!");

      // Limpa campos
      setTitle("");
      setMarca("");
      setPlaca("");
      setCor("");
      setQuilometragem("");
      setCombustivel("");
      setValorDiaria("");
      setValorSeguro("");
      setDisponivel(true);
      setManutencao("");
      setDataUltimaManutencao("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      alert("Erro ao cadastrar!");
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-100 p-6">
      <section className="flex flex-col md:flex-row justify-center gap-10 items-start">
        {/* Informações Gerais */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Informações Gerais
          </h2>

          <label htmlFor="img" className="block text-sm font-medium text-gray-600">
            Insira a imagem do veículo:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="img"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {preview && (
            <div className="flex flex-col items-center mt-2">
              <p className="text-gray-500 text-sm mb-1">Pré-visualização:</p>
              <img src={preview} alt="Preview" className="w-48 h-32 object-cover rounded shadow" />
            </div>
          )}

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nome do Veículo"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <option value="Jeep">Jeep</option>
            <option value="Kia">Kia</option>
            <option value="Peugeot">Peugeot</option>
            <option value="Citroën">Citroën</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Audi">Audi</option>
            <option value="Volvo">Volvo</option>
            <option value="Land Rover">Land Rover</option>
            <option value="Lamborghini">Lamborghini</option>
          </select>

          <select
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            type="text"
            value={placa}
            onChange={(e) => {
              let v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
              if (v.length > 3) v = v.slice(0, 3) + "-" + v.slice(3, 7);
              if (v.length > 8) v = v.slice(0, 8);
              setPlaca(v);
            }}
            placeholder="Insira a Placa"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            value={quilometragem}
            onChange={(e) => {
              let v = e.target.value.replace(/\D/g, "").slice(0, 6);
              v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              setQuilometragem(v ? `${v} km` : "");
            }}
            placeholder="Insira a Quilometragem"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={combustivel}
            onChange={(e) => setCombustivel(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Combustível</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Etanol (Álcool)">Etanol (Álcool)</option>
            <option value="Diesel">Diesel</option>
            <option value="GNV (Gás Natural Veicular)">GNV (Gás Natural Veicular)</option>
            <option value="Elétrico">Elétrico</option>
            <option value="Híbrido (Gasolina + Elétrico)">Híbrido (Gasolina + Elétrico)</option>
            <option value="Híbrido (Etanol + Elétrico)">Híbrido (Etanol + Elétrico)</option>
            <option value="Flex (Gasolina + Etanol)">Flex (Gasolina + Etanol)</option>
          </select>
        </div>

        {/* Informações Financeiras */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Informações Financeiras
          </h2>

          <input
            type="text"
            value={valorDiaria}
            onChange={(e) => {
              let v = e.target.value.replace(/\D/g, "");
              v = (v / 100).toFixed(2);
              setValorDiaria(`R$ ${v.replace(".", ",")}`);
            }}
            placeholder="Valor da Diária"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="text"
            value={valorSeguro}
            onChange={(e) => {
              let v = e.target.value.replace(/\D/g, "");
              v = (v / 100).toFixed(2);
              setValorSeguro(`R$ ${v.replace(".", ",")}`);
            }}
            placeholder="Valor do Seguro"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Select booleano de disponibilidade */}
          <select
            value={disponivel.toString()}
            onChange={(e) => setDisponivel(e.target.value === "true")}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="true">Disponível</option>
            <option value="false">Indisponível</option>
          </select>

          <select
            value={manutencao}
            onChange={(e) => setManutencao(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Estado da manutenção</option>
            <option value="Em dia">Em dia</option>
            <option value="Precisa de Manutenção">Precisa de Manutenção</option>
          </select>

          <label htmlFor="ultimaManutencao" className="block text-sm font-medium text-gray-600">
            Data da última Manutenção:
          </label>
          <input
            type="date"
            value={dataUltimaManutencao}
            onChange={(e) => setDataUltimaManutencao(e.target.value)}
            id="ultimaManutencao"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </section>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleCadastro}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200"
        >
          Cadastrar Veículo
        </button>
      </div>
    </main>
  );
}

export default CadastroVeiculos;