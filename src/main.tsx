import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './providers/theme-provider.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
     <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
