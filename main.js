const fs = require('fs')
const path = require('path')
const readlineSync = require('../coderDecoder/node_modules/readline-sync')
const LZ77Coder = require('../coderDecoder/LZ77/coder')
const LZ77Decoder = require('../coderDecoder/LZ77/decoder')
const ShennonFanoCoder = require('../coderDecoder/Shennon_Fano/coder')
const ShennonFanoDecoder = require('../coderDecoder/Shennon_Fano/decoder')

const getSymbols = require('./utils/getSymbols')
const getBytes = require('./utils/getBytes')

const sourcePath = path.join(__dirname, './files/image.bmp')
const codePath = path.join(__dirname, './files/code.txt')
const decodePath = path.join(__dirname, './files/decode.bmp')

function codeLZ77AndShennonFano() {
  fs.writeFileSync(
    codePath, ShennonFanoCoder(
      LZ77Coder(
        getSymbols(
          fs.readFileSync(
            sourcePath
          )
        )
        , 64, 7_000)
    )
  )
}
function decodeLZ77AndShennonFano() {
  fs.writeFileSync(
    decodePath, getBytes(
      LZ77Decoder(
        ShennonFanoDecoder(
          fs.readFileSync(
            codePath, { encoding: "utf-8" }
          )
        )
        , 7_000)
    )
  )
}

function codeShennonFanoAndLZ77() {
  fs.writeFileSync(
    codePath, LZ77Coder(
      ShennonFanoCoder(
        getSymbols(
          fs.readFileSync(
            sourcePath
          )
        )
      ), 64, 7_000
    )
  )
}

function decodeShennonFanoAndLZ77() {
  fs.writeFileSync(
    decodePath, getBytes(
      ShennonFanoDecoder(
        LZ77Decoder(
          fs.readFileSync(
            codePath, { encoding: 'utf-8' }
          ), 7_000
        )
      )
    )
  )
}

function codeLZ77Only() {
  fs.writeFileSync(
    codePath, LZ77Coder(
      getSymbols(
        fs.readFileSync(
          sourcePath
        )
      ), 128, 10_000
    )
  )
}
function decodeLZ77Only() {
  fs.writeFileSync(
    decodePath, getBytes(
      LZ77Decoder(
        fs.readFileSync(
          codePath, { encoding: 'utf-8' }
        )
        , 10_000
      )
    )
  )
}

function codeShennonFanoOnly() {
  fs.writeFileSync(
    codePath, ShennonFanoCoder(
      getSymbols(
        fs.readFileSync(
          sourcePath
        )
      )
    )
  )
}
function decodeShennonFanoOnly() {
  fs.writeFileSync(
    decodePath, getBytes(
      ShennonFanoDecoder(
        fs.readFileSync(
          codePath, { encoding: 'utf-8' }
        )
      )
    )
  )
}

const actions = {
  1: codeLZ77AndShennonFano,
  2: decodeLZ77AndShennonFano,
  3: codeShennonFanoAndLZ77,
  4: decodeShennonFanoAndLZ77,
  5: codeLZ77Only,
  6: decodeLZ77Only,
  7: codeShennonFanoOnly,
  8: decodeShennonFanoOnly
}

while (1) {

  console.log(actions)

  const action = readlineSync.question('')

  actions[action]()

  const startSize = (fs.statSync(sourcePath).size / 1024).toFixed(3)
  const endSize = (fs.statSync(codePath).size / 1024).toFixed(3)

  console.table(
    {
      [path.basename(sourcePath)]: startSize + " КБ",
      [path.basename(codePath)]: endSize + " КБ",
      "Сompression ratio": ((startSize / endSize)).toFixed(3)
    }
  )
}