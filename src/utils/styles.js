import {
  FONT_BOLD,
  FONT_ITALIC,
  FONT_UNDERLINE,
  ALIGN_LEFT,
  ALIGN_CENTER,
  ALIGN_RIGHT
} from '@config/constants'

const fontStylesMap = {
  [FONT_BOLD]: { 'font-weight': 'bold' },
  [FONT_ITALIC]: { 'font-style': 'italic' },
  [FONT_UNDERLINE]: { 'text-decoration': 'underline' }
}

const fontStylesFallbacks = {
  [FONT_BOLD]: { 'font-weight': 'normal' },
  [FONT_ITALIC]: { 'font-style': 'normal' },
  [FONT_UNDERLINE]: { 'text-decoration': 'none' }
}

const alignStylesMap = {
  [ALIGN_LEFT]: { 'text-align': 'left' },
  [ALIGN_CENTER]: { 'text-align': 'center' },
  [ALIGN_RIGHT]: { 'text-align': 'right' }
}

export function getStyles(format) {
  let styles = {}

  // get font styles
  Object.keys(fontStylesMap).forEach((modifier) => {
    const style = format.font.includes(modifier)
      ? fontStylesMap[modifier]
      : fontStylesFallbacks[modifier]

    styles = {
      ...styles,
      ...style
    }
  })

  // get align styles
  styles = {
    ...styles,
    ...alignStylesMap[format.align]
  }

  return styles
}
