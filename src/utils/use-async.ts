import { useCallback, useState } from "react"
import { useMountedRef } from "."

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

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>,initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig,...initialConfig}
  const [ state, setState ] = useState({
    ...defaultInitialState,
    ...initialState
  })
  //useState直接传入函数的含义是惰性初始化,所以在页面首次渲染后,就会被执行 用useState保存函数 不能直接传入函数
  const [ retry , setRetry ] = useState(() => () => {})
  const mountedRef = useMountedRef()

  const setData = useCallback((data:D) => {
    setState({
      stat: 'success',
      data,
      error: null
    })
  },[])

  const setError = useCallback((error: Error) => {
    setState({
      stat: 'error',
      data: null,
      error
    })
  },[]) 
  const setLoading = useCallback(() => {
    setState({
      stat: 'loading',
      data: null,
      error: null
    })
  },[])

  const run = useCallback((promise: Promise<D>,runConfig?:{retry: () => Promise<D> }) => {
    if(!promise || !promise.then) {
      throw new Error('请传入promise')
    }
    setRetry(() => () => {
      if(runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    setLoading()
    return promise.then(res => {
      if(mountedRef.current) {
        setData(res)
      }
      return res
    }).catch(error => {
      setError(error)
      if(config.throwOnError) {
        return Promise.reject(error)
      }
      return error
    }).finally(() => {

    })
  }, [setData,config.throwOnError,mountedRef,setLoading,setRetry,setError ])

  return {
    run,
    isLoading: state.stat === 'loading',
    isIdle: state.stat === 'idle',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    setData,
    setError,
    //retry被调用时 重新跑一次run
    retry,
    ...state
  }
}