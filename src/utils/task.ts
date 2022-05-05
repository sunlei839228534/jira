import { useHttp } from "./http"
import { useQuery } from 'react-query'
import { Kanban } from "../types/kanban"
import { Task } from "../types/task"

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  return useQuery<Task [],Error>(['tasks',param], () => client('tasks',{data:param}))
}
