import { Table } from "antd"
import { User } from "./search-panel"

interface Project {
  id: string,
  name: string,
  personId: string,
  pin: boolean,
  organization: string
}

interface ListProps {
  list: Project[],
  users: User[]
}

export const List = ({users, list}:ListProps) => {
  return <Table pagination={false} dataSource={list} columns={[{
    title: '名称',
    dataIndex: 'name',
    sorter: (a,b) => a.name.localeCompare(b.name)
  }, {
    title: '负责人',
    render(value,project) {
      return <span>
{users.find(user => user.id === project.personId)?.name || '未知'}
      </span>
    }
  }]} />
  return <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
      {
        list.map(project => 
          <tr key={project.id}>
            <td>{project.name}</td>
            <td></td>
          </tr>
        )
      }
    </tbody>
  </table>
}