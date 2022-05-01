import { useEffect, useRef, useState } from "react"

function isFalsy(value:unknown) {
  return value === 0 ? false : !value
}

export const isVoid = (value:unknown) => value === undefined || value === null || value === ''

export function cleanObject(object:{[key: string]: unknown}) {
  const result = { ...object }
  Object.keys(object).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}


export function useDebounce<T>(value:T, delay:number) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => { setDebounceValue(value) }, delay)

    return () => { clearTimeout(timeout) }
  }, [value, delay])

  return debounceValue
}


export function useDoucumentTitle (title :string,keepOnUnmount:boolean = true) {
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if(!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  },[oldTitle,keepOnUnmount])
}

export function resetHref() {
  return window.location.href = window.location.origin
} 

export function useMountedRef () {
  const mountedRef  = useRef(false)

  useEffect(() => {
    mountedRef.current = true 
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}