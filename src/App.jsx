import { useEffect, useState } from "react";
import { agregarDocumento, obtenerDocumentos, actualizarDocumento, eliminarDocumento } from "./firebaseConfig";

function App() {
  const [datos, setDatos] = useState([]);
  const [nuevoDato, setNuevoDato] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const docs = await obtenerDocumentos("items");
    setDatos(docs);
  };

  const agregar = async () => {
    if (nuevoDato.trim() !== "") {
      await agregarDocumento("items", { nombre: nuevoDato });
      setNuevoDato("");
      cargarDatos();
    }
  };

  const actualizar = async (id) => {
    await actualizarDocumento("items", id, { nombre: "Actualizado" });
    cargarDatos();
  };

  const eliminar = async (id) => {
    await eliminarDocumento("items", id);
    cargarDatos();
  };

  return (
    <div>
      <h1>CRUD con Firebase</h1>
      <input 
        type="text" 
        value={nuevoDato} 
        onChange={(e) => setNuevoDato(e.target.value)} 
        placeholder="Nuevo dato"
      />
      <button onClick={agregar}>Agregar</button>

      <ul>
        {datos.map((item) => (
          <li key={item.id}>
            {item.nombre}
            <button onClick={() => actualizar(item.id)}>Actualizar</button>
            <button onClick={() => eliminar(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
