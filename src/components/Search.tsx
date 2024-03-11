import type { NextPage } from 'next'
import React, { useState } from 'react'
import styles from '../styles/Search.module.scss'
import { toast } from 'react-toastify'
import { checkTOPAddr, checkTOPAddrLowerCase, checkTOPHash } from '../utils'
import { useRouter } from 'next/router'

const Search: NextPage = () => {
  const [searchValue, setSearchValue] = useState('')

  const router = useRouter()

  function handleSarch() {
    // address
    if (checkTOPAddr(searchValue) && checkTOPAddrLowerCase(searchValue)) {
      router.push(`/account/accountDetail?address=${searchValue}`)
      return
    }
    // hash
    if (checkTOPHash(searchValue)) {
      router.push(
        `/transactions/transactionsDetail?hash=${
          searchValue.match(/^0x/) ? searchValue : '0x' + searchValue
        }`
      )
      return
    }
    toast.error('The search content is incorrect, please confirm')
  }

  return (
    <div className={styles.search}>
      <input
        value={searchValue}
        placeholder="Search by address/transaction hash"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.code.toLowerCase() === 'enter') {
            handleSarch()
          }
        }}
      ></input>
      <span
        onClick={handleSarch}
        className={searchValue !== '' ? styles.clickAble : ''}
      ></span>
    </div>
  )
}

export default Search
