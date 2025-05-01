import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fonts.css';
import { ThemeProvider } from './providers/theme-provider.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.ts'
import 'swiper/css';
import 'swiper/css/navigation';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-inner-image-zoom/lib/styles.min.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <RouterProvider router={router} />
          
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
