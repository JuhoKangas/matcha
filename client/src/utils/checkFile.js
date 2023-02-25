export const isImage = async (file) => {
  const readBuffer = (file, start = 0, end = 2) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file.slice(start, end))
    })
  }

  const check = (headers) => {
    return (buffers, options = { offset: 0 }) =>
      headers.every(
        (header, index) => header === buffers[options.offset + index]
      )
  }

  const isPNG = check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  const isJPG = check([0xff, 0xd8, 0xff])

  const buffers = await readBuffer(file, 0, 8)
  const uint8Array = new Uint8Array(buffers)

  if (isPNG(uint8Array) || isJPG(uint8Array)) {
    return true
  }
  return false
}
