import Navbar from "../components/Navbar";
import "../styles/globals.css";
import "../components/table.css";
import useStore from "../components/useStore";
import { useCookies } from "react-cookie";
import {  useEffect } from "react";

export default function App({Component,  pageProps}) {
  const setUser = useStore((state) => state.setUser);
  const [cookies] = useCookies(["user"]);

  useEffect(() => {
    const { user } = cookies;
    setUser(user);
  }, [cookies]);

  return (
      <div className="flex flex-col h-screen ">
        <Navbar />
        <Component {... pageProps}/>
      </div>
  );
}
