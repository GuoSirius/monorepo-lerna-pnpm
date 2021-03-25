<template>
  <div class="home">
    <el-button @click="startTransform">开始转换</el-button>

    <el-upload
      class="upload-demo"
      drag
      multiple
      thumbnail-mode
      :file-list="fileLists"
      :auto-upload="false"
      :on-change="changeHandler"
      :on-preview="previewHandler"
      :on-remove="removehandler"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">jpg/png/pdf files</div>
      </template>
    </el-upload>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import { recognizeOCR } from '@/api/ocr'

import parsePDFDocument, { limit } from '@/service/pdfjs'
// import scheduler from '@/service/tesseract'
import { generateDOCX } from '@/service/docx'
// import { generateDOCX } from '@/service/office-gen'
import { readFileAsArrayBuffer } from '@/service/file-reader'

export default defineComponent({
  name: 'Home',
  setup() {
    const fileLists = ref([])

    return { fileLists }
  },
  methods: {
    changeHandler(file, fileLists) {
      this.fileLists = fileLists && [file]

      const loading = this.$loading()

      readFileAsArrayBuffer(file.raw)
        .then(result => {
          return parsePDFDocument(result.result)
        })
        .then(result => {
          return Promise.all(
            result.map(({ canvas }) => {
              return limit(() => (new Promise(resolve => {
                // resolve(canvas)
                resolve(canvas.toDataURL('image/jpeg', 0.2))
                // canvas.toBlob(result => resolve(result), 'image/jpeg', 0.2)
              })))
            })
          )
        })
        .then(result => {
          // return Promise.all(result.map(blob => scheduler.addJob('recognize', blob)))
          return Promise.all(result.map(blob => limit(() => recognizeOCR({ base64: blob }))))
        })
        .then(result => {
          console.log('result', result)
          return result.map(item => item.txtResult)
        })
        .then(result => {
          generateDOCX(result)
        })
        .finally(() => {
          loading.close()
        })
    },
    previewHandler() {
      // console.log('previewHandler', arguments)
    },
    removehandler() {
      console.log('removehandler', arguments)
    },
    startTransform() {
      const { fileLists } = this

      if (!fileLists.length) return void this.$message.warning('请选择文件')

      // TODO
    }
  }
})
</script>
