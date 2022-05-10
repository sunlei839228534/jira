import { useEffect, useState } from "react"
import { Button } from 'antd'
import { Row, ScreenContainer } from "components/lib"
import { useProjectInUrl } from "screen/kanban/util"
import { useDeleteEpic, useEpics } from "utils/epic"
import { useEpicSearchParams, useEpicsQueryKey } from "./util"
import { List } from 'antd'
import dayjs from "dayjs"
import { useTasks } from "utils/task"
import { Link } from "react-router-dom"

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl()
  const {data: epics} = useEpics(useEpicSearchParams())
  const { data: tasks } = useTasks({projectId:currentProject?.id})

  return <ScreenContainer>
    <h1>{currentProject?.name}任务组</h1>
    <List dataSource={epics} itemLayout={'vertical'} renderItem={epic=> <List.Item>
      <List.Item.Meta
      description={
        <div>
          <div>开始时间:{dayjs(epic.start).format('YYYY-MM-DD')}</div>
          <div>结束时间:{dayjs(epic.end).format('YYYY-MM-DD')}</div>
        </div>
      }
      title={<Row between={true}>
        <span>{epic.name}</span>
        <Button type={'link'}>删除</Button>
      </Row>}>
      </List.Item.Meta>
      <div>
        {tasks?.filter(task => task.epicId === epic.id).map(task => <Link key={task.id} to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}>{task.name}</Link>  )}
      </div>
    </List.Item> }>
    </List>
  </ScreenContainer>
}