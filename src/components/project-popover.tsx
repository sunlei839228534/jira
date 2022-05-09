import styled from "@emotion/styled"
import { Popover,Typography ,List,Divider,Button } from "antd"
import { useProjects } from "../utils/use-project"
import { ButtonNoPadding } from '../components/lib'
import { useProjectModal } from "../screen/project-list/util"

export const ProjectPopover = () => {
  const {data: projects } = useProjects()
  const { projectModalOpen ,open } = useProjectModal()
  
  const pinProjects = projects?.filter(project => project.pin)

  const content = <ContentContainer>
    <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
    <List>
      {
        pinProjects?.map(project => 
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        )
      }
    </List>
    <ButtonNoPadding onClick={open} type="link">创建项目</ButtonNoPadding>
    <Divider />
  </ContentContainer>

  return <Popover placement="bottom" content={content}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`