import { Kanban } from '../../types/kanban'
import { useTasks } from '../../utils/task'
import { useTasksSearchParams } from './util'

export const KanbanColumn = ({kanban}: {kanban: Kanban}) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const task = allTasks?.filter((task) => {
    return task.kanbanId === kanban.id
  })
  return <div>
    <h3>{kanban.name}</h3>
    {task?.map(task => <div key={task.id}>{task.name}</div>)}
  </div>
}