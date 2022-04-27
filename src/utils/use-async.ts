import { useState } from "react"

interface State<D> {
  stat: 'idle' | 'success' | 'error' | 'loading',
  data: D | null,
  error: Error | null
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

export const useAsync = <D>(initialState?: State<D>) => {
  const [ state, setState ] = useState({
    ...defaultInitialState,
    ...initialState
  })

  const setData = (data:D) => {
    setState({
      stat: 'success',
      data,
      error: null
    })
  }

  const setError = (error: Error) => {
    setState({
      stat: 'error',
      data: null,
      error
    })
  }
  const setLoading = () => {
    setState({
      stat: 'loading',
      data: null,
      error: null
    })
  }

  const run = (promise: Promise<D>) => {
    if(!promise || !promise.then) {
      throw new Error('请传入promise')
    }
    setLoading()
    return promise.then(res => {
      setData(res)
      return res
    }).catch(error => {
      setError(error)
      return error
    })
  }

  return {
    run,
    isLoading: state.stat === 'loading',
    isIdle: state.stat === 'idle',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    setData,
    setError,
    ...state
  }
}