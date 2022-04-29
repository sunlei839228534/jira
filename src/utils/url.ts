import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return [useMemo(() => {
    return keys.reduce((prev,key) => {
      return {
        ...prev,
        [key]: searchParams.get(key) || ""
      }
     }, {} as {[key in K] :string} )
  }, [searchParams]),  setSearchParams] as const
}