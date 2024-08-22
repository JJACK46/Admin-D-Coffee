import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function generatePDF(
  titleHead: string,
  body: Array<string[]>,
  headers: Array<string>,
  filename: string
) {
  const doc = new jsPDF()

  const width = doc.internal.pageSize.getWidth()

  doc.text(titleHead, width / 2, 10, { align: 'center' })

  autoTable(doc, {
    head: [headers],
    body: body
  })

  const existFilename = filename + '-' + new Date().toISOString() + '.pdf'

  doc.save(existFilename)
}
