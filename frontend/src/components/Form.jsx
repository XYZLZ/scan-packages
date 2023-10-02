import { useState } from "react"
import {useCreatePackageMutation} from '../redux/apiSlice'
import { useNavigate } from "react-router-dom"
const Form = () => {
    const navigate = useNavigate();
    const [createPackage] = useCreatePackageMutation()
    const [inputs, setInputs] = useState({codigo:'', nombre_paquete: ''});
    const handelChange = (e) => setInputs({...inputs, [e.target.name]: [e.target.value]})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = await createPackage({codigo:inputs.codigo.toString(), nombre_paquete:inputs.nombre_paquete.toString()});
        navigate('/');
        console.log(payload);
    }


  return (
    <div className="mx-auto max-w-xl mt-20">
        <form action className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="example1" className="mb-1 block text-sm font-medium text-gray-700">Codigo</label>
            <input type="text" id="codigo" name="codigo" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="(01)923840938(123)123112321"  onChange={handelChange} />
          </div>
          <div>
            <label htmlFor="example2" className="mb-1 block text-sm font-medium text-gray-700">Nombre del paquete</label>
            <input type="text" id="nombre_paquete" name="nombre_paquete" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Paquete1" onChange={handelChange} />
          </div>
          <button type="submit" className="rounded-lg border border-blue-500 bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300">Submit</button>
        </form>
      </div>
  )
}

export default Form