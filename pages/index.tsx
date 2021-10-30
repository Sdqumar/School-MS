import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

// export async function getServerSideProps(ctx) {
//   return {
//     props: {
//       session: await getSession(ctx)
//     }
//   }
// }
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
  <h1>Homepage</h1>

 <Link href="/api/auth/login">Auth0</Link>
    </div>
  )
}

export default Home
