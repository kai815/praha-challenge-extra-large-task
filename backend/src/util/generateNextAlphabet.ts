export const generateNextAlphabet = (alphabet: string): string => {
  if (alphabet.length > 1) {
    throw new Error('1文字以上は受け付けられません')
  }
  const index = 0
  const unicode = alphabet.charCodeAt(index)
  const nextAlpabet = String.fromCharCode(unicode + 1)
  return nextAlpabet
}
