import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useScanDetection from 'use-scan-detection-react18'

import {useCreatePackageMutation, useUpdatePackageMutation} from '../redux/apiSlice'
import {SuccessAlert} from '../utils/alerts'


const Form = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [createPackage] = useCreatePackageMutation()
    const [updatePackage] = useUpdatePackageMutation()
    const [inputs, setInputs] = useState({codigo:'', nombre_paquete: ''});
    const [isUpdate, setIsUpdate] = useState(false);
    const [code, setCode] = useState(false);
    const [error, setError] = useState(false);

    const id = searchParams.get('id');
    const handelChange = (e) => setInputs({...inputs, [e.target.name]: [e.target.value]})

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputs.codigo.toString() == "" || inputs.nombre_paquete.toString() == "") {
          setError(true);
          return false
        }
        if (isUpdate) {
          const payload = await updatePackage({codigo:inputs.codigo.toString(), nombre_paquete:inputs.nombre_paquete.toString(), id: parseInt(id)},)
          SuccessAlert('Updated Package', 'Paquete actualizado correctamente', 'success', 2000);
        setTimeout(() => {
          navigate('/');
        }, 2000);
        console.log(payload);
        return true
        }


        const payload = await createPackage({codigo:inputs.codigo.toString(), nombre_paquete:inputs.nombre_paquete.toString()});
        SuccessAlert('Created Package', 'Paquete creado correctamente', 'success', 2000);
        setTimeout(() => {
          navigate('/');
        }, 2000);
        console.log(payload);
    }

    useScanDetection({
      onComplete: setCode,
      onError: error => console.log(error),
      minLength:13
    })

    useEffect(() => {
      if (id) {
        setIsUpdate(true);
      }
    }, [id])


  return (
    <div className="mx-auto max-w-xl mt-20">
        <form action className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="example1" className="mb-1 block text-sm font-medium text-gray-700">Codigo</label>
            <input type="text" id="codigo" name="codigo" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="(01)923840938(123)123112321" value={code ? code: inputs.codigo}  onChange={handelChange} />
          </div>
          <div>
            <label htmlFor="example2" className="mb-1 block text-sm font-medium text-gray-700">Nombre del paquete</label>
            <input type="text" id="nombre_paquete" name="nombre_paquete" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Paquete1" onChange={handelChange} />
          </div>
          <button type="submit" className="w-full rounded-lg border border-blue-500 bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300">{id ? 'Actualizar' : 'Registrar'}</button>
          {error &&(
            <p className="text-red-500 text-center font-medium text-sm mb-1">{'Favor de Escribir en los campos'}</p>
          )}
        </form>
      </div>
  )
}

export default Form