import React, { useEffect, useState } from 'react'
import styles from '../styles/TableFilter.module.scss'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Search from 'antd/lib/input/Search'
import { Button, Modal } from 'antd'
import { FilterOutlined } from '@ant-design/icons'

const TableFilter = ({ value, onChange }: any) => {
  const [innerValue, setInnerValue] = useState('')
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const v = innerValue.trim()
    if (v === '') {
      setShowError(false)
      return
    }
    if (v.match(/^\d\d?$/)) {
      if (Number(v) >= 64) {
        setShowError(true)
      } else {
        setShowError(false)
      }
    } else {
      if (v.toLowerCase() !== 'evm') {
        setShowError(true)
      } else {
        setShowError(false)
      }
    }
  }, [innerValue])

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setInnerValue(value)
  }

  function onSearch() {
    if (showError) {
      return
    }
    onChange(innerValue.trim())
    setIsModalOpen(false)
  }

  return (
    <div className={styles.TableFilter}>
      {value ? (
        <Button type="primary" ghost onClick={showModal}>
          <FilterOutlined />
          Table {value}
        </Button>
      ) : (
        <Button style={{ background: '#fff' }} type="text" onClick={showModal}>
          <FilterOutlined />
          All Tables
        </Button>
      )}

      <Modal
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width="439px"
      >
        <div className={styles.modalWrap}>
          <div className={styles.text1}>Pick your preferred table</div>
          <Search
            addonBefore="Table"
            placeholder="50"
            onSearch={onSearch}
            enterButton="GO"
            value={innerValue}
            onChange={(e) => setInnerValue(e.target.value)}
            size="large"
          />
          {showError ? (
            <div className={styles.text2}>Index does not exist</div>
          ) : (
            <div className={styles.text3}>
              Enter numbers or EVM characters to search
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default TableFilter
