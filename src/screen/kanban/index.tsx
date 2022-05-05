import styled from "@emotion/styled"
import { useDoucumentTitle } from "../../utils"
import { useKanbans } from "../../utils/kanban"
import { KanbanColumn } from "./kanban-column"
import { useKanbanSearchParams, useProjectInUrl } from "./util"

export const KanbanScreen = () =>{ 
  useDoucumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans} = useKanbans(useKanbanSearchParams())
  return <div>
    <h1>{currentProject?.name}看板</h1>
    <ColumnsContainer>
    {
      kanbans?.map(kanban => <KanbanColumn  kanban={kanban} key={kanban.id} />)
    }
    </ColumnsContainer>
 
  </div>
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;

`