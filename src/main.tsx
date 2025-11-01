import { ConfigProvider } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { colors } from './theme/colors.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primary,
          colorPrimaryBgHover: colors.primaryLighter,
          colorPrimaryBorder: colors.primaryLight,
          fontFamily: "'Fredoka', sans-serif",
          colorError: colors.error,
          colorErrorActive: colors.error,
          colorErrorBgHover: colors.error
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
