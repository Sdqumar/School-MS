import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../components/Navbar.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <div className=''>
      <Navbar />
      <Component {...pageProps} />
  </div>
  )
}

  