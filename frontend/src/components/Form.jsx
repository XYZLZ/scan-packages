import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useScanDetection from 'use-scan-detection-react18'

import {useCreatePackageMutation, useUpdatePackageMutation, useWeightPackageMutation} from '../redux/apiSlice'
import {SuccessAlert, inputAlert} from '../utils/alerts'
import {getById} from '../services'


const Form = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [createPackage] = useCreatePackageMutation()
    const [updatePackage] = useUpdatePackageMutation()
    const [updateWeight] = useWeightPackageMutation()
    const [inputs, setInputs] = useState({codigo:'', nombre_paquete: ''});
    const [isUpdate, setIsUpdate] = useState(false);
    const [code, setCode] = useState(false);
    // const [error, setError] = useState(false);
    
    const id = searchParams.get('id');

    const handelChange = (e) => setInputs({...inputs, [e.target.name]: [e.target.value]})

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputs.nombre_paquete.toString() == "" && e.target.name != 'btn_submit') {
          // setError(true);
          return false;
        }
        if (isUpdate) {
          const payload = await updatePackage({codigo:inputs.codigo.toString(), nombre_paquete:inputs.nombre_paquete.toString(), id: parseInt(id)},)

          if (payload.error) return SuccessAlert('Error', 'Ingresa todos los campos', 'error', 5000);
          if (payload.data) {
            const options = payload.data.weightOptions.map(item => item / 100);

            inputAlert('Elige el peso correcto del paquete', `1-(${options[0]}), 2-(${options[1]}), 3-(${options[2]})`, 'text', 'Enviar').then(async res => {
              if (res.isConfirmed) {
                if(res.value == '1') await updateWeight({weight: payload.data.weightOptions[0], id})
                if(res.value == '2') await updateWeight({weight: payload.data.weightOptions[1], id})
                if(res.value == '3') await updateWeight({weight: payload.data.weightOptions[2], id})
                if(res.value > '3' || res.value < 0 || !parseInt(res.value)) return SuccessAlert('Error', 'Solo colocar el numero opcion (1,2,3)', 'error', 5000);
                SuccessAlert('Updated Package', 'Paquete actualizado correctamente', 'success', 2000);
                setTimeout(() => {
                  navigate('/');
                }, 2000);
                return true;
              }else {
                SuccessAlert('Update Package', 'Se ha actualizada el paquete mas no su peso', 'warning', 2000);
                setTimeout(() => {
                  navigate('/');
                }, 2000);
              }
            })
          }
        console.log(payload);
        }


        const payload = await createPackage({codigo:inputs.codigo.toString(), nombre_paquete:inputs.nombre_paquete.toString()});
        if (payload.error) return SuccessAlert('Error', 'Ingresa todos los campos', 'error', 5000);
        if (payload.data) {
          const options = payload.data.weightOptions.map(item => item / 100);

          inputAlert('Elige el peso correcto del paquete', `1-(${options[0]}), 2-(${options[1]}), 3-(${options[2]})`, 'text', 'Enviar').then(async res => {
            if (res.isConfirmed) {
              if(res.value == '1') await updateWeight({weight: payload.data.weightOptions[0], id: payload.data.newId})
              if(res.value == '2') await updateWeight({weight: payload.data.weightOptions[1], id: payload.data.newId})
              if(res.value == '3') await updateWeight({weight: payload.data.weightOptions[2], id: payload.data.newId})
              if(res.value > '3' || res.value < 0 || !parseInt(res.value)) return SuccessAlert('Error', 'Solo colocar el numero opcion (1,2,3)', 'error', 5000);
              SuccessAlert('Creaated Package', 'Paquete Registrado correctamente', 'success', 2000);
              setTimeout(() => {
                navigate('/');
              }, 2000);
            }else {
              SuccessAlert('Create Package', 'Se ha registrado el paquete mas no su peso', 'warning', 2000);
                setTimeout(() => {
                  navigate('/');
                }, 2000);
            }
          })
        }
        console.log(payload);
        return true;
    }

    // * detectar el scaner 
    useScanDetection({
      onComplete: setCode,
      onError: error => console.log(error),
      minLength:13
    })

    useEffect(() => {
      (async ()=> {
        if (id) {
          setIsUpdate(true);
          const item = await getById(id);
          setInputs({...inputs, nombre_paquete: item.data[0].nombre_paquete});
        }
      })()
    }, [id])




  return (
    <div className="mx-auto max-w-xl mt-20">
        <form  className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="example1" className="mb-1 block text-sm font-medium text-gray-700">Codigo</label>
            <input type="text" id="codigo" name="codigo" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="(01)923840938(123)123112321" value={code ? code: inputs.codigo}  onChange={handelChange} />
          </div>
          <div>
            <label htmlFor="example2" className="mb-1 block text-sm font-medium text-gray-700">Nombre del paquete</label>
            <input type="text" id="nombre_paquete" name="nombre_paquete" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="Paquete1"  value={inputs.nombre_paquete} onChange={handelChange} />
          </div>
          <button type="submit" name="btn_submit" className="w-full rounded-lg border border-blue-500 bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300">{id ? 'Actualizar' : 'Registrar'}</button>
          {/* {error &&(
            <p className="text-red-500 text-center font-medium text-sm mb-1">{'Favor de Escribir en los campos'}</p>
          )} */}
        </form>
      </div>
  )
}

export default Form