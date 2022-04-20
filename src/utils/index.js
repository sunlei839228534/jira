import { useEffect, useState } from "react"

function isFalsy(value) {
  return value === 0 ? false : !value
}

export function cleanObject(object) {
  const result = { ...object }
  Object.keys(object).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}


export function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => { setDebounceValue(value) }, delay)

    return () => { clearTimeout(timeout) }
  }, [value, delay])

  return debounceValue
}

