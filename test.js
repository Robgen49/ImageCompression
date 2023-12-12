const fs = require('fs')

const path = require('path')

const testPath = path.join(__dirname, 'test.txt')

console.log(String.fromCharCode(126))

fs.writeFileSync(testPath, String.fromCharCode(126), { encoding: 'utf-8' })