import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { useParams } from "react-router-dom";

function Locacao() {
  const { id } = useParams(); // ID do veículo
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cnh, setCnh] = useState("");
  const [cartao, setCartao] = useState("");
  const [idade, setIdade] = useState("");
  const [data, setData] = useState("");
  const [kmAtual, setKmAtual] = useState("");
  const [valorTotal, setValorTotal] = useState("");

  const handleCadastro = async () => {
    if (!nome || !cpf || !telefone || !email || !cnh || !cartao || !idade || !data || !kmAtual || !valorTotal) {
      return alert("Preencha todos os campos!");
    }

    try {
      await addDoc(collection(db, "locacoes"), {
        veiculoId: id,
        nome,
        cpf,
        telefone,
        email,
        cnh,
        cartao,
        idade,
        data,
        kmAtual,
        valorTotal,
        createdAt: new Date(),
      });

      alert("Locação cadastrada com sucesso!");

      // Limpa os campos
      setNome(""); setCpf(""); setTelefone(""); setEmail("");
      setCnh(""); setCartao(""); setIdade(""); setData("");
      setKmAtual(""); setValorTotal("");
    } catch (error) {
      console.error("Erro ao cadastrar locação:", error);
      alert("Erro ao cadastrar!");
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-100 p-6">
      <section className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Cadastro de Locação</h2>

        {/* Dados do locador */}
        <input
          type="text" value={nome} onChange={e => setNome(e.target.value)}
          placeholder="Nome" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text" value={cpf} onChange={e => setCpf(e.target.value)}
          placeholder="CPF" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text" value={telefone} onChange={e => setTelefone(e.target.value)}
          placeholder="Telefone" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="Email" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text" value={cnh} onChange={e => setCnh(e.target.value)}
          placeholder="CNH" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text" value={cartao} onChange={e => setCartao(e.target.value)}
          placeholder="Cartão de Crédito" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number" value={idade} onChange={e => setIdade(e.target.value)}
          placeholder="Idade" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
        />

        {/* Dados da locação */}
        <input
          type="date" value={data} onChange={e => setData(e.target.value)}
          placeholder="Data da locação" className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text" value={kmAtual} onChange={e => setKmAtual(e.target.value)}
          placeholder="Quilometragem atual do veículo" className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text" value={valorTotal} onChange={e => setValorTotal(e.target.value)}
          placeholder="Valor Total" className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400"
        />

        <div className="flex justify-center mt-4">
          <button
            onClick={handleCadastro}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200"
          >
            Finalizar Locação
          </button>
        </div>
      </section>
    </main>
  );
}

export default Locacao;