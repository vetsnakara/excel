import {
  FONT_BOLD,
  FONT_ITALIC,
  FONT_UNDERLINE,
  ALIGN_LEFT,
  ALIGN_CENTER,
  ALIGN_RIGHT
} from '@config/constants'

const ACTIVE_CLASS = 'button--active'

const fontButtons = [
  { role: FONT_BOLD, icon: 'format_bold' },
  { role: FONT_ITALIC, icon: 'format_italic' },
  { role: FONT_UNDERLINE, icon: 'format_underline' }
]

const alignButtons = [
  { role: ALIGN_LEFT, icon: 'format_align_left' },
  { role: ALIGN_CENTER, icon: 'format_align_center' },
  { role: ALIGN_RIGHT, icon: 'format_align_right' }
]

function buttonTemplate({ role, group, icon, active }) {
  const activeClass = active ? ACTIVE_CLASS : ''
  const groupData = group ? `data-group="${group}"` : ''

  return `
    <button
      data-type="button"
      data-role="${role}"
      ${groupData}
      class="button ${activeClass}"
    >
      <span class="material-icons">${icon}</span>
    </button>
  `
}

function createFontButtons(state) {
  return fontButtons.map(({ role, icon }) => {
    const active = state.includes(role)
    return buttonTemplate({ role, group: 'font', icon, active })
  })
}

function createAlignButtons(state) {
  return alignButtons.map(({ role, icon }) => {
    const active = state === role
    return buttonTemplate({ role, group: 'align', icon, active })
  })
}

export function createToolbar(state) {
  return [
    ...createAlignButtons(state.align),
    ...createFontButtons(state.font)
  ].join('')
}
