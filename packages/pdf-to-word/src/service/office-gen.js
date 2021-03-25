import fs from 'fs'

import officegen from 'officegen'

// Create an empty Word object:
const docx = officegen('docx')

let paragraph = null

// Officegen calling this function after finishing to generate the docx document:
docx.on('finalize', written => {
  console.log(written, 'Finish to create a Microsoft Word document.')
})

// Officegen calling this function to report errors:
docx.on('error', error => {
  console.log(error)
})

export function generateDOCX(textLists, filename = 'example.docx') {
  // Let's generate the Word document into a file:
  const out = fs.createWriteStream(filename)

  out.once('error', error => {
    console.log(error)
  })

  textLists.forEach(text => {
    // Create a new paragraph:
    paragraph = docx.createP()

    paragraph.addText(text)
  })

  // Async call to generate the output file:
  docx.generate(out)
}