export const shorten = (text, maxLength) => {
  return text.substr(0, maxLength) + (text.length > maxLength ? '...' : '')
}