import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '../types'

interface Store {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const useThemeStore = create<Store>()(
  persist(
    set => {
      const state = localStorage.getItem('theme')
      const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
      let theme: Theme = 'light'

      if (state?.includes('dark') || (!state && prefersDark)) {
        document.documentElement.classList.add('dark')
        theme = 'dark'
      }

      function setTheme(theme: Theme) {
        document.documentElement.classList.toggle('dark')
        set({ theme })
      }

      return { theme, setTheme }
    },
    { name: 'theme' }
  )
)

export default useThemeStore
