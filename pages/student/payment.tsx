import useStore from "../../components/useStore";
import SideNavBar from "../../components/StudentSideBar";
import ProfileReview from "../../components/profileReview";
import Image from "next/image";
import { usePaystackPayment } from "react-paystack";
import Payment from '../api/payment.json'
import { useEffect } from "react";
import { useState } from "react";


export default function Form() {


const user = useStore((state) => state.user);
const [payment,setPayment]=useState(null)
const [recipt, setRecipt] = useState(null);

useEffect(()=>{
  const getRecipts = async () => {
    try {
      const res = await fetch("/api/student/recipt", {
        method: "POST",
        body: JSON.stringify({ studentId: user._id }),
        headers: { "Content-Type": "application/json" },
      });
      const [data] = await res.json();
      setRecipt(data);
      if (data.errors) {
        console.log(data.errors);
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

user &&    getRecipts();



  const [data] = Payment.class.filter(item=>item.name === user?.class)
data && setPayment({...data,term:Payment.term})
},[user])
 

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: payment?.total * 100,
    publicKey: "pk_test_cc89c527520c2442c1e462c3128f57442882a3ca",
    metadata: {
      ...user,
      ...payment,
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "Name",
          value: user?.fullName,
        },
        {
          display_name: "Admission No",
          variable_name: "Admission No",
          value: user?.admissionNo,
        },
        {
          display_name: "Class",
          variable_name: "Class",
          value: user?.class,
        },
      ],
    },
  };

  const onSuccess = (reference) => {
    console.log(reference);
  };

  const onClose = () => {
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);
  const makePayment = () => {
    initializePayment(onSuccess, onClose);
  };

  return (
    <main className="flex min-h-full">
      <div>
        <SideNavBar />
      </div>
      <div className="mx-auto w-1/2">
        <ProfileReview user={user} />
       { recipt || !payment? 

      <h2 className="mt-9 text-center">No Outstanding Payment</h2>
      :
        <div className="mt-7 mx-4">
          <h2>Payment preview</h2>
          <p className="my-4">
            <strong className="text-red-400">Note*</strong> Below is the preview
            of the payment you are attempting to make. Kindly verify that the
            information is correct before clicking{" "}
            <strong>"Make Payment"</strong> button{" "}
          </p>
          <div className="border children:border-b payment">
            <h3 className="font-medium text-center text-lg">Current Charges</h3>
            <div>
              <span>Payment Type</span>
              <span>{payment.term}  Fees (2020 academic session)</span>
            </div>
            <div>
              <span>Amount</span>
              <span>₦ {Number(payment?.amount).toLocaleString()}</span>
            </div>
            <div>
              <span>Processing Fees</span>
              <span>₦ {Number(payment?.charges).toLocaleString()}</span>
            </div>
            <div>
              <span>Total Amount</span>
              <span>₦ {Number(payment.total).toLocaleString()}</span>
            </div>
          </div>
          <div className="my-4 m-auto ">
            <Image
              src="/paystackcard.png"
              alt="Picture of the author"
              width={350}
              height={120}
              priority
            />
          </div>
          <button onClick={makePayment} className="mb-10 m-auto">
            make payment
          </button>
        </div>}
      </div>
    </main>
  );
}
