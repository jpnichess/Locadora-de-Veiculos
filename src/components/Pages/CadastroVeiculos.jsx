import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

function CadastroVeiculos() {
  const [title, setTitle] = useState("");
  const [marca, setMarca] = useState("");
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [quilometragem, setQuilometragem] = useState("");
  const [combustivel, setCombustivel] = useState("");
  const [valorDiaria, setValorDiaria] = useState("");
  const [valorSeguro, setValorSeguro] = useState("");
  const [disponivel, setDisponivel] = useState("");
  const [manutencao, setManutencao] = useState("");
  const [dataUltimaManutencao, setDataUltimaManutencao] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Converte imagem para base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Aqui está a string base64
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCadastro = async () => {
    if (
      !title || !marca || !placa || !modelo || !quilometragem ||
      !combustivel || !valorDiaria || !valorSeguro ||
      !disponivel || !manutencao || !dataUltimaManutencao || !image
    ) {
      return alert("Preencha todos os campos!");
    }

    try {
      await addDoc(collection(db, "veiculos"), {
        image, // salva base64
        title,
        marca,
        placa,
        modelo,
        quilometragem,
        combustivel,
        valorDiaria,
        valorSeguro,
        disponivel,
        manutencao,
        dataUltimaManutencao,
        createdAt: new Date(),
      });

      alert("Veículo cadastrado com sucesso!");

      // Limpa campos
      setTitle(""); setMarca(""); setPlaca(""); setModelo("");
      setQuilometragem(""); setCombustivel(""); setValorDiaria("");
      setValorSeguro(""); setDisponivel(""); setManutencao("");
      setDataUltimaManutencao(""); setImage(null); setPreview(null);
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      alert("Erro ao cadastrar!");
    }
  };

  return (
    <main className="w-full h-full">
      <section className="flex flex-col md:flex-row justify-start p-9 items-start text-center gap-10">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Informações Gerais</h2>
          <label htmlFor="img">Insira a imagem do veículo:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} id="img"/>
          {preview && (
            <div>
              <p>Pré-visualização:</p>
              <img src={preview} alt="Preview" style={{ width: 200 }} />
            </div>
          )}

          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nome do Veículo" className="w-full p-2 border rounded" />
          <input value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Marca" className="w-full p-2 border rounded" />
          <input value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Cor" className="w-full p-2 border rounded" />
          <input value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder="Placa" className="w-full p-2 border rounded" />
          <input value={quilometragem} onChange={(e) => setQuilometragem(e.target.value)} placeholder="Quilometragem" className="w-full p-2 border rounded" />
          <input value={combustivel} onChange={(e) => setCombustivel(e.target.value)} placeholder="Combustível" className="w-full p-2 border rounded" />
        </div>

        <div className="space-y-4 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Informações Financeiras</h2>
          <input value={valorDiaria} onChange={(e) => setValorDiaria(e.target.value)} placeholder="Valor da Diária" className="w-full p-2 border rounded" />
          <input value={valorSeguro} onChange={(e) => setValorSeguro(e.target.value)} placeholder="Valor do Seguro" className="w-full p-2 border rounded" />
          <input value={disponivel} onChange={(e) => setDisponivel(e.target.value)} placeholder="Disponibilidade" className="w-full p-2 border rounded" />
          <input value={manutencao} onChange={(e) => setManutencao(e.target.value)} placeholder="Última Manutenção" className="w-full p-2 border rounded" />
          <input value={dataUltimaManutencao} onChange={(e) => setDataUltimaManutencao(e.target.value)} placeholder="Data da Última Manutenção" className="w-full p-2 border rounded" />
        </div>

        <div className="items-center">
          <button onClick={handleCadastro} className="bg-blue-600 text-white px-4 py-2 rounded mt-4 md:mt-0 h-14">
            Cadastrar Veículo
          </button>
        </div>
      </section>
    </main>
  );
}

export default CadastroVeiculos;