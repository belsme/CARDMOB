import { useState } from "react";
import Contato from "./Contato";

const ListaContato = () => {
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [editando, setEditando] = useState(null);

  const adicionarContato = () => {
    if (!nome || !telefone) return;
    if (editando) {
      setContatos(
        contatos.map((c) => (c.id === editando.id ? { id: c.id, nome, telefone } : c))
      );
      setEditando(null);
    } else {
      setContatos([...contatos, { id: Date.now(), nome, telefone }]);
    }
    setNome("");
    setTelefone("");
  };

  const editarContato = (contato) => {
    setNome(contato.nome);
    setTelefone(contato.telefone);
    setEditando(contato);
  };

  const excluirContato = (id) => {
    setContatos(contatos.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Contatos</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={adicionarContato}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          {editando ? "Salvar" : "Adicionar"}
        </button>
      </div>
      <div className="space-y-3">
        {contatos.map((contato) => (
          <Contato
            key={contato.id}
            contato={contato}
            onDelete={excluirContato}
            onEdit={editarContato}
          />
        ))}
      </div>
    </div>
  );
};

export default ListaContato;