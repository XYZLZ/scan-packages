import Exeljs from 'exceljs'

const exportExelFile = ({data, sheetHeaders}) => {
    const workBook = new Exeljs.Workbook();
    const sheet = workBook.addWorksheet("Packages");
    sheet.properties.defaultRowHeight = 40;

    sheet.getRow(1).border = {
      bottom: {style: 'thick', color: {argb: "000"}}
    }

    sheet.getRow(1).fill = {
      type : 'pattern',
      pattern: 'solid',
      fgColor:{argb:'31a4eb'},
      bgColor: {argb: '48e'}
    }
    

    sheet.getRow(1).alignment = {
      horizontal: 'center'
    }

    sheet.getColumn('A').alignment = {
      horizontal : 'center'
    }

    sheet.columns = sheetHeaders;

    data.map(item => {
      sheet.addRow({
        id: item.id,
        nombre_paquete: item.nombre_paquete,
        codigo: item.codigo,
        codigo_peso: item.codigo_peso,
        libra: item.libra,
        cantidad: item.cantidad,
        fecha: new Date(item.fecha).toLocaleDateString('es-MX', {month:'long', day: 'numeric', year:'numeric'})
      })
    });

    workBook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"
      });

      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'download.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
    })
  }

export default exportExelFile;