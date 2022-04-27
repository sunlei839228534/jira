import { useEffect } from "react"
import { cleanObject } from "."
import { Project } from "../screen/project-list/list"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param?: Partial<Project>) => {
  const { run , ...result} = useAsync<Project[]>()

  const client = useHttp()

  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {})}))
  }, [param])

  return result
}