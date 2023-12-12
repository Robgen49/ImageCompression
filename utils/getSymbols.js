module.exports = function getSymbols(bytes = []) {
    return Array.from(bytes).map(byte => String.fromCharCode(byte)).join``
}