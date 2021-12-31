import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
import {SWRConfig} from 'swr'
import {fetcher} from '../lib/fetcher'
export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any
  pageProps: any
}) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 300000,
        fetcher: (resource, init) => fetcher(resource).then(res => res.data),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}
