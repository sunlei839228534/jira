import { Routes,Route,Navigate } from 'react-router'
import { Link } from 'react-router-dom'
import { EpicScreen } from '../epic'
import { KanbanScreen } from '../kanban'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>projectScreen</h1>
      <Link to="kanban">kanban</Link>
      <Link to="epic">epic</Link>
      <Routes>
        <Route path="/kanban" element={<KanbanScreen/>}></Route>
        <Route path="/epic" element={<EpicScreen/>}></Route>
        <Route  index element={<Navigate replace={true} to="kanban"></Navigate>}></Route>
      </Routes>
    </div>
  )
}