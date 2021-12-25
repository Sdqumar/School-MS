import useStore from "../../components/useStore";

export default function PrintResult() {

  const recipt = useStore((state) => state.recipt);

  return (
    <main className="flex min-h-full">
    
<h1>Recipt</h1>
    </main>
  );
}
