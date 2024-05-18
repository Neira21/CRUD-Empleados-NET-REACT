import { useEffect, useState } from "react";
import { IEmpleado } from "../Interfaces/IEmpleado";
import Empleado from "./Empleado";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState<IEmpleado[]>([]);
  const navigate = useNavigate();

  const eliminarEmpleado = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este empleado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:5057/api/Empleado/Delete/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (data) {
          Swal.fire("Eliminado!", "El empleado ha sido eliminado.", "success");
          navigate("/lista-empleados");
        }
      }
    });
  };

  useEffect(() => {
    console.log("Lista de Empleados");
    const empleadosapi = async () => {
      try {
        const response = await fetch("http://localhost:5057/api/Empleado/List");
        const data = await response.json();
        console.log(data);
        setEmpleados(data);
      } catch (error) {
        console.log(error);
      }
    };
    empleadosapi();
  }, [empleados]);

  return (
    <>
      <div className="flex justify-center items-center h-16">
        <h1 className="text-4xl">LISTA DE EMPLEADOS</h1>
      </div>

      <div>
      
      <div className="flex self-start ">
      <Link className="bg-blue-600 hover:bg-blue-800 text-white p-4 my-10" to="/crear-empleado">Crear Empleado</Link>
      </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre de Empleado
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Correo
              </th>
              <th scope="col" className="px-6 py-3">
                Sueldo
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
          {empleados.map((empleado) => (
            <Empleado key={empleado.id} empleado={empleado} eliminarEmpleado={eliminarEmpleado} />
          ))}
          </tbody>
        </table>
      </div>

      
    </>
  );
};

export default ListaEmpleados;
