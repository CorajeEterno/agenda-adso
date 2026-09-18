import { useState } from "react";

function FormularioContacto({
  onAgregar,
  onActualizar,
  contactoEnEdicion,
  onCancelarEdicion,
}) {
  // 1. Creamos la "memoria" (estado) para guardar lo que el usuario escribe en los inputs
  const [form, setForm] = useState({
    nombre: contactoEnEdicion?.nombre || "",
    telefono: contactoEnEdicion?.telefono || "",
    correo: contactoEnEdicion?.correo || "",
    etiqueta: contactoEnEdicion?.etiqueta || "",
  });

  // Estado para guardar los mensajes de error si algo sale mal
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  // Estado para saber cuándo el formulario se está enviando y bloquear el botón
  const [enviando, setEnviando] = useState(false);

  // 2. Guardamos el ID del contacto que se está editando para saber si cambia
  const [idAnterior, setIdAnterior] = useState(contactoEnEdicion?.id);

  // 3. Si seleccionas otro contacto para editar, rellenamos el formulario al instante
  if (contactoEnEdicion?.id !== idAnterior) {
    setIdAnterior(contactoEnEdicion?.id);
    setForm({
      nombre: contactoEnEdicion?.nombre || "",
      telefono: contactoEnEdicion?.telefono || "",
      correo: contactoEnEdicion?.correo || "",
      etiqueta: contactoEnEdicion?.etiqueta || "",
    });
    setErrores({ nombre: "", telefono: "", correo: "" });
  }

  // Cada vez que escribes algo, esta función actualiza el campo correspondiente
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Función para revisar que los datos estén bien escritos antes de enviarlos
  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };

    // Validar que el nombre no esté vacío y solo tenga letras
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre.trim())) {
      nuevosErrores.nombre = "El nombre solo debe contener letras.";
    }

    // Validar que el teléfono sea obligatorio y tenga exactamente 10 números
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (!/^\d{10}$/.test(form.telefono.trim())) {
      nuevosErrores.telefono = "El teléfono debe tener exactamente 10 dígitos numéricos.";
    }

    // Validar el correo y que tenga el símbolo @
    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    // Retorna true si no hay ningún error en los campos
    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  }

  // Función que se ejecuta cuando le das clic al botón de guardar
  const onSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue sola

    const esValido = validarFormulario();
    if (!esValido) return; // Si hay errores, no dejamos pasar

    try {
      setEnviando(true); // Activamos el estado de carga

      if (contactoEnEdicion) {
        // SI ESTAMOS EDITANDO: Mandamos a actualizar el contacto existente
        await onActualizar({
          ...form,
          id: contactoEnEdicion.id,
        });

        // Limpiamos todo y salimos del modo edición
        setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
        setErrores({ nombre: "", telefono: "", correo: "" });
        if (onCancelarEdicion) onCancelarEdicion();
        
      } else {
        // SI ESTAMOS CREANDO: Guardamos un contacto nuevo
        await onAgregar(form);

        // Limpiamos el formulario para dejarlo listo para otro
        setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
        setErrores({ nombre: "", telefono: "", correo: "" });
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un problema al guardar el contacto.");
    } finally {
      setEnviando(false); // Quitamos el estado de carga pase lo que pase
    }
  };

  // Textos que cambian solitos dependiendo de si estamos creando o editando
  const estaEnEdicion = Boolean(contactoEnEdicion);
  const tituloFormulario = estaEnEdicion ? "Editar contacto" : "Nuevo contacto";
  const textoBotonPrincipal = estaEnEdicion ? "Guardar cambios" : "Agregar contacto";

  return (
    <form
      className="bg-slate-800/90 shadow-xl border border-slate-700/80 rounded-2xl p-6 space-y-4 mb-8 backdrop-blur-sm"
      onSubmit={onSubmit}
    >
      <h2 className="text-lg font-bold text-white mb-2">
        {tituloFormulario}
      </h2>

      {/* Input de Nombre */}
      <div>
        <label className="block text-sm font-semibold text-slate-200 mb-1">
          Nombre *
        </label>
        <input
          className="w-full rounded-xl bg-slate-900 border-2 border-slate-700 text-white placeholder-slate-400 px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all shadow-inner"
          name="nombre"
          placeholder="Ej: Camila Pérez"
          value={form.nombre}
          onChange={onChange}
        />
        {/* Si hay error en nombre, mostramos un mensajito rojo legible */}
        {errores.nombre && (
          <p className="mt-1 text-xs font-semibold text-red-400">{errores.nombre}</p>
        )}
      </div>

      {/* Input de Teléfono */}
      <div>
        <label className="block text-sm font-semibold text-slate-200 mb-1">
          Teléfono *
        </label>
        <input
          className="w-full rounded-xl bg-slate-900 border-2 border-slate-700 text-white placeholder-slate-400 px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all shadow-inner"
          name="telefono"
          placeholder="Ej: 3001234567"
          value={form.telefono}
          onChange={onChange}
        />
        {errores.telefono && (
          <p className="mt-1 text-xs font-semibold text-red-400">{errores.telefono}</p>
        )}
      </div>

      {/* Input de Correo */}
      <div>
        <label className="block text-sm font-semibold text-slate-200 mb-1">
          Correo *
        </label>
        <input
          className="w-full rounded-xl bg-slate-900 border-2 border-slate-700 text-white placeholder-slate-400 px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all shadow-inner"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />
        {errores.correo && (
          <p className="mt-1 text-xs font-semibold text-red-400">{errores.correo}</p>
        )}
      </div>

      {/* Input de Etiqueta */}
      <div>
        <label className="block text-sm font-semibold text-slate-200 mb-1">
          Etiqueta (opcional)
        </label>
        <input
          className="w-full rounded-xl bg-slate-900 border-2 border-slate-700 text-white placeholder-slate-400 px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all shadow-inner"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      {/* Botones de acción */}
      <div className="pt-2 flex flex-col md:flex-row md:items-center gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 disabled:text-purple-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all active:scale-95"
        >
          {enviando ? "Guardando..." : textoBotonPrincipal}
        </button>

        {/* Este botón de cancelar solo aparece cuando estás editando */}
        {estaEnEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="w-full md:w-auto bg-slate-700 text-slate-200 px-6 py-3 rounded-xl border border-slate-600 hover:bg-slate-600 font-semibold text-sm transition-all active:scale-95"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioContacto;