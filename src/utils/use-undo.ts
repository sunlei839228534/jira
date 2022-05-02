import { useCallback, useState } from "react"

export const useUndo = <T>(initialPresent:T) => {
  const [ state, setState ] = useState<{
    past: T[],
    present: T,
    future: T[]
  }>({
    past: [],
    present: initialPresent,
    future: []
  })

  const canUndo = state.past.length
  const canRedo = state.future.length

  const set = useCallback((newPresent:T) => {
    setState((currentState) => {
      const { past,present,future } = currentState
      if(present === newPresent) return currentState
      return {
        past: [...past, newPresent],
        present: newPresent,
        future: []
      }
    })
  },[])

  const undo = useCallback(() => {
    setState((currentState) => {
      const { past,present,future } = currentState
      if(!past.length) return currentState

      const previous = past[past.length - 1]
      const newPast = past.slice(0,past.length -1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    })
  },[])

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past , present,future } = currentState
      if(!future.length) return currentState

      const next = future[0]
      const newFuture = future.slice(1)
      return {
        past: [...past,present],
        present: next,
        future: newFuture
      }
    })
  }, [])

  const reset= useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    })
  },[])

  return [
    state,
    {set,reset,undo,redo,canUndo,canRedo}
  ]
}