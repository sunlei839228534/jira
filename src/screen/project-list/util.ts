import { useMemo } from "react";
import { useUrlQueryParam } from "../../utils/url";
import { useProject } from "../../utils/use-project";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name','personId'])
  return [useMemo(() => {
    return {...param,personId: Number(param.personId) || undefined}
  }, [param]), setParam] as const
}

export const useProjectsQueryKey = () => {
  const [ params ] = useProjectSearchParams()
  return ['projects',params]
}

export const useProjectModal = () => {
  const [ {projectCreate}, setProjectCreate ] = useUrlQueryParam([
    'projectCreate'
  ])
  const [ {editingProjectId}, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])

  const { data : editingProject , isLoading} = useProject(Number(editingProjectId))
  const open = () => setProjectCreate({projectCreate: true})
  const close = () => {
    projectCreate ?  setProjectCreate({projectCreate: undefined}) : setEditingProjectId({editingProjectId: undefined});
  }
  const startEdit = (id:number) => setEditingProjectId({editingProjectId:id})

  return {
    projectModalOpen : projectCreate === 'true' || !!editingProjectId,
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}