function ContactoCard({ nombre, telefono, correo, etiqueta, onEliminar, onEditar }) {
  return (
    <article className="bg-slate-800/90 rounded-2xl shadow-md border border-slate-700/80 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 backdrop-blur-sm">
      {/* Información principal del contacto */}
      <div>
        <h3 className="text-base font-bold text-white">
          {nombre}
        </h3>
        <p className="text-sm text-slate-300">
          Tel: {telefono}
        </p>
        <p className="text-sm text-slate-300">
          Correo: {correo}
        </p>
        {etiqueta && (
          <span className="inline-flex mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950 text-purple-300 border border-purple-800/60">
            {etiqueta}
          </span>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex gap-2 justify-end">
        {/* Botón Editar */}
        <button
          type="button"
          onClick={onEditar}
          className="text-xs md:text-sm px-3.5 py-2 rounded-xl border border-slate-600 bg-slate-700/80 text-slate-200 hover:bg-slate-600 hover:text-white font-semibold transition-all active:scale-95"
        >
          Editar
        </button>

        {/* Botón Eliminar */}
        <button
          type="button"
          onClick={onEliminar}
          className="text-xs md:text-sm px-3.5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500 font-semibold shadow-sm transition-all active:scale-95"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default ContactoCard;