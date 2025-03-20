// firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyA229ibz1Y7Z3ptf6bfEDTRLN88MYHKriI",
    authDomain: "clase-uno-55155.firebaseapp.com",
    projectId: "clase-uno-55155",
    storageBucket: "clase-uno-55155.firebasestorage.app",
    messagingSenderId: "571258876206",
    appId: "1:571258876206:web:ffbe89c6634bcf62ad0abf"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funciones CRUD
const agregarDocumento = async (coleccion, data) => {
  try {
    const docRef = await addDoc(collection(db, coleccion), data);
    console.log("Documento agregado con ID:", docRef.id);
  } catch (error) {
    console.error("Error al agregar documento:", error);
  }
};

const obtenerDocumentos = async (coleccion) => {
  try {
    const querySnapshot = await getDocs(collection(db, coleccion));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener documentos:", error);
  }
};

const actualizarDocumento = async (coleccion, id, data) => {
  try {
    const docRef = doc(db, coleccion, id);
    await updateDoc(docRef, data);
    console.log("Documento actualizado:", id);
  } catch (error) {
    console.error("Error al actualizar documento:", error);
  }
};

const eliminarDocumento = async (coleccion, id) => {
  try {
    await deleteDoc(doc(db, coleccion, id));
    console.log("Documento eliminado:", id);
  } catch (error) {
    console.error("Error al eliminar documento:", error);
  }
};

export { agregarDocumento, obtenerDocumentos, actualizarDocumento, eliminarDocumento };
