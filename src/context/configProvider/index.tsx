import type {
  FC,
  PropsWithChildren,
} from 'react'
import {
  createContext,
  useContext,
  useState,
} from 'react'
import { ConfigProvider as AntdConfigProvider, theme } from 'antd'

type Mode = 'light' | 'dark'

interface IConfigProviderContext {
  mode: Mode
  setMode: (mode: Mode) => void
}

export const ConfigProviderContext = createContext<
    IConfigProviderContext | undefined
>(undefined)

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<Mode>('light')

  return (
    <ConfigProviderContext.Provider value={{ mode, setMode }}>
      <AntdConfigProvider
        theme={{
          algorithm:
                        mode === 'light'
                          ? theme.defaultAlgorithm
                          : theme.darkAlgorithm,
        }}
      >
        {children}
      </AntdConfigProvider>
    </ConfigProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConfigProvider() {
  const context = useContext(ConfigProviderContext)

  if (context === undefined) {
    throw new Error(
      'useConfigProvider must be used within a ConfigProvider',
    )
  }

  return context
}
