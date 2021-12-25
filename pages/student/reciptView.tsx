import { useEffect } from "react";
import useLocalStorage from "../../components/hooks/useLocalStorage";

export default function PrintResult() {
  const [value] = useLocalStorage("recipt",null)


  useEffect(()=>{

    value && console.log(value);
  })

  return (
    <main className="flex min-h-full">
    
<h1>Recipt</h1>
    </main>
  );
}
