import { Table, TableProps } from 'antd'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const pageCacheMap: any = {}

type CProps = {
  fetcher: any
  columns: any
  id: string
  rowKey: string
  showPage?: boolean | undefined
  isRefresh?: boolean
  styleSet?: boolean | undefined
  size?: number
  extraBody?: any
}

const TableWithRequest: NextPage<CProps> = ({
  id,
  fetcher,
  columns,
  rowKey,
  showPage = true,
  isRefresh = false,
  size = 10,
  styleSet,
  extraBody = {},
}: CProps) => {
  const pageCacheInfo = pageCacheMap[id] || { page: 1, pageSize: size }
  const [pageIndex, setPageIndex] = useState(pageCacheInfo.page)
  const [pageSize, setPageSize] = useState(pageCacheInfo.pageSize)
  const [sorterField, setSorterField] = useState('')
  const [sorterOrder, setSorterOrder] = useState('')
  // function handlePageChange(page: number, pageSize: number) {
  //   setPageIndex(page)
  //   setPageSize(pageSize)
  // }

  useEffect(() => {
    setPageIndex(1)
    setPageSize(size)
  }, [id, size])

  const { data, error }: any = useSWR(
    { pageIndex, pageSize, id, extraBody, sorterField, sorterOrder },
    ({ pageIndex, pageSize, extraBody, sorterField, sorterOrder }) => {
      const body: any = { current: pageIndex, size: pageSize, ...extraBody }
      if (sorterField) {
        body.orderby = sorterField
      }
      if (sorterOrder) {
        body.sort = sorterOrder === 'descend' ? 'DESC' : 'AES'
      }
      return fetcher(body)
    },
    isRefresh ? { refreshInterval: 5000 } : {}
  )

  const loading = !error && !data

  const onChange: TableProps<any>['onChange'] = (
    pagination,
    filters,
    sorter: any,
    extra
  ) => {
    setPageIndex(pagination.current)
    setPageSize(pagination.pageSize)
    if (sorter && sorter.field && sorter.order) {
      setSorterField(sorter.field)
      setSorterOrder(sorter.order)
    } else {
      setSorterField('')
      setSorterOrder('')
    }
  }

  return (
    <div className={styleSet ? 'table' : ''}>
      <Table
        rowKey={rowKey}
        pagination={
          showPage
            ? {
                current: pageIndex,
                pageSize,
                total: data?.totalCount,
              }
            : false
        }
        onChange={onChange}
        loading={loading}
        dataSource={data?.result}
        columns={columns}
      />
    </div>
  )
}

export default TableWithRequest
