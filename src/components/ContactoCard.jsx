export default function ContactoCard({ nombre, telefono, correo, etiqueta, onEliminar, empresa }) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{nombre}</h3>
      <p className="text-gray-700 mb-1">📞 {telefono}</p>
      <p>💌{correo}</p>
      {empresa && <p>{empresa}</p>}
      {etiqueta && <p>{etiqueta}</p>}
      <div className="flex justify-start">
        <button type="button" className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rpunded-lg transition-colors" onClick={() => onEliminar(correo)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}

