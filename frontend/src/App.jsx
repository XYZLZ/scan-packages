import { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
// import {CSVLink} from 'react-csv'
import Exeljs from 'exceljs'
import {DeleteIcon, EditIcon, DownloadIcon, AddIcon} from './assets'
import {useGetAllQuery, useDeletePackageMutation, useCountPackageMutation} from './redux/apiSlice'
import Button from './components/Button'
import Pagination from './components/Pagination'
import {areYouSureAlert, inputAlert} from './utils/alerts'
import Swal from 'sweetalert2'
import 'table2excel';
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

const sheetHeaders = [
  { label: "ID", key: "id" },
  { label: "Nombre Paquete", key: "nombre_paquete" },
  { label: "Codigo", key: "codigo" },
  { label: "Codigo Peso", key: "codigo_peso" },
  { label: "Libra", key: "libra" },
  { label: "Cantidad", key: "cantidad" },
  { label: "Fecha", key: "fecha" }
];

function App() {
  const tableRef = useRef(null);
  const {data, isLoading, isSuccess} = useGetAllQuery();
  const [deletePackage] = useDeletePackageMutation();
  const [updateCount] = useCountPackageMutation();
  const navigate = useNavigate();

  // const Table2Excel = window.Table2Excel;
  // const table2excel = new Table2Excel();
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  let records;

  if (isSuccess) {
      records = data.data?.slice(firstIndex, lastIndex)
  }

  if(isLoading) return <div className='flex justify-center items-center min-h-screen'><p>Cargando...</p></div>


  return (
    <>
    <div className='container sm:w-auto  mx-auto px-2 mt-10'>
    <main className="overflow-auto rounded-lg border border-gray-200 shadow-md">
          <Button text='New' Icon={AddIcon} color={'blue'} onclick={() => navigate('/create')}/>
          <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-lg border border-green-500
      bg-green-500 px-5 py-2.5 text-center text-sm font-medium
    text-white shadow-sm transition-all hover:border-green-700
      hover:bg-green-700 focus:ring focus:ring-green-200 disabled:cursor-not-allowed 
      disabled:border-green-300 disabled:bg-green-300 ml-4`}
      onClick={()=>{table2excel.export(document.getElementById('table'))}}
    >
      <DownloadIcon />
      Download to exel
    </button>
    {/* <CSVLink data={data.data} headers={sheetHeaders}  className='inline-flex items-center gap-1.5 rounded-lg border border-green-500
      bg-green-500 px-5 py-2.5 text-center text-sm font-medium
    text-white shadow-sm transition-all hover:border-green-700
      hover:bg-green-700 focus:ring focus:ring-green-200 disabled:cursor-not-allowed 
      disabled:border-green-300 disabled:bg-green-300 ml-4'>
        <DownloadIcon />
        Export to exel</CSVLink> */}
        <table ref={tableRef} id='table' className="mt-2 w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">ID</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Paquete</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Codigo</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Codigo_peso</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Libra</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Cantidad</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Fecha</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900" >Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {records?.map(item => (
              <tr className="hover:bg-gray-50" key={item.id}>
              <th className="px-6 py-4 font-medium text-gray-900">{item.id}</th>
              <td className="px-6 py-4">{item.nombre_paquete}</td>
              <td className="px-6 py-4">{item.codigo}</td>
              <td className="px-6 py-4">{item.codigo_peso}</td>
              <td className="px-6 py-4">{item.libra}</td>
              <td className="px-6 py-4">{item.cantidad}</td>
              <td className="px-6 py-4">{new Date(item.fecha).toLocaleDateString('es-mx', {month:'long', day: 'numeric', year:'numeric'})}</td>
              <td className="flex justify-end gap-4 px-6 py-4 font-medium">
              <a  className="text-primary-700 text-red-600 cursor-pointer hover:opacity-80" onClick={() => {
                areYouSureAlert('Eliminar este recurso?').then(res => {if (res.isConfirmed) deletePackage(item.id)})
              }}><DeleteIcon/></a>
              <a  className="text-primary-700 text-green-600 cursor-pointer hover:opacity-80" onClick={() => {navigate(`/create?id=${item.id}`)}}><EditIcon/></a>
              <a  className="text-primary-700 text-blue-600 cursor-pointer hover:opacity-80" onClick={()=>{
                inputAlert('Agregar o quitar cantidad', 'Agregue o quite la cantidad del producto', 'number', 'Enviar').then(data => {
                  if (data.isConfirmed) {
                    const value = data.value;
                    Swal.fire({
                      title: 'Quieres incrementar o decrementar esta cantidad ?',
                      showDenyButton: true,
                      showCancelButton: true,
                      confirmButtonText: 'Incrementar',
                      denyButtonText: `Decrementar`,
                    }).then(res => {
                      if (res.isConfirmed) {
                        updateCount({cantidad:value, id:item.id, action:true});
                      }else if (res.isDenied) {
                        updateCount({cantidad:value, id:item.id, action:false});
                      }
                    })
                  }
                })
              }}><AddIcon/></a>
              </td>
            </tr>
            ))}
          </tbody>
          <Pagination data={data.data} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </table>
      </main>
    </div>
    </>
  )
}

export default App
