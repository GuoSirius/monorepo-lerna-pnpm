const fileReader = new FileReader()

export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    fileReader.addEventListener(
      'load',
      e => {
        resolve(e.target)
      },
      { once: true, capture: false }
    )

    fileReader.addEventListener(
      'error',
      error => {
        reject(error)
      },
      { once: true, capture: false }
    )

    fileReader.addEventListener(
      'abort',
      error => {
        reject(error)
      },
      { once: true, capture: false }
    )

    fileReader.readAsArrayBuffer(file)
  })
}
