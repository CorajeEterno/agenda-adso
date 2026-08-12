import { useState } from "react";
import "./App.css";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto"

export default function App(){
    const [contactos, setContactos] = useState ([
        {
            id: 1,
            nombre: "Carolina Pérez",
            telefono: "300 123 4567",
            correo: "carolina@sena.edu.co",
            etiqueta: "ejemplo"
        }
    ]);

    const agregarContacto = (nuevo) => {
        setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }]);
    };

    const eliminarContacto = (id) => {
        setContactos((prev) => prev.filter((c) => c.id !== id));
    };
    return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO 📒</h1>

      <p className="app-subtitle">Contactos guardados</p>
         <FormularioContacto onAgregar={agregarContacto} />

         <section className="lista-contactos">
      {contactos.map((c) => (
        <ContactoCard
          key={c.id}            
          nombre={c.nombre}     
          telefono={c.telefono} 
          correo={c.correo}     
          etiqueta={c.etiqueta} 
          onDelete={() => eliminarContacto(c.id)}
        />
      ))}

      <p className="app-nota">
      </p>
      </section>
    </main>
    );
}