import styled from "@emotion/styled"
import { useDoucumentTitle } from "../../utils"
import { useKanbans } from "../../utils/kanban"
import { KanbanColumn } from "./kanban-column"
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from "./util"
import {SearchPanel } from './search-panel'
import { ScreenContainer } from "../../components/lib"
import { useTasks } from "../../utils/task"
import { Spin } from "antd"
import { CreateKanban } from "./create-kanban"
import { TaskModal } from './task-modal'

export const KanbanScreen = () =>{ 
  useDoucumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans , isLoading: kanbanIsLoading} = useKanbans(useKanbanSearchParams())
  const {isLoading: taskIsLoading,} = useTasks(useTasksSearchParams())

  const isLoading = kanbanIsLoading || taskIsLoading
  return <ScreenContainer>
    <h1>{currentProject?.name}看板</h1>
    <SearchPanel />
    {isLoading ? <Spin size="large" /> :  <ColumnsContainer>
    {
      kanbans?.map(kanban => <KanbanColumn  kanban={kanban} key={kanban.id} />)
    }
      <CreateKanban />
      </ColumnsContainer>
    }
    <TaskModal />
  </ScreenContainer>
}

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`