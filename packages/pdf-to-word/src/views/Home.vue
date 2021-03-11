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

import * as demo from 'pdfjs-dist'
import * as tesseract from 'tesseract.js'

import parsePDFDocument from '@/service/pdfjs'
import scheduler from '@/service/tesseract'
import { readFileAsArrayBuffer } from '@/service/tesseract-ocr'

export default defineComponent({
  name: 'Home',
  setup() {
    const message = ref('hellp')
    const fileLists = ref([])

    window.demo = demo
    window.tesseract = tesseract

    return { message, fileLists }
  },
  methods: {
    changeHandler(file, fileLists) {
      this.fileLists = fileLists

      const loading = this.$loading()

      readFileAsArrayBuffer(file.raw).then(result => {
        return parsePDFDocument(result.result)
      }).then(result => {
        return Promise.all(result.map(({ canvas }) => {
          return new Promise(resolve => {
            resolve(canvas)
            // resolve(canvas.toDataURL("image/jpeg", 1.0))
            // canvas.toBlob(result => resolve(result), 'image/jpeg', 0.8)
          })
        }))
      }).then(result => {
        console.log('resource', result)
        return Promise.all(result.map(blob => scheduler.addJob('recognize', blob)))
      }).then(result => {
        console.log('result', result, scheduler)
      }).then(() => {
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
