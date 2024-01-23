import { useState } from 'react'
import { useApiUrl, useCustom, useTranslate } from '@refinedev/core'
import { NumberField } from '@refinedev/antd'
import { Typography } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { DecreaseIcon, IncreaseIcon } from '../../../components/icons'

import type { ISalesChart } from '../../../interfaces'
import {
  DailyRevenueWrapper,
  RangePicker,
  TitleAreNumber,
  TitleArea,
  TitleAreaAmount,
} from './styled'

export const DailyRevenue: React.FC = () => {
  const t = useTranslate()
  const API_URL = useApiUrl()

  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().subtract(7, 'days').startOf('day'),
    dayjs().startOf('day'),
  ])
  const [start, end] = dateRange

  const query = {
    start,
    end,
  }

  const url = `${API_URL}/dailyRevenue`
  const { data } = useCustom<{
    data: ISalesChart[]
    total: number
    trend: number
  }>({
    url,
    method: 'get',
    config: {
      query,
    },
  })

  const disabledDate = (date: Dayjs) => date > dayjs()

  return (
    <DailyRevenueWrapper>
      <TitleArea>
        <TitleAreaAmount>
          <Typography.Title level={3}>
            {t('dashboard.dailyRevenue.title')}
          </Typography.Title>
          <TitleAreNumber>
            <NumberField
              style={{ fontSize: 36 }}
              strong
              options={{
                currency: 'USD',
                style: 'currency',
                notation: 'compact',
              }}
              value={data?.data.total ?? 0}
            />
            {(data?.data?.trend ?? 0) > 0
              ? (
                <IncreaseIcon />
                )
              : (
                <DecreaseIcon />
                )}
          </TitleAreNumber>
        </TitleAreaAmount>

        <RangePicker
          size="small"
          value={dateRange}
          onChange={(values) => {
            if (values && values[0] && values[1])
              setDateRange([values[0], values[1]])
          }}
          disabledDate={disabledDate}
          style={{
            float: 'right',
            color: '#fffff !important',
            background: 'rgba(255, 255, 255, 0.3)',
          }}
          ranges={{
            'This Week': [
              dayjs().startOf('week'),
              dayjs().endOf('week'),
            ],
            'Last Month': [
              dayjs().startOf('month').subtract(1, 'month'),
              dayjs().endOf('month').subtract(1, 'month'),
            ],
            'This Month': [
              dayjs().startOf('month'),
              dayjs().endOf('month'),
            ],
            'This Year': [
              dayjs().startOf('year'),
              dayjs().endOf('year'),
            ],
          }}
          format="YYYY/MM/DD"
        />
      </TitleArea>
    </DailyRevenueWrapper>
  )
}
