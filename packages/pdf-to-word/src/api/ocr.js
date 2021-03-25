import request from './request'

// 识别 OCR
export function recognizeOCR({
  base64 = '',
  localIndex = 'wzsb',
  needFilter = '1',
  needRotation = true,
  needCorrection = true
} = {}) {
  base64 = base64.replace(/^data:image\/(?:[^;]+);base64,/, '')

  return request({
    method: 'POST',
    url: '/dsw-ai-api/ai/api/wzsb',
    data: {
      img: base64,
      glhzzw: needFilter,
      loaclIndex: localIndex,
      txjp: needCorrection,
      txxz: needRotation,
      url: '/pict/ocrImageAndRotate'
    }
  })
}
