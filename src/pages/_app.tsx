import 'antd/dist/antd.css'
import '../styles/globals.css'
import '../styles/antd-checkbox.scss'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { initTrack, trackPV } from '../api/track'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    initTrack({
      appname: 'TopScan',
      category: 'website',
      baseUrl: '',
    })
    trackPV();
    const handleRouteChange = () => {
      trackPV()
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
  return (
    <div>
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  )
}

export default MyApp
