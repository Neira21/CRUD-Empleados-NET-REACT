import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditarEmpleado from "./components/EditarEmpleado";
import CrearEmpleado from "./components/CrearEmpleado";
import ListaEmpleados from "./components/ListaEmpleados";


function App() {
  // bg gradient de tres colores 
  return (
    <main className="h-[100vh] 
    bg-gradient-to-r from-green-400 via-green-700 to-green-900
    px-10
    
    ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lista-empleados" element={<ListaEmpleados />} />
          <Route path="/crear-empleado" element={<CrearEmpleado />} />
          <Route path="/editar-empleado/:id" element={<EditarEmpleado />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
