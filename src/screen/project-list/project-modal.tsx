import { Drawer , Button } from "antd"
import { useDispatch ,useSelector } from 'react-redux'
import { projectListSlice, selectProjectModalOpen} from "../../utils/project-list-slice"

export const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)

  return <Drawer onClose={() => dispatch(projectListSlice.actions.closeProjectModal())} visible={projectModalOpen} width={'100%'}>
    <h1>Project Modal</h1>
    <Button onClick={() => dispatch(projectListSlice.actions.closeProjectModal())}>关闭</Button>
  </Drawer>
}