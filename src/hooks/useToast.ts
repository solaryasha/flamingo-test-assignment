import { useState, useEffect } from "react"

const TOAST_LIMIT = 1

let count = 0
function generateId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

interface State {
  toasts: Array<{
    id: string
    title?: string
    description?: string
    action?: React.ReactNode
    duration?: number
    dismiss?: () => void
  }>
}

const toastStore = {
  state: {
    toasts: [],
  } as State,
  listeners: [] as Array<(state: State) => void>,
  
  getState: () => toastStore.state,
  
  setState: (nextState: State | ((state: State) => State)) => {
    if (typeof nextState === 'function') {
      toastStore.state = nextState(toastStore.state)
    } else {
      toastStore.state = { ...toastStore.state, ...nextState }
    }
    
    toastStore.listeners.forEach(listener => listener(toastStore.state))
  },
  
  subscribe: (listener: (state: State) => void) => {
    toastStore.listeners.push(listener)
    return () => {
      toastStore.listeners = toastStore.listeners.filter(l => l !== listener)
    }
  }
}

export const toast = ({ ...props }) => {
  const id = generateId()

  const update = (props: State) =>
    toastStore.setState((state: State) => ({
      ...state,
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, ...props } : t
      ),
    }))

  const dismiss = () => toastStore.setState((state: State) => ({
    ...state,
    toasts: state.toasts.filter((t) => t.id !== id),
  }))

  toastStore.setState((state: State) => ({
    ...state,
    toasts: [
      { ...props, id, dismiss },
      ...state.toasts,
    ].slice(0, TOAST_LIMIT),
  }))

  return {
    id,
    dismiss,
    update,
  }
}

export function useToast() {
  const [state, setState] = useState<State>(toastStore.getState())
  
  useEffect(() => {
    const unsubscribe = toastStore.subscribe((state: State) => {
      setState(state)
    })
    
    return unsubscribe;
  }, [])
  
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []

    state.toasts.forEach((toast) => {
      if (toast.duration === Infinity) {
        return
      }

      const timeout = setTimeout(() => {
        toast.dismiss?.()
      }, toast.duration || 5000)

      timeouts.push(timeout)
    })

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [state.toasts])

  return {
    toast,
    toasts: state.toasts,
  }
}