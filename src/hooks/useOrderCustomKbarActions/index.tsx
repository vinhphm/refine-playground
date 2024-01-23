import { useEffect, useState } from 'react'
import { useTranslate, useUpdate } from '@refinedev/core'
import type {
  Action,
} from '@refinedev/kbar'
import {
  Priority,
  createAction,
  useRegisterActions,
} from '@refinedev/kbar'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

import type { IOrder } from '../../interfaces'

export function useOrderCustomKbarActions(order?: IOrder): void {
  const t = useTranslate()
  const { mutate } = useUpdate()

  const canAcceptOrder = order?.status.text === 'Pending'
  const canRejectOrder
        = order?.status.text === 'Pending'
        || order?.status.text === 'Ready'
        || order?.status.text === 'On The Way'

  const [actions, setActions] = useState<Action[]>([])

  const handleMutate = (status: { id: number, text: string }) => {
    if (order) {
      mutate(
        {
          resource: 'orders',
          id: order.id.toString(),
          values: {
            status,
          },
        },
        {
          onSuccess: () => setActions([]),
        },
      )
    }
  }

  useEffect(() => {
    const preActions: Action[] = []
    if (canAcceptOrder) {
      preActions.push(
        createAction({
          name: t('buttons.accept'),
          icon: <CheckCircleOutlined />,
          section: 'actions',
          perform: () => {
            handleMutate({
              id: 2,
              text: 'Ready',
            })
          },
          priority: Priority.HIGH,
        }),
      )
    }
    if (canRejectOrder) {
      preActions.push(
        createAction({
          name: t('buttons.reject'),
          icon: <CloseCircleOutlined />,
          section: 'actions',
          perform: () => {
            handleMutate({
              id: 5,
              text: 'Cancelled',
            })
          },
          priority: Priority.HIGH,
        }),
      )
    }
    setActions(preActions)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])
  useRegisterActions(actions, [actions])
}
