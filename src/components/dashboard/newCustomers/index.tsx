import { useApiUrl, useCustom, useTranslate } from '@refinedev/core'
import { ConfigProvider, Typography, theme } from 'antd'

import { DecreaseIcon, IncreaseIcon } from '../../../components/icons'

import type { ISalesChart } from '../../../interfaces'
import { Header, HeaderNumbers, NewCustomersWrapper } from './styled'

export const NewCustomers: React.FC = () => {
  const t = useTranslate()
  const API_URL = useApiUrl()

  const url = `${API_URL}/newCustomers`
  const { data } = useCustom<{
    data: ISalesChart[]
    total: number
    trend: number
  }>({ url, method: 'get' })

  const { Text, Title } = Typography

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <NewCustomersWrapper>
        <Header>
          <Title level={3}>{t('dashboard.newCustomers.title')}</Title>
          <HeaderNumbers>
            <Text strong>{data?.data.total ?? 0}</Text>
            <div>
              <Text strong>
                {data?.data.trend ?? 0}
                %
              </Text>
              {(data?.data?.trend ?? 0) > 0
                ? (
                  <IncreaseIcon />
                  )
                : (
                  <DecreaseIcon />
                  )}
            </div>
          </HeaderNumbers>
        </Header>
      </NewCustomersWrapper>
    </ConfigProvider>
  )
}
