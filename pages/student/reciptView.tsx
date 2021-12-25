import { useEffect } from "react";
import useLocalStorage from "../../components/hooks/useLocalStorage";
import ProfileReview from "../../components/profileReview";
import useStore from "../../components/useStore";
import numWords from 'num-words';

export default function PrintResult() {
  const [value] = useLocalStorage("recipt", null);
  const user = useStore((state) => state.user);

  useEffect(() => {
    value && console.log(value);
  });

  return (
    value && (
      <main className="m-auto mt-10 border w-[50rem]">
        <div className="font-semibold border-b px-10 py-4">
          <h3>EXCELLENCE ACADEMY</h3>
          <h4 className="text-sm">BURSARY DEPARTMENT</h4>
        </div>
        <div className="ml-16">
          <ProfileReview user={user} />

          <div className="mt-5 font-semibold ">
            <div>
              Receipt Number: <span className="font-normal">{value._id}</span>
            </div>
            <div>
              Payment Ref:{" "}
              <span className="font-normal">{value.data.reference}</span>
            </div>
            <div>
              Payment Date:{" "}
              <span className="font-normal">{value.data.paidAt}</span>
            </div>
          </div>
          <div className="mt-5 max-w-xl" >
            <div className="flex font-semibold border children:px-3  ">
              <h3>Payment for</h3>
              <h3 className="border-l">
                {value.data.metadata.term} School Fees
              </h3>
            </div>
            <div className="flex font-semibold border children:px-3">
              <h3>Amount Paid</h3>
              <h3 className="border-l">
                ₦
                {Number((value.data.amount / 100).toFixed(1)).toLocaleString()}
              </h3>
            </div>
          </div>

          <table className="mt-5 w-96 font-medium">
            <tr className="bg-blue-300 ">
            <td>Charge</td>
            <td>Amount</td>
            </tr>
            <tr className="children:bg-white">
            <td>School Fees</td>
            <td>₦
                {Number((value.data.amount / 100).toFixed(1)).toLocaleString()}</td>
            </tr>
            <tr>
            <td>Bank Charges</td>
            <td>Amount</td>
            </tr>
            <tr className="children:bg-blue-300 ">
            <td>Total</td>
            <td>
              ₦{Number((value.data.amount / 100).toFixed(1)).toLocaleString()}
                </td>
            </tr>
            </table>  
            <h3 className="capitalize my-5 italic font-semibold">Amount in words: {numWords(value.data.amount / 100) } Naira Only</h3>          
        </div>
      </main>
    )
  );
}
