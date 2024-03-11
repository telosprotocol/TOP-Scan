import type { NextPage } from 'next'
import styles from '../../styles/scroll_card.module.scss'
import { Card, Space } from 'antd'
import QuestionTip from '../QuestionTip'
import linkIcon from '../../assets/images/link.svg'
import leftArrowIcon from '../../assets/images/left_arrow.svg'
import rightArrowIcon from '../../assets/images/right_arrow.svg'
import { useRef } from 'react'
import useBlock from '../../hooks/useBlock'
import { formatAddress, dateDiff } from '../../utils'
const ScrollCard: NextPage = () => {
  const ref = useRef(null) as any
  const ref1 = useRef(null) as any
  const { result } = useBlock({ current: 1, size: 15, searchCount: false })
  const handleMove = (type: any) => {
    const scrollDistance = ref1.current.clientWidth + 18
    let scrollLeft = ref && ref.current.scrollLeft
    console.log(scrollDistance, scrollLeft)
    if (type === 'left') {
      if (!scrollLeft) {
        return
      }
      scrollLeft = scrollLeft - scrollDistance
    } else if (type === 'right') {
      scrollLeft = scrollLeft + scrollDistance
    }
    ref &&
      ref.current.scrollTo({
        left: scrollLeft,
        top: 0,
        behavior: 'smooth',
      })
  }
  return (
    <div className={styles.box}>
      <div className={styles.left_arrow} onClick={() => handleMove('left')}>
        <img src={leftArrowIcon.src} alt={'leftArrowIcon'}></img>
      </div>
      <div className={styles.right_arrow} onClick={() => handleMove('right')}>
        <img src={rightArrowIcon.src} alt={'rightArrowIcon'}></img>
      </div>
      <div className={styles.scroll_card} ref={ref}>
        {Array.isArray(result) &&
          result.map((item: any, index: number) => {
            return (
              <div className={styles.scroll_card__wrap} ref={ref1} key={index}>
                <div className={styles.scroll_card__item}>
                  <div className={styles.first}>
                    {item.owner} #{item.tableHeight}
                  </div>
                  <div className={styles.second}>
                    <span className={styles.second__fl}>
                      {item.blockTxNum} Txs
                    </span>
                    <span className={styles.second__fr}>
                      {dateDiff(item.timestamp)}
                    </span>
                  </div>
                  <div className={styles.third}>
                    <span className={styles.third__fl}>Miner：</span>
                    <span className={styles.third__fr}>
                      {formatAddress(
                        item.auditor !== '0' ? item.auditor : item.validator
                      )}
                    </span>
                  </div>
                </div>
                {index !== result.length - 1 && (
                  <img src={linkIcon.src} alt={'linkIcon'}></img>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ScrollCard
