export default function Select({data,props}){
    return(
        <>
        <select className="border-2 ml-3 w-24"
 {...props}
>
  {data.map((item) => (
    <option  value={item} key={item}>
      {item}
    </option>
  ))}
</select>
</>
    )
}

type errorProps = {
    message?: string | undefined;
  };
export function Errror({ message }: errorProps) {
    return <p>{message}</p>;
  }