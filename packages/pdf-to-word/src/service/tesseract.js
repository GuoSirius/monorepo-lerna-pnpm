// import path from 'path'

import { createScheduler, createWorker } from 'tesseract.js'

const WORKER_NUMBER = 4

const scheduler = createScheduler()
window.scheduler = scheduler

export default scheduler

export async function createWorkerFactory() {
  const worker = createWorker({
    workerPath: '/tesseract/worker.min.js',
    langPath: '/tesseract/lang',
    corePath: '/tesseract/tesseract-core.wasm.js',
  })

  await worker.load()
  await worker.loadLanguage('eng+chi_tra')
  await worker.initialize('eng+chi_tra')

  return worker
}

async function initializeTesseract(workerNumber = WORKER_NUMBER) {
  console.log(123)
  Array.from({ length: workerNumber }).forEach(async () => {
    console.log(456)
    const worker = await createWorkerFactory()

    window.worker = worker
    console.log(worker)

    scheduler.addWorker(worker)
  })
}

initializeTesseract(WORKER_NUMBER)
