export function areEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return areEqualShallow(a, b)
  }

  return a === b
}

function areEqualShallow(a, b) {
  for (const key in a) {
    if (!b[key] || a[key] !== b[key]) {
      return false
    }
  }

  for (const key in b) {
    if (!a[key] || a[key] !== b[key]) {
      return false
    }
  }

  return true
}
