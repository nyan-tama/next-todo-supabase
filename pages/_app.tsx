import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { supabase } from '../utils/supabase'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      console.log(`FCP: ${Math.round(metric.value * 10) / 10}`)
      break
    case 'LCP':
      console.log(`LCP: ${Math.round(metric.value * 10) / 10}`)
      break
    case 'TTFB':
      console.log(`TTFB: ${Math.round(metric.value * 10) / 10}`)
      break
    case 'Next.js-hydration':
      console.log(
        `Hydration: ${Math.round(metric.value * 10) / 10} -> ${
          Math.round((metric.startTime + metric.value) * 10) / 10
        }`
      )
      break
    default:
      break
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter()
  const validateSession = () => {
    const userData = supabase.auth.getUser()
    //Promiseの返却を受け、dataを分割代入でうける、ほかにはerrorも受けれるがとりあえずいらない
    userData.then(({ data: user }) => {
      // console.log(user)
      if (user && pathname === '/') {
        push('/dashboard')
        // userログインしていなく、ルート以外にいるならログイン画面へ
      } else if (!user && pathname !== '/') {
        push('/')
      }
    })
  }
  // event引数には、認証関連のイベントが渡されます。具体的には、'SIGNED_IN'、'SIGNED_OUT'、'USER_UPDATED'、'PASSWORD_RECOVERY'、'USER_DELETED'のいずれかが渡されます。このイベントは、Supabase Authに関するアクションが発生した際にトリガーされます。
  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && pathname === '/') {
      push('/dashboard')
    }
    if (event === 'SIGNED_OUT') {
      push('/')
    }
  })
  useEffect(() => {
    validateSession()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
