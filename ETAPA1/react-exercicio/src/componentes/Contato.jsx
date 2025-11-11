import { useState } from "react";

const Contato = ({ contato, onDelete, onEdit }) => {
  return (
    <div className="p-4 border rounded-lg flex justify-between items-center shadow-md">
      <div>
        <p className="text-lg font-semibold">{contato.nome}</p>
        <p className="text-gray-600">{contato.telefone}</p>
      </div>
      <div>
        <button
          onClick={() => onEdit(contato)}
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(contato.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Contato;