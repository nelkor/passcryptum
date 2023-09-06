const type = 'text/plain'

const polyfillCopy = async (str: string | Promise<string>) =>
  navigator.clipboard.writeText(await str)

export const writeToClipboard = (str: string | Promise<string>) => {
  if (!document.hasFocus()) {
    return
  }

  if ('ClipboardItem' in window) {
    const clipboardItem = new ClipboardItem({
      [type]: Promise.resolve(str).then(result => new Blob([result], { type })),
    })

    void navigator.clipboard.write([clipboardItem])
  } else {
    void polyfillCopy(str)
  }
}
