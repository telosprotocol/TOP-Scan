import abiDecoder from 'abi-decoder'
import { useEffect, useState } from 'react'
import ERC20 from '../abi/erc20.json'

function useErc20InputDecode(input: string) {
  const [result, setResult] = useState<any>({ name: '--', params: [] })

  useEffect(() => {
    if (!input) {
      setResult({ name: '--', params: [] })
      return
    }
    const inputNew = input.startsWith('0x') ? input : `0x${input}`
    try {
      const decodedData = abiDecoder.decodeMethod(inputNew)
      if (decodedData) {
        setResult(decodedData)
      } else {
        setResult({
          name: inputNew.substring(0, 10),
          params: [],
        })
      }
    } catch (error) {
      setResult({ name: inputNew.substring(0, 10), params: [] })
    }
  }, [input])

  useEffect(() => {
    abiDecoder.addABI(ERC20)
  }, [])
  return result
}

export default useErc20InputDecode
