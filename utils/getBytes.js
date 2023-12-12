module.exports = function getBytes(symbols = "") {
    return Buffer.from(symbols.split``.map(symbol => symbol.charCodeAt(0)))
}