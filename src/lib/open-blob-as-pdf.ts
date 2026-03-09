export function openBlobAsPdf(blob: Blob) {
  const pdfBlob = new Blob([blob], { type: 'application/pdf' })
  const url = URL.createObjectURL(pdfBlob)
  const win = window.open(url, '_blank')
  if (win) {
    win.onload = () => win.print()
  }
}
