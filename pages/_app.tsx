import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../components/Navbar.css'
import '../components/table.css'
import useStore from "../components/useStore";
import { CookiesProvider } from 'react-cookie';
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const setUser = useStore((state) => state.setUser);
  const [cookies, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const { user } = cookies;
    setUser(user);
    console.log(user);
  }, [cookies]);

  return (
    <CookiesProvider>
      <Navbar />
      <Component {...pageProps} />
      </CookiesProvider>
  )
}

