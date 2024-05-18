import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IEmpleado } from "../Interfaces/IEmpleado";

const initialEmpleado = {
  nombre: "",
  correo: "",
  sueldo: 0,
};

const CrearEmpleado = () => {
  const navigate = useNavigate();

  const [empleado, setEmpleado] = useState<IEmpleado>(initialEmpleado);

  const addEmpleado = async () => {
    if (!empleado.nombre || !empleado.correo || !empleado.sueldo) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son requeridos",
      });
      return;
    }

    const response = await fetch("http://localhost:5057/api/Empleado/Add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empleado),
    });
    const data = await response.json();
    console.log(data);

    Swal.fire({
      icon: "success",
      title: "Empleado creado",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/lista-empleados")  
    })
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const value = e.target.value;
    console.log(inputName, value)
    setEmpleado({ ...empleado, [inputName]: value });
  };

  const back = async () => {
    navigate("/lista-empleados");
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] mx-10 lg:mx-56 ">
      <form className="bg-white shadow-2xl rounded px-8 pt-6 pb-8  w-full">
        <div className="mb-6">
          <label
            className="block text-gray-700 text-2xl font-bold mb-2"
            htmlFor="Nombre"
          >
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Nombre"
            type="text"
            placeholder="Nombre"
            name="nombre"
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-2xl font-bold mb-2"
            htmlFor="Correo"
          >
            Correo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Correo"
            type="email"
            placeholder="Correo"
            onChange={handleChange}
            name="correo"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-2xl font-bold mb-2"
            htmlFor="Sueldo"
          >
            Sueldo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Sueldo"
            type="number"
            placeholder="Indique el sueldo"
            onChange={handleChange}
            name="sueldo"
          />
        </div>
        
        <div className="flex items-center justify-around">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={addEmpleado}
          >
            Crear
          </button>

          <button
            className="bg-slate-500 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={back}
          >
            Volver
          </button>
          
          
        </div>
      </form>
    </div>
  );
};

export default CrearEmpleado;
