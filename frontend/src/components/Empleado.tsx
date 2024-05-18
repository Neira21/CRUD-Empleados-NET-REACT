
import { IEmpleado } from "../Interfaces/IEmpleado";
import { useNavigate } from "react-router-dom";
type Props = {
  empleado: IEmpleado;
  eliminarEmpleado: (id: number) => void;
};

const Empleado = ({ empleado, eliminarEmpleado }: Props) => {
  const navigate = useNavigate();

  

  const editarEmpleado = async (id: number) => {
    navigate(`/editar-empleado/${id}`);
  };

  return (
    <tr
      key={empleado.id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {empleado.nombre}
      </th>
      <td className="px-6 py-4">{empleado.nombre}</td>
      <td className="px-6 py-4">{empleado.correo}</td>
      <td className="px-6 py-4">${empleado.sueldo}</td>
      <td className="flex gap-x-2  justify-center items-center h-16">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => editarEmpleado(empleado.id ? empleado.id : 0)}
        >
          Editar
        </button>

        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => eliminarEmpleado(empleado.id ? empleado.id : 0)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Empleado;
