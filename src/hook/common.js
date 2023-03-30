export const copy = async (text) => {
  return await navigator.clipboard.writeText(text)
}

export const paste = async () => {
  return await navigator.clipboard.readText()
}
