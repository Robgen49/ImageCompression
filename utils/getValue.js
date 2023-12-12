module.exports = function getValue(data, offset, size) {
   let result = ""
   for (let i = offset + size - 1; i >= offset; i--) {
      result += (data[i].toString(16) + '')
   }
   return +("0x" + result)
}