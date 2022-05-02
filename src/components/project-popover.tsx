import styled from "@emotion/styled"
import { ButtonNoPadding} from '../components/lib'
import { Popover,Typography ,List,Divider,Button } from "antd"
import { useProjects } from "../utils/use-project"
import { useDispatch} from 'react-redux'
import { projectListActions } from "../utils/project-list-slice"

export const ProjectPopover = () => {
  const dispatch = useDispatch()
  const {data:projects,isLoading } = useProjects()
  const pinProjects = projects?.filter(project => project.pin)
  const content = <ContentContainer>
    <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
    <List >
      {
        pinProjects?.map(project => 
          <List.Item key={project.name} >
            <List.Item.Meta title={project.name} />
          </List.Item>
        )
      }
    </List>
    <Divider />
    <ButtonNoPadding onClick={() => dispatch(projectListActions.openProjectModal())} type="link">
      创建项目
    </ButtonNoPadding>
  </ContentContainer>

  return <Popover placement="bottom" content={content}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`