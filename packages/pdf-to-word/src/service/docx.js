// import fs from 'fs'

import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph, TextRun, PageBreak } from 'docx'

export function generateDOCX(textLists, filename = 'example.docx') {
  // const children = textLists.map(text => new TextRun(text))
  const children = textLists.map(text => new Paragraph({ children: [new TextRun(text), new PageBreak()] }))

  const doc = new Document({
    sections: [{
      properties: {},
      children
      // children: [new Paragraph({ children })]
    }]
  })

  // Used to export the file into a .docx file
  // Packer.toBuffer(doc).then(buffer => {
  //   fs.writeFileSync(filename, buffer)
  // })

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, filename)
  })
}