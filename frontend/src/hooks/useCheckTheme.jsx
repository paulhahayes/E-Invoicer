import { useEffect, useState } from 'react'
import { useDarkModeContext } from '../contexts/DarkModeContext'
// useful if tailwind cannot be used
const useCheckTheme = () => {
  const { enabled } = useDarkModeContext()
  const [theme, setTheme] = useState(enabled ? 'dark' : 'colored')

  useEffect(() => {
    setTheme(enabled ? 'dark' : 'colored')
  }, [enabled])

  return theme
}

export default useCheckTheme
