import '@fontsource/plus-jakarta-sans/variable.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { FormRefsProvider } from './context/FormRefsContext'
import './index.css'

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <FormRefsProvider>
      <App />
    </FormRefsProvider>
  </StrictMode>
)
