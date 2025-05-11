import Prism from "https://esm.sh/prismjs"
import { render } from "https://esm.sh/jsr/@deno/gfm/mod.ts"

/**
 * @param {Document} document - The DOM document object
 * @param {string} source - Either a script element ID or the file path
 * @param {string} el_name - The ID of the element where the code should be placed under
 */
export default async function codeblockRenderer(document, source, el_name) {
  const el = document.getElementById(el_name)
  if (!el) {
    console.error(`Element with ID "${el_name}" not found`)
    return
  }

  let codeContent
  const isFilePath = source.startsWith("/") || source.includes("/")

  if (isFilePath) {
    try {
      const response = await fetch(source)
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`)
      }
      codeContent = await response.text()
    } catch (error) {
      console.error(`Error fetching file "${source}":`, error)
      codeContent = `// Error loading file: ${error.message}`
    }
  } else {
    const script = document.getElementById(source)
    if (!script) {
      console.error(`Script element with ID "${source}" not found`)
      codeContent = `// Error: Script element with ID "${source}" not found`
    } else {
      codeContent = script.innerText
    }
  }

  const div = document.createElement("div")
  div.innerHTML = render("```js\n" + codeContent + "\n```")
  el.after(div)
}