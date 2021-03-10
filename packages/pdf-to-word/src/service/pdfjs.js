import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import pdfWorkerEntry from 'pdfjs-dist/build/pdf.worker.entry'

GlobalWorkerOptions.workerSrc = pdfWorkerEntry

export default function parsePDFDocument(bufferUrl) {
  const documentLoadingTask = getPDFDocumentLoadingTask(bufferUrl)

  return getPDFDocumentProxy(documentLoadingTask).then(pdf => {
    let pageNumber = 1

    const totalPages = pdf.numPages

    const promises = Array.from({ length: totalPages }).map((item, index) => {
      pageNumber = index + 1

      return getPDFPageProxy(pdf, pageNumber).then(page => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        window.canvas = canvas
        window.context = context

        // document.body.appendChild(canvas)

        const viewport = page.getViewport({ scale: 1 })

        canvas.width = viewport.width
        canvas.height = viewport.height

        const renderContext = {
          viewport,
          canvasContext: context
        }

        return getRenderTask(page, renderContext).promise.then(() => ({ pdf, page, pageNumber, totalPages, canvas, context, viewport }))
      })
    })

    return Promise.all(promises)
  })
}

export function getPDFDocumentLoadingTask(bufferUrl) {
  const documentLoadingTask = getDocument(bufferUrl)

  window.documentLoadingTask = documentLoadingTask

  return documentLoadingTask
}

export function getPDFDocumentProxy(documentLoadingTask) {
  return documentLoadingTask.promise
}

export function getPDFPageProxy(pdf, pageNumber) {
  return pdf.getPage(pageNumber)
}

export function getRenderTask(page, renderContext) {
  return page.render(renderContext)
}
