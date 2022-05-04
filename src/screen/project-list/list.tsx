import { Drawer, Dropdown, Menu, Modal, Table, TableProps } from "antd"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { Pin } from "../../components/pin"
import { useDeleteProject, useEditProject } from "../../utils/use-project"
import { User } from "./search-panel"
import { ButtonNoPadding} from '../../components/lib'
import { useProjectModal, useProjectsQueryKey } from "./util"

export interface Project {
  id: number,
  name: string,
  personId: number,
  pin: boolean,
  organization: string,
  created: number,
}

interface ListProps extends TableProps<Project>  {
  users: User[],
}

export const List = ({users,...result}:ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey())


  return <Table rowKey={'id'} pagination={false}  columns={[
    {
      title: <Pin checked={true} disabled={true} />,
      render(value,project) {
        return <Pin checked={project.pin} onCheckedChange={() => {mutate({...project, pin: !project.pin})}} ></Pin>
      }
    },{
    title: '名称',
    sorter: (a,b) => a.name.localeCompare(b.name),
    render(value,project) {
      return (<Link to={String(project.id)}>{project.name}</Link>)
    }
  },{
    title: '部门',
    dataIndex: 'organization'
  }, {

  }, {
    title: '负责人',
    render(value,project) {
      return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
    },
  }, {
    title: '创建时间',
    render(value,project) {
      return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
    }
  }, {
    render(value,project) {
      return <More project={project} />
    }
  }
]} {...result} />
}

export const More = ({project} : {project: Project}) => {
  const { startEdit } = useProjectModal()
  const editProject = (id:number) => () => startEdit(id)
  const {mutate:DeleteProject } = useDeleteProject(useProjectsQueryKey())
  const confirmDeleteProject = (id:number) => {
    Modal.confirm({
      title: '确定删除这个项目吗?',
      content: '点击确定删除',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        DeleteProject({id})
      }
    })
  }

  return <Dropdown overlay={
    <Menu key="edit">
      <Menu.Item onClick={editProject(project.id)}  key='edit'>编辑</Menu.Item>
      <Menu.Item onClick={() => confirmDeleteProject(project.id)} key='delete'>删除</Menu.Item>
    </Menu>
  }>
    <ButtonNoPadding type="link">...</ButtonNoPadding>
  </Dropdown>
}