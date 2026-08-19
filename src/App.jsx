import { useState, useEffect } from "react";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

export default function App() {

    const contactosGuardados = JSON.parse(localStorage.getItem("contactos")) || []; 

    const [contactos, setContactos] = useState(contactosGuardados);

    useEffect(() => {
        localStorage.setItem("contactos", JSON.stringify(contactos));
    }, [contactos]);

    const agregarContacto = (nuevo) => {
        setContactos((prev) => [...prev, nuevo]);
    };
    
    const eliminarContacto = (correo) => {
        setContactos((prev) => prev.filter((c) => c.correo !== correo));
    };

    return (
        <main className="min-h-screen py-10 px-4">
            <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">Agenda ADSO v3</h1> 
            <div className="max-w-4xl mx-auto">
            <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
            <FormularioContacto onAgregar={agregarContacto}/>
            </section>
            <section className="space-y-4">
            {contactos.map((c) => (
                <ContactoCard
                    key={c.correo}
                    {...c}
                    onEliminar={eliminarContacto}
                />
            ))}
                  </section> 
            </div>
        </main> 
    );
}