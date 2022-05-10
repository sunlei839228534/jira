import { useProjectIdInUrl } from "screen/kanban/util"

export const useEpicSearchParams = () => ({projectId: useProjectIdInUrl()})

export const useEpicsQueryKey = () => ['epics', useEpicSearchParams()]