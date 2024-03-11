import React, { Component } from 'react'
import { getScrollTop } from '../../utils'
import styles from './Map.module.scss'

const geoCoordMap = require('./geoCoordMap.json')
const rawData = require('./rawData.json')

function makeMapData(rawData: any) {
  const mapData = []
  for (let i = 0; i < rawData.length; i++) {
    const geoCoord = geoCoordMap[rawData[i][0]]
    if (geoCoord) {
      mapData.push({
        name: rawData[i][0],
        value: geoCoord.concat(rawData[i].slice(1)),
      })
    }
  }
  return mapData
}

class TopMap extends Component {
  map: any
  first: boolean
  mapContainer: any

  constructor(props: any) {
    super(props)

    this.state = {
      mobile: false,
    }
    this.first = true
  }

  initMap() {
    setTimeout(() => {
      if ((window as any).echarts) {
        this.map = (window as any).echarts?.init(
          document.getElementById('homeMapContainer')
        )
        this.setOption()
      }
    }, 1000)
  }

  setOption = () => {
    const { mobile } = this.state as any
    const option = {
      backgroundColor: '#ffffff',
      tooltip: {
        trigger: 'item',
        formatter(params: any) {
          let value: any = (params.value + '').split('.')
          value =
            value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') +
            '.' +
            value[1]
          return params.seriesName + '<br/>' + params.name + ' : ' + value
        },
      },
      geo: {
        map: 'world',
        emphasis: {
          label: {
            show: true,
            color: '#fff',
          },
          itemStyle: {
            areaColor: '#ccc',
          },
        },
        itemStyle: {
          borderWidth: 0.2,
          borderColor: '#404a59',
          areaColor: '#eee',
        },
        roam: mobile ? false : 'move',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      series: [
        {
          name: 'Node number:',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          symbolSize(val: any) {
            if (mobile) {
              return val[2] / 3 < 5 ? 5 : val[2] / 3
            } else {
              return val[2] / 1.6 < 8 ? 8 : val[2] / 1.6
            }
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
          },
          hoverAnimation: true,
          data: makeMapData(rawData),
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false,
            },
          },
          itemStyle: {
            normal: {
              color: 'rgba(22, 119, 255, 1)',
              shadowBlur: 10,
              shadowColor: '#999',
            },
          },
          tooltip: {
            formatter({ value, name }: any) {
              return `${name}`
            },
          },
        },
      ],
    }
    if (option && typeof option === 'object') {
      this.map.setOption(option, true)
    }
  }


  componentWillUnmount() {
  }

  componentDidMount() {
    this.initMap()
  }

  render() {
    return (
      <div>
        <div className={styles.homeMapContainer} id="homeMapContainer" />
      </div>
    )
  }
}

export default TopMap
