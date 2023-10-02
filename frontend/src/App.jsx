import { useRef } from 'react'
import { useNavigate } from "react-router-dom"
import {CSVLink} from 'react-csv'
import {DeleteIcon, EditIcon, DownloadIcon, AddIcon} from './assets'
import {useGetAllQuery} from './redux/apiSlice'
import Button from './components/Button'

// const mock = [
//   {
//     id:1,
//     paquete: 'paquete1',
//     codigo: 12331231231,
//     codigo_peso: 123,
//     libra: 12.3,
//     fecha: '28 nov, 2023'
//   },
//   {
//     id:2,
//     paquete: 'paquete3',
//     codigo: 12331231231,
//     codigo_peso: 1123,
//     libra: 112.3,
//     fecha: '28 nov, 2023'
//   },
//   {
//     id:3,
//     paquete: 'paquete2',
//     codigo: 12331231231,
//     codigo_peso: 1232,
//     libra: 123.2,
//     fecha: '28 nov, 2023'
//   },
// ]
function App() {
  const tableRef = useRef(null);
  const {data, isLoading} = useGetAllQuery();
  const navigate = useNavigate();
  // console.log(data);
  if(isLoading) return <p>Cargando...</p>


  return (
    <>
    <div className='container w-full md:w-4/5 xl:w-3/5 mx-auto px-2 mt-10'>
    <main className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
          <Button text='New' Icon={AddIcon} color={'blue'} onclick={() => navigate('/create')}/>
          {/* <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-lg border border-green-500
      bg-green-500 px-5 py-2.5 text-center text-sm font-medium
    text-white shadow-sm transition-all hover:border-green-700
      hover:bg-green-700 focus:ring focus:ring-green-200 disabled:cursor-not-allowed 
      disabled:border-green-300 disabled:bg-green-300 ml-4`}
      onClick={()=>{}}
    >
      <DownloadIcon />
      Download
    </button> */}
    <CSVLink data={data.data} className='inline-flex items-center gap-1.5 rounded-lg border border-green-500
      bg-green-500 px-5 py-2.5 text-center text-sm font-medium
    text-white shadow-sm transition-all hover:border-green-700
      hover:bg-green-700 focus:ring focus:ring-green-200 disabled:cursor-not-allowed 
      disabled:border-green-300 disabled:bg-green-300 ml-4'>
        <DownloadIcon />
        Export to exel</CSVLink>
        <table ref={tableRef} id='table' className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">ID</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Paquete</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Codigo</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Codigo_peso</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Libra</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Fecha</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900" >Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {data.data?.map(item => (
              <tr className="hover:bg-gray-50" key={item.id}>
              <th className="px-6 py-4 font-medium text-gray-900">{item.id}</th>
              <td className="px-6 py-4">{item.nombre_paquete}</td>
              <td className="px-6 py-4">{item.codigo}</td>
              <td className="px-6 py-4">{item.codigo_peso}</td>
              <td className="px-6 py-4">{item.libra}</td>
              <td className="px-6 py-4">{new Date(item.fecha).toLocaleDateString('es-mx', {month:'long', day: 'numeric', year:'numeric'})}</td>
              <td className="flex justify-end gap-4 px-6 py-4 font-medium">
              <a  className="text-primary-700 text-red-600 cursor-pointer hover:opacity-80"><DeleteIcon/></a>
              <a  className="text-primary-700 text-green-600 cursor-pointer hover:opacity-80"><EditIcon/></a>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
    </>
  )
}

export default App
