import '../styles/globals.css'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { isBreakOrContinueStatement } from 'typescript'

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

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
