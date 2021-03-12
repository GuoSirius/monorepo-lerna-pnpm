// import path from 'path'
import { ElLoading } from 'element-plus'

import { createScheduler, createWorker } from 'tesseract.js'

const WORKER_NUMBER = 4

const scheduler = createScheduler()
window.scheduler = scheduler

export default scheduler

export async function createWorkerFactory() {
  const worker = createWorker({
    workerPath: '/tesseract/worker.min.js',
    langPath: '/tesseract/lang/',
    corePath: '/tesseract/tesseract-core.wasm.js'
  })

  await worker.load()
  await worker.loadLanguage('eng+chi_sim')
  await worker.initialize('eng+chi_sim')
  await worker.setParameters({})

  return worker
}

async function initializeTesseract(workerNumber = WORKER_NUMBER) {
  const loading = ElLoading.service()

  await Promise.all(
    Array.from({ length: workerNumber }).map(async () => {
      const worker = await createWorkerFactory()

      window.worker = worker
      console.log(worker)

      scheduler.addWorker(worker)
    })
  )

  loading.close()
}

initializeTesseract(WORKER_NUMBER)
