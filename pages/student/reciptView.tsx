import { useEffect } from "react";
import useLocalStorage from "../../components/hooks/useLocalStorage";
import ProfileReview from "../../components/profileReview";
import useStore from "../../components/useStore";

export default function PrintResult() {
  const [value] = useLocalStorage("recipt",null)
  const user = useStore((state) => state.user);


  useEffect(()=>{
    value && console.log(value);
  })

  return (
    <main className="m-auto mt-10 border max-w-[900px]">

      <div className="font-semibold border-b px-10 py-4">
          <h3>EXCELLENCE ACADEMY</h3>
          <h4 className="text-sm">BURSARY DEPARTMENT</h4>
      </div>
      <div className="px-10">
     
      <ProfileReview user={user} />
     
      <div className="mt-5 font-semibold ">
        <div>Receipt Number: <span className="font-normal">{value._id}</span></div>
        <div>Payment Ref: <span className="font-normal">{value.data.reference}</span></div>
        <div>Payment Date: <span className="font-normal">{value.data.paidAt}</span></div>
      </div>
     <div className="mt-5">
             <div className="flex font-semibold border children:px-3">
               <h3>Payment for</h3>
               <h3 className="border-l">{value.data.metadata.term} School Fees</h3>
               </div>    
             <div className="flex font-semibold border children:px-3">
               <h3>Amount Paid</h3>
               <h3 className="border-l"> ₦ {Number((value.data.amount / 100 ).toFixed(1)).toLocaleString()}</h3>
               </div>    
     </div>

     <div className="mt-5">
       <h4>Amount Breakdown</h4>
     </div>
      </div>

    </main>
  );
}
