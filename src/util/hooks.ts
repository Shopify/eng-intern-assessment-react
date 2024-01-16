import { useEffect, useReducer } from "react"

// Forces a rerender every frame
export const useRerenderEveryFrame = (enabled: boolean) => {
  const [, rerender] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    if (!enabled) return
    const id = requestAnimationFrame(rerender)
    return () => cancelAnimationFrame(id)
  })
}
