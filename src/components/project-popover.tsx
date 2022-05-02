import styled from "@emotion/styled"
import { Popover,Typography ,List,Divider,Button } from "antd"
import { useProjects } from "../utils/use-project"

export const ProjectPopover = ({ProjectModalButton}: {ProjectModalButton:JSX.Element}) => {
  const {data:projects,isLoading } = useProjects()
  const pinProjects = projects?.filter(project => project.pin)
  const content = <ContentContainer>
    <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
    <List>
      {
        pinProjects?.map(project => 
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        )
      }
    </List>
    <Divider />
    {ProjectModalButton}
  </ContentContainer>

  return <Popover placement="bottom" content={content}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`