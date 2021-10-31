import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../components/Navbar.css'
import { CookiesProvider } from 'react-cookie';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <CookiesProvider>
      <Navbar />
      <Component {...pageProps} />
      </CookiesProvider>
  )
}

