import { useEffect } from "react"
import { User } from "../screen/project-list/search-panel"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useUser = () => {
  const { run,...result } =  useAsync<User []>()
  const client = useHttp()

  useEffect(() => {
    run(client('users'))
  }, [])

  return result
}