export function exportDataToCSV(data: Record<string, any>[], filename: string): void {
  const headerRow: string[] = Object.keys(data[0])

  let csvContent: string = headerRow.join(',') + '\n'

  data.forEach((row) => {
    const rowValues: string[] = Object.values(row).map((value) => `"${value}"`)
    csvContent += rowValues.join(',') + '\n'
  })

  const blob: Blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename)
  } else {
    const link: HTMLAnchorElement = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }
}
