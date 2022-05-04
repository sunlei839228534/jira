import { Project } from "../screen/project-list/list"
import { useHttp } from "./http"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useProjectSearchParams } from "../screen/project-list/util"

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  return useQuery<Project [],Error>(['projects',param], () => client('projects',{data:param}))
}


export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  const [searchParams] = useProjectSearchParams()
  const queryKey = ['projects', searchParams]
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    method: 'PATCH',
    data: params
  }),{ 
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target) {
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?:Project[]) => {
        return old?.map(project => project.id  === target.id ? {...project,...target} : project ) || []} )
        return {
          previousItems,
        }
    },
    onError(error,newItem,context) {
      queryClient.setQueryData(queryKey, (context as {previousItems:Project []}).previousItems)
    }
  })
}

export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation((params: Partial<Project>) => client(`projects`, {
    method: 'POST',
    data: params
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  })
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(['project',{id}], () => client(`projects/${id}`), {enabled: !!id})
}